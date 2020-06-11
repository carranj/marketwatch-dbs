const sql = require("./db.js");

// constructor
const Product = function(product) {
    this.productId = product.product_id,
    this.productName  = product.product_name,
    this.cleanName = product.clean_name,
    this.imageUrl = product.image_url,
    this.categoryId = product.category_id,
    this.groupId = product.group_id,
    this.tcgUrl = product.tcg_url,
    this.lastModified = product.last_modified,
    this.rarity = product.rarity,
    this.cardNumber = product.card_number,
    this.productDescription = product.product_description,
    this.cardType = product.card_type,
    this.color = product.color,
    this.energyColorCost = product.energy_color_cost,
    this.specialTriat = product.special_triat,
    this.power = product.power,
    this.comboPower = product.combo_power,
    this.comboEnergy = product.combo_energy,
    this.era = product.era,
    this.productCharacter = product.product_character,
    this.importedPrice = product.imported_price
};

Product.findProductById = (productId, result) => {
  sql.query(`SELECT * FROM products WHERE product_id = ${productId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found set: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Set with the id
    result({ kind: "not_found" }, null);
  });
};

Product.getAllProducts = result => {
  sql.query("SELECT * FROM products LIMIT 250", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Product;