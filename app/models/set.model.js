const sql = require("./db.js");

// constructor
const Set = function(set) {
  this.groupId = set.group_id;
  this.setName = set.set_name;
  this.releaseDate = set.release_date;
  this.lastModified = set.last_modified;
  this.categoryId = set.category_id;
};

Set.findSetById = (groupId, result) => {
  sql.query(`SELECT * FROM sets WHERE group_id = ${groupId}`, (err, res) => {
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

Set.getAllSets = result => {
  sql.query("SELECT * FROM sets", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("sets: ", res);
    result(null, res);
  });
};

module.exports = Set;