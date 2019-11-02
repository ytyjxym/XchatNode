let mgdb = require("./mgdb");
let fs = require('fs');
setUser = (req, res, next, { _id, newName, newUsername, newPassword, newIcon }, options) => {
    mgdb(options)
        .then(({ client, collection, ObjectID }) => {
            collection.find({
                _id: ObjectID(_id)
            }, {}).toArray((err, result) => {
                if (err) {
                    res.send({ err: 2, msg: "数据库操作错误" })
                } else {
                    if (result.length > 0) {
                        let oldUsername = result[0].username;
                        let oldIcon = result[0].icon;
                        let username = newUsername || oldUsername;
                        let password = newPassword || result[0].password;
                        let name = newName || result[0].name;
                        let icon = newIcon || oldIcon;
                        fs.unlinkSync('./public' + oldIcon)
                        let data = { username, password, icon, name }
                        collection.updateOne({ _id: ObjectID(_id) }, data, (err, data) => {
                            if (err) {
                                res.send({ err: 2, msg: "数据库操作有误" })
                            } else {
                                delete data.password;
                                delete data.username;
                                req.session["XYM"] = data._id;
                                res.send({ err: 0, msg: "修改信息成功", data })
                            }
                        })
                    } else {
                        fs.unlinkSync('./public' + newIcon)
                        res.send({ err: 1, msg: "用户不存在" })
                    }
                }
            })
        })
        .catch((err) => {
            res.send({ err: 3, msg: err })
        })
}
module.exports = setUser;