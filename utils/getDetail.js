let mgdb = require("./mgdb");

getDetail = (req, res, next, _id, options) => {
    mgdb(options)
        .then(({ client, collection, ObjectID }) => {
            collection.find({
                _id: ObjectID(_id)
            }, {}).toArray((err, result) => {
                if (err) {
                    res.send({ err: 2, msg: "home库操作错误" })
                } else {
                    result.length > 0 ? res.send({ err: 0, data: result[0] }) : res.send({ err: 1, msg: "信息不存在" })
                }
            })
        })
        .catch((err) => {
            res.send({ err: 3, msg: err })


        })
}
module.exports = getDetail;