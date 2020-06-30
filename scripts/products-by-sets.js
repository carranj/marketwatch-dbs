const axios = require("axios"); 
const mysql = require("mysql");
const sql = require("../app/config/db.config");
const bearerConfig = require("./config/bearerToken");
const bearerToken =  bearerConfig.getBearerToken().then(data=>{return data});
let categoryId = 27; //ID for DBS
const groupId = 2647;
const offset = 0;
const limit = 100;
const listAllProductsInSet = `http://api.tcgplayer.com/v1.39.0/catalog/products?categoryId=${categoryId}&groupId=${groupId}`;

var con = mysql.createConnection({
  host: sql.HOST,
  user: sql.USER,
  password: sql.PASSWORD,
  database: sql.DB
});

//Print Error Messages
function printError(error){
  console.error(error.message);
  con.end();
}

async function getAllProductsInSet() {
  try{
    const acessToken = await bearerToken;

    const response = await axios.get(listAllProductsInSet, {
      params:{
        'offset': offset,
        'limit':limit,
        'getExtendedFields': 'true'

      },
      headers: {
        'accept': 'application/json',
        'Authorization': `bearer ${acessToken}`
      }
    })
    results = await response.data.results;
    console.log(results.length);
    return await results;

  } catch (err){
    printError(err);
  }
  finally{
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
      writeDataToDb(results);
  }
}

async function writeDataToDb(results) {
  let rarity = null;
  let cardNumber = null;
  let description = null;
  let cardType = null;
  let color = null;
  let energyColorCost = null;
  let specialTrait = null;
  let power = null;
  let comboPower = null;
  let comboEnergy = null;
  let era = null;
  let character = null;

  await results.forEach(element => {
    productId = element.productId;
    productName= element.name;
    cleanName = element.cleanName;
    imageUrl = element.imageUrl;
    gameId = element.categoryId;
    setId = element.groupId;
    tcgUrl = element.url;
    lastModified = element.modifiedOn;
    importedPriceDate = Date.now(); 
    extendedData = element.extendedData
    extendedData.forEach(extendedItem => {
      extendedItem.name === 'Rarity' ? rarity = extendedItem.value:null;
      extendedItem.name === 'Number' ? cardNumber = extendedItem.value: null;
      extendedItem.name === 'Description' ? description = extendedItem.value:null;
      extendedItem.name === 'CardType' ? cardType = extendedItem.value:null;
      extendedItem.name === 'Color' ? color = extendedItem.value:null;
      extendedItem.name === 'EnergyColor Cost' ? energyColorCost = extendedItem.value:null;
      extendedItem.name == 'SpecialTrait' ? specialTrait = extendedItem.value:null;
      extendedItem.name == 'Power' ? power = extendedItem.value:null;
      extendedItem.name == 'Combo Power' ? comboPower = extendedItem.value:null;
      extendedItem.name == 'Combo Energy' ? comboEnergy = extendedItem.value:null;
      extendedItem.name == 'Era' ? era = extendedItem.value:null;
      extendedItem.name == 'Character' ? character = extendedItem.value:null;
      // console.log({rarity,cardNumber,description,cardType,color,energyColorCost,specialTrait,power,comboPower,comboEnergy,era,character})
    })
    console.log({productId,productName,cleanName,imageUrl,gameId,setId,tcgUrl,lastModified,importedPriceDate});

    var productInfo = {
      product_id : productId,
      product_name : productName,
      clean_name : cleanName,
      image_url : imageUrl,
      category_id : categoryId,
      group_id : groupId,
      tcg_url : tcgUrl,
      last_modified : lastModified,
      rarity: rarity,
      card_number: cardNumber,
      product_description: description,
      card_type: cardType,
      color: color,
      energy_color_cost: energyColorCost,
      special_triat: specialTrait,
      power: power,
      combo_power: comboPower,
      combo_energy: comboEnergy,
      era: era,
      product_character: character,
      imported_price: importedPriceDate
    }
    var sql = `INSERT INTO products SET ? ON DUPLICATE KEY UPDATE group_id =  ${setId}`;
    con.query(sql, productInfo ,function (err, result) {
      if (err) throw err;
      console.log(sql);
    });
  })
  
  con.end();
}

getAllProductsInSet();