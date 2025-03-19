const axios = require("axios");

const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

//function to get the data from the API 
let getFiles = async () => {
    let allFiles = [];
    let currentPage = 1;
    const pageSize = 1000;

    try {
        
        while (true) {
            let skip = (currentPage - 1)*pageSize;
            let response = await axios(`https://api.imagekit.io/v1/files?sort=ASC_NAME&skip=${skip}&limit=${pageSize}`, {
                auth: {
                    username: privateKey,
                    password: ''
                }
            });
            if (response.data.length === 0) {
                break; // Se não houver mais dados, saia do loop
            }
            allFiles = allFiles.concat(response.data);
            currentPage++;
        }
        
        return allFiles;
    } catch (error) {
        throw error;
    };

};

//controller function 
module.exports = async (req, res) => {
    let responseFiles = await getFiles();
    res.send(responseFiles);
};