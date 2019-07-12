//项目入口文件只做配置


//加载模块
var express = require("express");
var ejs = require("ejs");
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var session = require("express-session")
var app = express();

//模板引擎配置
app.engine('html', ejs.__express);
app.set('view engine', 'html')
    //静态文件加载
app.use(express.static("./public"))
app.use("/uploads", express.static("./uploads"))

//post数据请求处理
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//session配置
app.use(session({
    secret: "check", //验证data+key 随便定义
    resave: false,
    saveUninitialized: true
}))

// 第一模块 前台首页
app.use('/', require("./routers/Main"));

// 第二模块 后台首页
app.use('/admin', require("./routers/Admin"))

// 第三模块 API板块
app.use('/api', require("./routers/Api"))




//数据库连接和服务器开启

mongoose.connect("mongodb://192.168.31.107:27017/newAdmin", { useNewUrlParser: true }, function(err) {
    if (err) {
        throw Error(err)
        console.log("数据库连接失败");
    } else {
        //网络监听
        app.listen(3000, '192.168.31.107', () => console.log("请访问：http://192.168.31.107:3000"))
    }
})

// 192.168.31.107