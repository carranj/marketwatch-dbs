const axios = require('axios');
const apiConfig = require(".");

const publicKey = apiConfig.TCG_PUBLIC_KEY;
const privateKey = apiConfig.TCG_PRIVATE_KEY;
const tokenURL = "https://api.tcgplayer.com/token";

//Print Error Messages
function printError(error){
    console.error(error.message);
}

getBearerToken = function() {
    axios({
        "method": "POST",
        "url": tokenURL,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        "data": `grant_type=client_credentials&client_id=${publicKey}&client_secret=${privateKey}`
    })
    .then(function (response) {
        accessToken = response.data.access_token;
    })
    .catch(function (error) {
        // handle error
        printError(error);
    })
}

getBearerToken();