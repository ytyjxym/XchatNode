#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('www:server');
var http, port, server
    //服务器端口配置
const portCfg = require("../config/server")
if (portCfg.local.open) {
    http = require("http");
    port = portCfg.local.port;
    server = http.createServer(app);
} else if (poreCfg.http.open) {
    http = require("http");
    port = portCfg.http.port;
    server = http.createServer(app);
} else if (portCfg.https.open) {
    http = require("https");
    port = portCfg.https.port;
    // const options = {
    //   key: fs.readFileSync('./bin/1826016_uncle9.top.key'),
    //   cert: fs.readFileSync('./bin/1826016_uncle9.top.pem'),
    // };
    // server = http.createServer(options,app); 
    server = http.createServer(app);
}

// var http = require('http');

// /**
//  * Get port from environment and store in Express.
//  */

// var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// /**
//  * Create HTTP server.
//  */

// var server = http.createServer(app);

// /**
//  * Listen on provided port, on all network interfaces.
//  */

server.listen(port);


server.on('error', onError);
server.on('listening', onListening);
//推送事件配置
let SOCKETIO = require('socket.io'); //创建socket实例
let io = SOCKETIO.listen(server); //监听http实例，未来3000端口下的http请求，会触发socket
let userList = [];

/* GET users listing. */

// io.on('connection',
//     (socket) => {
//         console.log('已连接');
//         socket.on('user', (data) => {
//             data.id = userList.length + 1;
//             userList.push(data)
//             io.emit('user', userList);
//         })

//         socket.on('msg',
//             (data) => {
//                 console.log(data);
//                 io.emit('msg', data);
//             });
//         socket.on('disconnection', () => {
//             console.log('已下线');

//         })
//     });
io.on('connection',
    (socket) => {
        console.log('已连接');
        let id = '';
        //login
        socket.on('userLogin', (data) => {
            if (userList.find(user => user.id === data.id)) {
                userList.find((user, idx) => {
                    if (user.id === data.id) {
                        // console.log(userList);
                        userList[idx] = data;
                        io.emit('user', userList);
                    }
                });
            } else {
                io.emit('userEnter', `${data.name}进入聊天室`)
                id = data.id;
                userList.push(data)
                io.emit('user', userList);
            }
        })

        //sendMsg
        socket.on('msg',
            (data) => {
                data.time = new Date().getTime();
                io.emit('msg', data);
                // console.log(data);

            });
        //logout
        socket.on('disconnect', () => {
            userList.map((user, idx) => {
                    if (user.id === id) {
                        io.emit('userLogout', `${userList[idx].name}已下线`);
                        userList.splice(idx, 1);
                        io.emit('user', userList);
                    }
                })
                // socket.on('delUser', (id) => {
                //     console.log(id);

            //     // userList.map((user, idx) => {
            //     //     if (user.id === id) {
            //     //         io.emit('userLogout', `${userList[idx].name}已下线`);
            //     //         userList.splice(idx, 1);
            //     //         io.emit('user', { userList });
            //     //     }
            //     // })
            // })
        })
    });
// send(req, res, next, options);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}

module.exports = server;