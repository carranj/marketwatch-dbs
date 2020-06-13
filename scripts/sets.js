const axios = require("axios"); 
const apiConfig = require("./config");
const bearerConfig = require("./config/bearerToken");

const bearerToken =  bearerConfig.getBearerToken().then(data=>{return data});
const categoryId = 27; //ID for DBS
const groupId = 2590; //Universal Onslaught Test
const requestAllSets = `http://api.tcgplayer.com/v1.32.0/catalog/categories/${categoryId}/groups?limit=100`; // Request GET;

 
//Print Error Messages
function printError(error){
  console.error(error.message);
}

async function getListAllCategoryRarities() {
  try{
    const acessToken = await bearerToken;

    const response = await axios.get(requestAllSets, {
      headers: {
				'Authorization': `bearer ${acessToken}`
			}
    })
    console.log(response.data.results);
    return response.data.results;

  } catch (err){
    printError(err);
  }
}

getListAllCategoryRarities();