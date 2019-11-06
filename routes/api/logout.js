var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    req.session['XYM'] = null;
    // console.log(req.session['XYM']);
    res.send({ err: 0, msg: "已退出登录" })
});

module.exports = router;