const Product = require("../models/product.model.js");

// Retrieve all sets from the database.
exports.findAllProducts = (req, res) => {
  Product.getAllProducts((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sets."
      });
    res.send(data);
  });
};

// Find a single Set with a group_id
exports.findOneProduct = (req, res) => {
  Product.findProductById(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.productId}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Product with id  ${req.params.productId}`
        });
      }
    } else res.send(data);
  });
};

// Find a single Set with a group_id
exports.findProductsBySet = (req, res) => {
  Product.findProductsBySet(req.params.setId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Products with setid ${req.params.setId}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Products with setid  ${req.params.groupId}`
        });
      }
    } else res.send(data);
  });
};