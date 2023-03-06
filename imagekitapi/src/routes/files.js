const axios = require("axios");

const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

//function to get the data from the API 
let getFiles = async () => {
    let response = await axios('https://api.imagekit.io/v1/files', {
        auth: {
            username: privateKey,
            password: ''
        }
    });
    return response;
};

//controller function 
module.exports = async (req, res) => {
    let responseFiles = await getFiles();
    res.send(responseFiles.data);
};