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
var itemSchema = mongoose.Schema({
    "text": String,
    "username": String,
    "header": String,
    "top_commentsContent": String,
    "top_commentsHeader": String,
    "top_commentsName": String,
    "passtime": String,
    "thumbnail": String,
    "video": String
})

var item = mongoose.model("item", itemSchema);

// 请求api接口，把数据导入本地数据库
var url = `https://www.apiopen.top/satinGodApi?type=1&page=1`;

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
        let itemjson = jsondata.data;
        console.log(itemjson);
        for (var key in itemjson) {
            item.insertMany({
                "text": itemjson[key].text,
                "username": itemjson[key].username,
                "header": itemjson[key].header,
                "top_commentsContent": itemjson[key].top_commentsContent,
                "top_commentsHeader": itemjson[key].top_commentsHeader,
                "top_commentsName": itemjson[key].top_commentsName,
                "passtime": itemjson[key].passtime,
                "thumbnail": itemjson[key].thumbnail,
                "video": itemjson[key].video
            }, function(err, doc) {
                console.log(doc[0].title + "----" + doc[0].id);
            })
        }
    })
}).on("error", () => {
    console.log("数据请求失败");
})