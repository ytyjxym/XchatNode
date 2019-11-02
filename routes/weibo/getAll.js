var express = require('express');
var router = express.Router();
var getAllDetail = require("../../utils/getAllDetail")
let options = {}
options.dbname = "XYM";
options.collectionName = "weibo";
options.url = "mongodb://127.0.0.1:27017";
/* GET users listing. */
router.get('/', function(req, res) {
    getAll(req, res, options);
});

module.exports = router;
let date = new Date()
    // console.log(date.getTime());