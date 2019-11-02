var express = require('express');
var router = express.Router();
var reg = require("../../utils/reg");
var pathLib = require("path");
let fs = require('fs');
let bcrypt = require("bcrypt");
let options = {}
options.dbname = "XYM";
options.collectionName = "user";
options.url = "mongodb://127.0.0.1:27017";
/* GET users listing. */
router.get('/', function(req, res, next) {
    let username = req.body.username;
    let password = bcrypt.hashSync(req.body.password, 10);
    let name = req.body.name;
    let icon = '';
    if (!username || !password) {
        res.send({ err: 1, msg: '用户名和密码不能为空' })
        return;
    }
    //icon 借助multer  -》 icon 使用用户传递或者默认icon
    if (req.files && req.files.length > 0) {
        //改名 整合路径 存到 icon
        fs.renameSync(
            req.files[0].path,
            req.files[0].path + pathLib.parse(req.files[0].originalname).ext
        )
        icon = '/upload/user/' + username + '/' + req.files[0].filename + pathLib.parse(req.files[0].originalname).ext
    } else {
        icon = '/upload/noimage.png';
    }
    reg(req, res, next, { username, password, icon, name }, options);
});

module.exports = router;