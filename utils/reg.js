let mgdb = require("./mgdb");
let fs = require('fs');
reg = (req, res, next, { username, password, icon, name }, options) => {
    mgdb(options)
        .then(({ client, collection, ObjectID }) => {
            collection.find({
                username
            }, {}).toArray((err, result) => {
                if (err) {
                    res.send({ err: 2, msg: "user库操作错误" })
                } else {
                    if (result.length > 0) {
                        if (icon.indexOf('noimage') === -1) {
                            fs.unlinkSync('./public/user' + icon)
                        }
                        res.send({ err: 1, msg: "用户名已存在" })
                    } else {
                        friend = [];
                        name = name || "xymDaddy" + parseInt(Math.random() * 10000000000)
                        let data = { username, password, icon, name, friend }
                        collection.insertOne(data, (err, result) => {
                            if (err) {
                                res.send({ err: 0, msg: "数据库操作有误" })
                            } else {
                                req.session["XYM"] = result.insertedId;
                                data._id = result.insertedId;
                                delete data.password;
                                delete data.username;
                                res.send({ err: 0, msg: "注册成功", data })
                            }
                        })
                    }
                }
            })
        })
        .catch((err) => {
            res.send({ err: 3, msg: err })
        })
}
module.exports = reg;