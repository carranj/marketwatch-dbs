const axios = require('axios');
const apiConfig = require(".");

const publicKey = apiConfig.TCG_PUBLIC_KEY;
const privateKey = apiConfig.TCG_PRIVATE_KEY;
const tokenURL = "https://api.tcgplayer.com/token";
const authData = `grant_type=client_credentials&client_id=${publicKey}&client_secret=${privateKey}`

//Print Error Messages
function printError(error){
    console.error(error.message);
}

async function getBearerToken() {
    try{
        const response = await axios.post(tokenURL, authData, {
                                        headers:{'Content-Type' : 'text/plain' }
                                    })
        const accessToken = await response.data.access_token;
        return await accessToken;
    } catch (err){
        printError(err);
    }
};

getBearerToken();

module.exports.getBearerToken = getBearerToken;