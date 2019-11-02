var express = require('express');
var router = express.Router();
var send = require("../../utils/send");
var pathLib = require("path");
let fs = require('fs');
let bcrypt = require("bcrypt");
let options = {}
options.dbname = "XYM";
options.collectionName = "user";
options.url = "mongodb://127.0.0.1:27017";
/* GET users listing. */
router.get('/', function(req, res, next) {

    send(req, res, next, options);
});

module.exports = router;