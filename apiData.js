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
var musicSchema = mongoose.Schema({
    "author": String,
    "link": String,
    "pic": String,
    "type": String,
    "title": String,
    "url": String
})

var Music = mongoose.model("Music", musicSchema);

// 请求api接口，把数据导入本地数据库
var url = `https://api.apiopen.top/searchMusic?name=%22%E9%99%88%E5%A5%95%E8%BF%85%22`;

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
        let musicjson = jsondata.result;
        // console.log(musicjson);
        for (var key in musicjson) {
            Music.insertMany({
                "author": musicjson[key].author,
                "link": musicjson[key].link,
                "pic": musicjson[key].pic,
                "type": musicjson[key].type,
                "title": musicjson[key].title,
                "url": musicjson[key].url
            }, function(err, doc) {
                console.log(doc[0].title + "----" + doc[0].id);
            })
        }
    })
}).on("error", () => {
    console.log("数据请求失败");
})