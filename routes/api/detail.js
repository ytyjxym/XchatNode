var express = require('express');
var router = express.Router();
var getDetail = require("../../utils/getDetail")
var getAllDetail = require("../../utils/getAllDetail")
let options = {}
options.dbname = "XYM";
options.collectionName = "home";
options.url = "mongodb://127.0.0.1:27017";
/* GET users listing. */
router.get('/', function(req, res, next) {
    let _id = req.query._id;
    if (_id) {
        getDetail(req, res, next, _id, options);
    } else {
        getAllDetail(req, res, next, _id, options);
    }
});


router.get('/:id', function(req, res, next) {
    let _id = req.params.id;
    getDetail(req, res, next, _id, options)
});

module.exports = router;