const { curly, Curl } = require('node-libcurl');
const apiConfig = require("./config");
const bearerConfig = require("./config/bearerToken");

bearerToken = getBearerToken();
const publicKey = apiConfig.TCG_PUBLIC_KEY;
const privateKey = apiConfig.TCG_PRIVATE_KEY;

const fields = `grant_type=client_credentials&client_id=${publicKey}&client_secret=${privateKey}`;
const tokenURL = "https://api.tcgplayer.com/token";
let headers = ["application/x-www-form-urlencoded"];

getBearerToken = async function() { 
  try{
    const request = await curly.post(tokenURL, {
        POSTFIELDS: fields,
        HTTPHEADER: headers
    });
  } catch (error){
    console.log(new Error(error));
  }
}
headers = 
  [
    "Accept: application/json",
  	"Content-Type: application/json",
  	`Authorization: bearer ${bearerToken}`
  ];
console.log(headers);
//Set Game Name
const categoryId = 27; //ID for DBS
const productName = "Dragon Ball Super CCG";

const curl = new Curl();

const requestListAllCategoryRarities = `http://api.tcgplayer.com/v1.32.0/catalog/categories/${categoryId}/printings`; // Request Get
curl.setOpt('URL', requestListAllCategoryRarities);
curl.setOpt('HTTPHEADER', headers);
 
curl.on('end', function (statusCode, data, headers) {
  console.info(this.getInfo( 'TOTAL_TIME'));
  this.close();
});
curl.on('error', curl.close.bind(curl));
curl.perform();