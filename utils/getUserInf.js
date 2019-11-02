let mgdb = require("./mgdb");
getDetail = (req, res, next, _id, options) => {
    mgdb(options)
        .then(({ client, collection, ObjectID }) => {
            collection.find({
                _id: ObjectID(_id)
            }, {}).toArray((err, result) => {
                if (err) {
                    res.send({ err: 2, msg: "user库操作错误" })
                } else {
                    if (result.length > 0) {
                        delete result[0].password;
                        delete result[0].username;
                        // req.session["XYM"] = result[0]._id;
                        res.send({ err: 0, data: result[0] })
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
module.exports = getDetail;