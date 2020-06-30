const axios = require("axios"); 
const mysql = require("mysql");
const fetch = require("node-fetch");
const sql = require("../app/config/db.config");
const bearerConfig = require("./config/bearerToken");
const bearerToken =  bearerConfig.getBearerToken().then(data=>{return data});
let categoryId = 27; //ID for DBS
const groupId = 2647;
const offset = 0;
let productId = 0;
var con = mysql.createConnection({
  host: sql.HOST,
  user: sql.USER,
  password: sql.PASSWORD,
  database: sql.DB
});

//Print Error Messages
function printError(error){
  console.error(error.message);
}

async function ProductDetails() {
    try{
        sqlGetIds = 'SELECT product_id FROM products WHERE imported_price IS NULL or imported_price < CURRENT_DATE() and category_id = 27';
        const getDetails = await con.query(sqlGetIds, async function (err, results, fields) {
            if (err) throw err;
            results.forEach(element => {
                getProductDetails(element.product_id);
            })
        });
  } catch(err){
      printError(err);
  }
}

async function getProductDetails(productId){
    try{
        let requestGetProductDetails = `http://api.tcgplayer.com/v1.32.0/pricing/product/${productId}`;
    const acessToken = await bearerToken;

    const response = await axios.get(requestGetProductDetails, {
      headers: {
				'Authorization': `bearer ${acessToken}`
			}
    })
    results = await response.data.results[0];
    await writeDataToDb(results);
    } catch (err){
        printError(err);
    } finally{
        console.log("connection ended");
    }
    
}

async function writeDataToDb(results) {
    try{
            let productId = results.productId;
            let lowPrice = results.lowPrice;
            let midPrice =  results.midPrice;
            let highPrice = results.highPrice;
            let marketPrice = results.marketPrice;
            let directLowPrice = results.directLowPrice;
            let subTypeName = results.subTypeName;
            let importedDate = new Date().toISOString().slice(0, 10);
    
            var pricingInfo = {
                product_id : productId,
                low_price : lowPrice,
                mid_price : midPrice,
                high_price : highPrice,
                market_price : marketPrice,
                direct_low_price : directLowPrice,
                sub_type_name : subTypeName,
                imported_date : importedDate
            }
    
            var sql = `INSERT INTO product_pricing SET ?`;
            
            const insertSql = await con.query(sql, pricingInfo ,function (err, result) {
                if (err) throw err;
                console.log(`inserting ${pricingInfo.product_id} with the date ${pricingInfo.imported_date}`);
                updateProductImportDate(productId, importedDate);
            });
    } catch(err){
        printError(err);
    } finally{
        
    }
}

async function updateProductImportDate(productId, importedDate){
    let sqlUpdate = `UPDATE products SET imported_price = NOW() WHERE product_id = ${productId}`;
    sqlUpdate = await con.query(sqlUpdate, function (error, results, fields) {
        if (error) throw error;
        console.log(`updated ${productId} in products table with the date ${importedDate}`);
      })
    
}

ProductDetails();