const express = require('express');
const app = express(); 

const middleware = require("../src/routes");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept, *')
    next()
});

app.use("/imagekit", middleware);

// app.get("/files", (req, res) => {
//     res.send("Hello, FILES!");
// });

module.exports = app;