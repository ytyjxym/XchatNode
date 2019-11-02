var express = require('express');
var router = express.Router();
var getUser = require("../../utils/getUserInf")
let options = {}
options.dbname = "XYM";
options.collectionName = "user";
options.url = "mongodb://127.0.0.1:27017";
/* GET users listing. */
router.get('/', function(req, res, next) {
    let _id = req.session['XYM']

    if (!_id) {
        res.send({ err: 1, msg: "cookie校验失败" })
    } else {
        getUser(req, res, next, _id, options);
    }
});

module.exports = router;