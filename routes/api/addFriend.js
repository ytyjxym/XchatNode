var express = require('express');
var router = express.Router();
var setUser = require("../../utils/setUser")
let options = {}
options.dbname = "XYM";
options.collectionName = "user";
options.url = "mongodb://127.0.0.1:27017";
/* GET users listing. */
router.get('/', async(req, res, next) => {
    let _id = req.session['XYM'];
    let { newName, newUsername, newPassword } = { newName: req.body.newName, newUsername: req.body.newUsername, newPassword: req.body.newPassword ? bcrypt.hashSync(req.body.newPassword, 10) : req.body.newPassword };
    let newIcon = '';
    if (!_id) {
        res.send({ err: 1, msg: "未登录" })
    } else {
        if (req.files && req.files.length > 0) {
            fs.renameSync(
                req.files[0].path,
                req.files[0].path + pathLib.parse(req.files[0].originalname).ext
            )
            newIcon = '/upload/user/' + req.files[0].filename + pathLib.parse(req.files[0].originalname).ext;
        }
    }
    setUser(req, res, next, { _id, newName, newUsername, newPassword, newIcon }, options);
});

module.exports = router;