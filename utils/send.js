const mgdb = require("./mgdb");

send = (req, res, next, options) => {
    let _id = req.session['XYM']
    mgdb(options)
        .then(({ client, collection, ObjectID }) => {
            // collection.find({}, {
            //     limit: _limit,
            //     skip: _limit * _page,
            //     sort: {
            //         [_sort]: -1
            //     }
            // }).toArray((err, result) => {
            //     if (err) {
            //         res.send({ err: 2, msg: "home库操作错误" })
            //     } else {
            //         result.length > 0 ? res.send({ err: 0, data: result[0] }) : res.send({ err: 1, msg: "信息不存在" })
            //     }
            // })
            collection.insertOne({ title: req.query.title, content: req.query.content, time: new Date().getTime() }, (err, result) => {
                    if (!err) {
                        res.send({ err: 1, msg: '发送成功' })
                    }
                })
                // res.send({ err: 1, msg: "信息不存在" })
        })
}
module.exports = send;