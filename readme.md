# Implementação Aplicativo Rede Athis

> Passos para implementar  Aplicativo Rede Athis em servidor Debian 10 usando PM2, NGINX como proxy reverso e certificaçaõ SSL com LetsEncrypt

## 1. Instalação do Node/NPM
```
sudo apt install curl

curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -

sudo apt install nodejs

dpkg -l nodejs
```
## 2. Clonagem do repositório redeathis-react do Github
### Configuração de chave SSH
```
cd ~

ssh-keygen -t ed25519 -C "seu@email.com"
```
### Clone do repositório
```
TODO: configurar ssh git - https://gist.github.com/Tamal/1cc77f88ef3e900aeae65f0e5e504794

cd /usr/apps

git clone git@github.com:tmagrit/redeathis-react.git
```
### Registro de chave pública em repositório Git
```
cd /usr/apps

git clone git@github.com:tmagrit/redeathis-react.git
```
### 3. Instalação de dependências da aplicação
```
cd /usr/apps/redeathis-react/endpoint
npm install

cd /usr/apps/redeathis-react/imagekitapi
npm install

cd /usr/apps/redeathis-react/frontend
npm install (use a opção --legacy-peer-deps se necessário)
```
## 4. Instalação e configuração do gerenciador de processos PM2 para as applicações Node.js
### Instalação do PM2
```
sudo npm i pm2 -g

# Alguns comandos do PM2
pm2 show app
pm2 status
pm2 restart app
pm2 stop app
pm2 logs (Mostra o final do arquivo de log)
pm2 flush (Limpa os logs)

# Para garantir o reinício das aplicações apos reboot
sudo pm2 save
```
### Configuração do arquivo de parâmetros do PM2 ```ecosystem.config.js```
Substituir os parâmetros e salvar na pasta raíz ```/usr/apps/redeathis-react``` da aplicação
```js 
module.exports = {
    apps : [{
        name: 'ra-imagekit-endpoint', 
        script: 'npm',
            args: 'start',
        cwd: './endpoint',
        watch: true,
        autorestart: true,
        env: {
            NODE_ENV: "production",
            SERVER_BASE_URL: 'https://seu.dominio',
            SERVER_SECRET: '<SERVER_SECRET>',
            IMAGEKIT_PUBLIC_KEY: '<IMAGEKIT_PUBLIC_KEY>',
            IMAGEKIT_PRIVATE_KEY: '<IMAGEKIT_PRIVATE_KEY>',
            IMAGEKIT_URL_ENDPOINT: 'https://ik.imagekit.io/<IMAGEKIT_URL_SUFFIX>'
        }
    }, {
        name: 'ra-imagekit-api',  
        script: 'npm',
            args: 'start',
        cwd: './imagekitapi',
        watch: true,
        autorestart: true,
        env: {
            NODE_ENV: "production",
            IMAGEKIT_PRIVATE_KEY: '<IMAGEKIT_PRIVATE_KEY>',
        }
    }],
    exec_mode: 'cluster',
};
```
## 5. Instalação e configuração de firewall com UFW
```
sudo apt install ufw
sudo allow <SSH_PORT> (ou sudo ufw allow ssh caso a porta padrão seja a 22)

sudo ufw enable
sudo ufw status
sudo ufw allow http (Autoriza porta 80 HTTP)
sudo ufw allow https (Autoriza porta 443 HTTPS)
```
## 6. Instalação e configuração do NGINX
### Configuração dos repositórios mais atuais em servidor Debian
Pré requisitos:
```
sudo apt install curl gnupg2 ca-certificates lsb-release debian-archive-keyring
```
Importação aa chave oficial para verificar a autenticidade do pacote:
```
curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor \
    | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null
```
Verificação de chave certificada:
```
gpg --dry-run --quiet --no-keyring --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg
```
A saída do comando anterior deve conter a chave digital ```573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62``` como segue:
```
pub   rsa2048 2011-08-19 [SC] [expires: 2024-06-14]
      573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62
uid                      nginx signing key <signing-key@nginx.com>
```
Se a chave digital for diferente, remova o pacote. Para atualizar o repositório apt com a versão estável do NGINX, execute:
```
echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
http://nginx.org/packages/debian `lsb_release -cs` nginx" \
    | sudo tee /etc/apt/sources.list.d/nginx.list
```
### Configuração de preferêcia dos repositórios sobre os nativos
```
echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" \
    | sudo tee /etc/apt/preferences.d/99nginx
```
### Instalação do NGINX
```
sudo apt update
sudo apt install nginx
```
### Configuração básica do proxy reverso
Na pasta ```/etc/nginx/conf.d``` crie as pastas ```sites-available``` e ```sites-enabled```: 
```
cd /etc/nginx/conf.d

sudo mkdir sites-available

sudo mkdir sites-enabled
```
No diretório ```sites-available``` crie o arquivo ```ra.conf```: 
```
cd sites-available

sudo vi ra.conf
```
e entre com os dados:

```
server {
    server_name <DOMAIN_NAME> www.<DOMAIN_NAME>;

    location / {
        root   /usr/apps/redeathis-react/frontend/build;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    location /auth {
        proxy_pass http://<DOMAIN_NAME>:3001/auth;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_ssl_server_name on;
    }

    location /imagekit/files {
        proxy_pass http://<DOMAIN_NAME>:8001/imagekit/files;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_ssl_server_name on;
    }

    location /imagekit/deletefile {
        proxy_pass http://<DOMAIN_NAME>:8001/imagekit/deletefile;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_ssl_server_name on;
    }

    location /imagekit/updatefile {
        proxy_pass http://<DOMAIN_NAME>:8001/imagekit/updatefile;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_ssl_server_name on;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```
No diretório ```sites-enabled``` crie um link simbólico para o arquivo ```ra.conf```: 

```
cd /etc/nginx/conf.d/sites/enabled

sudo ln -s ../sites-available/plex.conf .
```
Altere o arquivo ```/etc/nginx/nginx.conf``` para carregar os novos arquivos de configuração. 
```
# Altere a linha

include /etc/nginx/conf.d/*.conf;

# para

include /etc/nginx/conf.d/sites-enabled/*.conf;

# e teste a sintaxe do arquivo de configuração com o comando

sudo nginx -t

# Ao final, envie um sinal para recarregar o NGINX

sudo nginx -s reload

# Ou então reinicie o serviço NGINX com o comando
sudo service nginx restart
```
> Neste momento já deve ser possível acessar o aplicativo pelo endereço ```<DOMAIN_NAME>```. 
```
## 7. Configuração de certificado SSL para o domínio ```<DOMAIN_NAME>``` com LetsEncrypt
```
sudo add-apt-repository ppa:certbot/certbot

sudo apt-get update

sudo apt-get install python-certbot-nginx

sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Only valid for 90 days, test the renewal process with
certbot renew --dry-run
```

