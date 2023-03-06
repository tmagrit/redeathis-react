const axios = require("axios");

const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

//function to get the data from the API 
let deleteFile = async (fileid) => {
    let response = await axios.delete(`https://api.imagekit.io/v1/files/${fileid}`, {
        auth: {
            username: privateKey,
            password: ''
        }
    });
    return response;
};

//controller function 
module.exports = async (req, res) => {
    let fileId = req.query.fileid;
    let responseDeleteFile = await deleteFile(fileId);
    res.send(responseDeleteFile.status);
};
