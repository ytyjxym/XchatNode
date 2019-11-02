var express = require('express');
var router = express.Router();
var getUser = require("../../utils/getUserInf")
let options = {}
options.dbname = "XYM";
options.collectionName = "adminuser";
options.url = "mongodb://127.0.0.1:27017";
/* GET users listing. */
router.get('/', function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    getUser(req, res, next, { username, password }, options);
});

module.exports = router;