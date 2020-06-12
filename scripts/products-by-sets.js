const { curly, Curl } = require('node-libcurl');
const apiConfig = require("./config");
const bearerConfig = require("./config/bearerToken");

bearerToken =  getBearerToken();
console.log(bearerToken);
const publicKey = apiConfig.TCG_PUBLIC_KEY;
const privateKey = apiConfig.TCG_PRIVATE_KEY;

const fields = `grant_type=client_credentials&client_id=${publicKey}&client_secret=${privateKey}`;
const tokenURL = "https://api.tcgplayer.com/token";
let headers = ["application/x-www-form-urlencoded"];


const categoryId = 27; //ID for DBS
const groupId = 2590; //Universal Onslaught Test
const productName = "Dragon Ball Super CCG";

const curl = new Curl();

const requestListAllCategoryRarities = `http://api.tcgplayer.com/v1.32.0/catalog/products?categoryId=${categoryId}&groupId=${groupId}&limit=10000`; // Request Get

curl.setOpt('URL', requestListAllCategoryRarities);
curl.setOpt('HTTPHEADER', headers);
    
curl.on('end', function (statusCode, data, headers) {
  console.info(statusCode);
  console.info('---');
  console.info(data);
  console.info('---');
  console.info(this.getInfo( 'TOTAL_TIME'));

  this.close();
});