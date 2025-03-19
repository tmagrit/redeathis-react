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
    let available = req.query.available === 'true' ? true : false;
    let body = { 
        customMetadata: { 
            title: req.query.title || null,
            description: req.query.description || null,
            date: req.query.date || null,
            technique: req.query.technique || null,
            dimensions: req.query.dimensions || null,
            serial: req.query.serial || null,
            available: available
        } 
    }
    let responseUpdateFile = await updateFile( fileId, body );
    res.send(responseUpdateFile.data);
};