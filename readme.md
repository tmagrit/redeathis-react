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
### Configuração do arquivo de parâmetros do PM2
```js ecosystem.config.js
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
## xxx. Instalação e configuração do NGINX
```
sudo apt install nginx

sudo nano /etc/nginx/sites-available/default
```
Add the following to the location part of the server block
```
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000; #whatever port your app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```
```
# Conferir configuração do NGINX
sudo nginx -t

# Restart NGINX
sudo service nginx restart
```
## xxxx. Crie certificado SSL com LetsEncrypt
```
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Only valid for 90 days, test the renewal process with
certbot renew --dry-run
```

