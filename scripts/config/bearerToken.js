const { curly } = require('node-libcurl');
const https = require('https');
const apiConfig = require(".");

const publicKey = apiConfig.TCG_PUBLIC_KEY;
const privateKey = apiConfig.TCG_PRIVATE_KEY;

const fields = `grant_type=client_credentials&client_id=${publicKey}&client_secret=${privateKey}`;
const tokenURL = "https://api.tcgplayer.com/token";
const headers = ["application/x-www-form-urlencoded"];

//Print Error Messages
function printError(error){
    console.error(error.message);
}


getBearerToken = async function() { 
    try{
        const request = await curly.post(tokenURL, {
            POSTFIELDS: fields,
            HTTPHEADER: headers
        });
        bearerToken = request.data
        console.log(bearerToken);
        return bearerToken;
    } catch (error){
        printError(error);
    }
}