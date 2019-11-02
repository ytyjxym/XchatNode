let mgdb = require("./mgdb");
const bcrypt = require("bcrypt");
var cookieSession = require('cookie-session');
getUser = (req, res, next, options) => {
    let username = req.body.username;
    let password = req.body.password;
    mgdb(options)
        .then(({ client, collection, ObjectID }) => {
            collection.find({
                username
            }, {}).toArray((err, result) => {
                if (err) {
                    res.send({ err: 2, msg: "user库操作错误" })
                } else {
                    if (result.length > 0) {
                        let pwdTest = bcrypt.compareSync(password, result[0].password)
                        if (!pwdTest) {
                            res.send({ err: 1, msg: "用户名或密码不正确" })
                        } else {
                            delete result[0].password;
                            delete result[0].username;
                            req.session["XYM"] = result[0]._id;
                            res.send({ err: 0, data: result[0] })
                        }
                    } else {
                        res.send({ err: 1, msg: "用户名或密码不正确" })
                    }
                }
            })
        })
        .catch((err) => {
            res.send({ err: 3, msg: err })
        })
}
module.exports = getUser;