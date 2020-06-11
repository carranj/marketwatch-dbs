module.exports = app => {
    const sets = require("../controllers/product.controller.js");
    // Retrieve all Sets
    app.get("/products", sets.findAllProducts);
  
    // Retrieve a single product with productId
    app.get("/products/:productId", sets.findOneProduct);

    // Retrieve a single Set with setId
    app.get("/products/sets/:setId", sets.findProductsBySet);
};