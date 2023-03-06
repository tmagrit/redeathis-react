//ssh tmagrit@206.189.53.94
// pm2 start ecosystem.config.js

module.exports = {
    apps : [{
        name: 'mr-imagekit-endpoint', 
        script: 'npm',
            args: 'start',
        cwd: './endpoint',
        autorestart: true
    }, {
        name: 'mr-imagekit-api',  
        script: 'npm',
            args: 'start',
        cwd: './imagekitapi',
        autorestart: true
    }],
    exec_mode: 'fork',
  };