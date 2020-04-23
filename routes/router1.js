const express = require("express");

// create router
const router1 = express.Router();

const controller1 = require("../controllers/controller1.js");

// empty path = retrieve all authors 
router1.get("/", controller1.getAllAuthors);

module.exports = router1;