const axios = require('axios');
const apiConfig = require(".");

const publicKey = apiConfig.TCG_PUBLIC_KEY;
const privateKey = apiConfig.TCG_PRIVATE_KEY;
const tokenURL = "https://api.tcgplayer.com/token";

//Print Error Messages
function printError(error){
    console.error(error.message);
}

async function getBearerToken() {
    try{
        const response = await axios({
            "method": "POST",
            "url": tokenURL,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
            },
            "data": `grant_type=client_credentials&client_id=${publicKey}&client_secret=${privateKey}`
        })
        
        accessToken = response.data.access_token;
        // console.log(accessToken);
        return accessToken;

    } catch (err){
        printError(err);
    }
};


getBearerToken();

module.exports.getBearerToken = getBearerToken;
