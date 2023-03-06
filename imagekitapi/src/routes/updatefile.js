const axios = require("axios");

const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

//function to get the data from the API 
let updateFile = async ( fileid, body ) => {
    let response = await axios.patch(`https://api.imagekit.io/v1/files/${fileid}/details`, body, {
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
    let body = { 
        customMetadata: { 
            description: req.query.description 
        } 
    }
    let responseUpdateFile = await updateFile( fileId, body );
    res.send(responseUpdateFile.data);
};
