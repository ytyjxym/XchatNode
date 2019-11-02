const mgdb = require("./mgdb");

getAllDetail = (req, res, next, _id, options) => {
    let { _page, _limit, _sort, q } = req.query;
    q = q ? { title: eval('/' + q + '/') } : {}
    mgdb(options)
        .then(({ client, collection, ObjectID }) => {
            collection.find(q, {
                limit: _limit,
                skip: _limit * _page,
                sort: {
                    [_sort]: -1
                }
            }).toArray((err, result) => {
                if (err) {
                    res.send({ err: 2, msg: "home库操作错误" })
                } else {
                    result.length > 0 ? res.send({ err: 0, data: result }) : res.send({ err: 1, msg: "信息不存在" })
                }
            })
        })
}
module.exports = getAllDetail;