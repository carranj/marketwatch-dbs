module.exports = app => {
    const sets = require("../controllers/set.controller.js");
    // Retrieve all Sets
    app.get("/sets", sets.findAllSets);
  
    // Retrieve a single Set with setId
    app.get("/sets/:setId", sets.findOneSet);
    
};