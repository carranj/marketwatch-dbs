const axios = require("axios"); 
const mysql = require("mysql");
const sql = require("../app/config/db.config");
const bearerConfig = require("./config/bearerToken");
const bearerToken =  bearerConfig.getBearerToken().then(data=>{return data});
const categoryId = 27; //ID for DBS
const requestAllSets = `http://api.tcgplayer.com/v1.32.0/catalog/categories/${categoryId}/groups?limit=100`; // Request GET;

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

async function getListAllCategoryRarities() {
  try{
    const acessToken = await bearerToken;

    const response = await axios.get(requestAllSets, {
      headers: {
				'Authorization': `bearer ${acessToken}`
			}
    })
    results = response.data.results;
    return results;


  } catch (err){
    printError(err);
  }
  finally{
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
      const numSets = results.length;
      writeDataToDb(results);
  }
}

function writeDataToDb(results) {
  
  results.forEach(element => {
    let setId = element.groupId;
    let setName = element.name;
    let releaseDate = element.publishedOn;
    let lastModified = element.modifiedOn;
    
    var setInfo = {
      group_id : setId,
      set_name : setName,
      release_date : releaseDate,
      last_modified : lastModified,
      category_id : 27
    }
    var sql = `INSERT INTO sets SET ? ON DUPLICATE KEY UPDATE group_id =  ${setId}`;
    con.query(sql, setInfo ,function (err, result) {
      if (err) throw err;
      console.log(sql);
    });
  });
  

  con.end();
}
getListAllCategoryRarities();