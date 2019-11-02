let mgdb = require("./mgdb");
let fs = require('fs');
let bcrypt = require("bcrypt");
setUser = (req, res, next, {
    _id,
    newName,
    newPassword,
    newIcon,
    oldPassword
}, options) => {
    mgdb(options)
        .then(({
            client,
            collection,
            ObjectID
        }) => {
            collection.find({
                _id: ObjectID(_id)
            }, {}).toArray((err, result) => {
                if (err) {
                    req.session["XYM"] = _id;
                    res.send({
                        err: 1,
                        msg: "数据库操作错误"
                    })
                } else {
                    if (result.length > 0) {
                        if (!bcrypt.compareSync(oldPassword, result[0].password)) {
                            req.session["XYM"] = _id;
                            res.send({
                                err: 3,
                                msg: "旧密码不正确"
                            })
                        } else {
                            let oldIcon = result[0].icon;
                            let password = newPassword || result[0].password;
                            let name = newName || result[0].name;
                            let icon = newIcon || oldIcon;
                            if (icon.indexOf('noimage') === -1) {
                                console.log(1);

                                fs.unlinkSync('./public' + oldIcon)
                            }
                            let data = {
                                password,
                                icon,
                                name
                            }
                            collection.updateOne({
                                _id: ObjectID(_id)
                            }, {
                                $set: data
                            }, (err, result) => {
                                if (err) {
                                    req.session["XYM"] = _id;
                                    res.send({
                                        err: 2,
                                        msg: "数据库操作有误"
                                    })
                                } else {
                                    delete data.password;
                                    delete data.username;
                                    req.session["XYM"] = _id;
                                    res.send({
                                        err: 0,
                                        msg: "修改信息成功",
                                        data
                                    })
                                }
                            })
                        }
                    } else {
                        if (icon.indexOf('noimage') === -1) {
                            fs.unlinkSync('./public' + newIcon)
                        }
                        res.send({
                            err: 1,
                            msg: "用户不存在"
                        })
                    }
                }
            })
        })
        .catch((err) => {
            res.send({
                err: 3,
                msg: err
            })
        })
}
module.exports = setUser;