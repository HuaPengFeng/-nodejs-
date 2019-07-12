const mongoose = require("mongoose");

// 请求数据 http模块
const http = require("https");
// 数据库连接与服务器开启
mongoose.connect("mongodb://127.0.0.1:27017/newAdmin", { useNewUrlParser: true }, function(err) {
    if (err) {
        throw Error(err);
        console.log("请检查数据库连接");
    }
})

// 数据库骨架
var poetrySchema = mongoose.Schema({
    "title": String,
    "content": String,
    "authors": String
})

var poetry = mongoose.model("poetry", poetrySchema);

// 请求api接口，把数据导入本地数据库
var url = `https://api.apiopen.top/getSongPoetry?page=1&count=20`;

http.get(url, (res) => {
    // 数据请求一段一段接收
    var data = "";
    res.on("data", (chunk) => {
        data += chunk;
    })
    res.on("end", () => {
        // 字符串转json
        let jsondata = JSON.parse(data);
        // console.log(jsondata)
        // 把数据表里数据库
        let poetryjson = jsondata.result;
        console.log(poetryjson);
        for (var key in poetryjson) {
            poetry.insertMany({
                "title": poetryjson[key].title,
                "content": poetryjson[key].content,
                "authors": poetryjson[key].authors
            }, function(err, doc) {
                console.log("数据插入成功");
            })
        }
    })
}).on("error", () => {
    console.log("数据请求失败");
})