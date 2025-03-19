const express = require('express');
const companion = require('@uppy/companion');
const bodyParser = require('body-parser');
const session = require('express-session');
const ImageKit = require("imagekit");

if (
    !process.env.IMAGEKIT_PUBLIC_KEY ||
    !process.env.IMAGEKIT_PRIVATE_KEY ||
    !process.env.IMAGEKIT_URL_ENDPOINT ||
    !process.env.SERVER_BASE_URL
) {
    console.log(
        `The .env file is not configured. Follow the instructions in the readme to configure the .env file. https://github.com/imagekit-samples/uppy-uploader. A step by step walkthrough of the code is also available at https://docs.imagekit.io/sample-projects/upload-widget/uppy-upload-widget/. If your are running this in Codesandbox, please add secrets in your fork.`
    );
    console.log('');
    process.env.IMAGEKIT_PUBLIC_KEY
        ? ''
        : console.log('Add IMAGEKIT_PUBLIC_KEY to your .env file.');

    process.env.IMAGEKIT_PRIVATE_KEY
        ? ''
        : console.log('Add IMAGEKIT_PRIVATE_KEY to your .env file.');

    process.env.IMAGEKIT_URL_ENDPOINT
        ? ''
        : console.log('Add IMAGEKIT_URL_ENDPOINT to your .env file.');

    process.env.SERVER_BASE_URL
        ? ''
        : console.log('Add SERVER_BASE_URL to your .env file.');

    process.exit();
}

var imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const app = express(); 

app.use(bodyParser.json());

app.use(session({
    secret: process.env.SERVER_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept, *')
    next()
});

app.get("/auth", (req, res, next) => {
    res.send(imagekit.getAuthenticationParameters());
});

// initialize uppy
const uppyOptions = {
    server: {
        host: new URL(process.env.SERVER_BASE_URL).host, // the host including port e.g. localhost:3020
        protocol: new URL(process.env.SERVER_BASE_URL).protocol.replace(":","") // it should be http or https
    },
    filePath: '/tmp',
    uploadUrls: ['https://www.redeathis.arq.ufba.br/', 'http://www.redeathis.arq.ufba.br/', 'http://localhost'],
    secret: process.env.SERVER_SECRET,
    debug: true
};


// app.use(companion.app(uppyOptions))
const { app: companionApp } = companion.app(uppyOptions);

app.use(companionApp);

// handle 404
app.use((req, res, next) => {
    return res.status(404).json({ message: 'Endereço não encontrado' })
});

// handle server errors
app.use((err, req, res, next) => {
    console.error('\x1b[31m', err.stack, '\x1b[0m')
    res.status(err.status || 500).json({ message: err.message, error: err })
});

companion.socket(app.listen(3001), uppyOptions);

console.log(`Listening on ${process.env.SERVER_BASE_URL}`);