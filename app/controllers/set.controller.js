const Set = require("../models/set.model.js");

// Retrieve all sets from the database.
exports.findAllSets = (req, res) => {
  Set.getAllSets((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sets."
      });
    res.send(data);
  });
};

// Find a single Set with a group_id
exports.findOneSet = (req, res) => {
  Set.findSetById(req.params.group_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Set with id ${req.params.group_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Set with id " + req.params.group_id
        });
      }
    } else res.send(data);
  });
};
