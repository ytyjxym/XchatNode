var express = require('express');
var router = express.Router();
var send = require("../../utils/send");
var pathLib = require("path");
let fs = require('fs');
let bcrypt = require("bcrypt");
let io = require('../../bin/www')
    // let io = require('socket.io').listen(3000)
let options = {}
options.dbname = "XYM";
options.collectionName = "user";
options.url = "mongodb://127.0.0.1:27017";
/* GET users listing. */
router.get('/', function(req, res, next) {

    // send(req, res, next, options);


});
// io.on('connection',
//     function(socket) {
//         socket.emit('news', {
//             hello: 'world'
//         });
//         socket.on('my other event',
//             function(data) {
//                 console.log(data);
//             });
//     });
console.log(io);




module.exports = router;