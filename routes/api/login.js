var express = require('express');
var router = express.Router();
var getUser = require("../../utils/getUser")
let options = {}
options.dbname = "XYM";
options.collectionName = "user";
options.url = "mongodb://127.0.0.1:27017";
/* GET users listing. */
router.post('/', function(req, res, next) {
    // let username = req.body.username;
    // let password = req.body.password;
    // getUser(req, res, next, { username, password }, options);
    getUser(req, res, next, options);
});

module.exports = router;