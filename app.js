var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieSession = require('cookie-session');
var logger = require('morgan');
var multer = require("multer");
let cors = require('cors')
    // var indexRouter = require('./routes/index');
    // var usersRouter = require('./routes/users');

var app = express();
// let io = require('./bin/www')
// io.on('connection', function(socket) {
//     socket.emit('news', { hello: 'world' });
//     socket.on('my other event', function(data) { console.log(data); });
// });




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": true,
    "optionsSuccessStatus": 204,
    'credentials': true,
    // "whitelist": ['http://10.11.72.110:8080', 'http://localhost:8080']
}));
//设置允许跨域访问该服务.
// app.all('*', function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Methods', '*');
//     res.header('Content-Type', 'application/json;charset=utf-8');
//     next();
// });
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieSession(require("./config/cookieSet")));


//静态资源托管
app.use(express.static(path.join(__dirname, "public", "template")));
app.use("/admin", express.static(path.join(__dirname, "public", "admin")));
app.use("/upload", express.static(path.join(__dirname, "public", "upload")));
app.use("/public", express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public', 'template')));
// app.use('/admin', express.static(path.join(__dirname, 'public', 'admin')));
// app.use(express.static(path.join(__dirname, 'public')));


//multer模块处理文件

//定义storage对象(磁盘存储引擎，详见中文文档)

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (req.url.indexOf("user") || req.url.indexOf("reg")) {
            cb(null, path.join(__dirname + "/public" + "/upload" + "/user"))
        } else if (req.url.indexOf("banner")) {
            cb(null, path.join(__dirname + "/public" + "/upload" + "/banner"))
        } else {
            cb(null, path.join(__dirname + "/public" + "/upload" + "/other"))
        }
    },
    filename: function(req, file, cb) {
        cb(null, "xymYourDaddy_" + Date.now())
    }
})

var upload = multer({
    storage
})
app.use(upload.any())

//前端接口
// app.use('/api', require("./routes/api/loginTest"));
// app.all('/api/*', require("./routes/api/publicParams"));
// app.use('/api/user', require("./routes/api/user"));
// app.use('/api/home', require("./routes/api/home"));
app.use('/api/addFriend', require("./routes/api/addFriend"));
// app.use('/api/detail', require("./routes/api/detail"));
app.use('/api/login', require("./routes/api/login"));
app.use('/api/logout', require("./routes/api/logout"));
app.use('/api/reg', require("./routes/api/reg"));

app.use('/api/loginTest', require("./routes/api/loginTest"));
app.use('/api/setUser', require("./routes/api/setUser"));






// //微博发布栏接口
// //_limit,_page,
// app.use('/api/get', require('./routes/weibo/get'))
//     //
// app.use('/api/getAll', require('./routes/weibo/getAll'))

// //后端接口
// app.all('/admin/*', require("./routes/admin/publicParams"));
// app.use('/admin/user', require("./routes/admin/user"));
// app.use('/admin/login', require("./routes/admin/login"));
// app.use('/admin/reg', require("./routes/admin/reg"));
// app.use('/admin/setUser', require("./routes/admin/setUser"));


// app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;