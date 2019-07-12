var controller = require("./controller");
const Api = require("../models/ApiData")

class apiController extends controller {
    constructor() {
        super();
    }

    //查找数据 分类首页（查找数据库的数据渲染到category）
    index(req, res) {
        Api.getApiDataAndCount(10, req.query.page, function(result, num) {
            // console.log(result)
            req.session.result = result;
            req.session.pageCount = num;
            res.render("admin/api", req.session);
        })
    }

    //删除数据
    del(req, res) {
        var id = req.query.id;
        Api.deleteOne({ "_id": id }, function(err) {
            if (err) {
                res.render("api", { err: "数据操作失败", url: "/api", date: 3000 })
            } else {
                res.redirect('/api');
            }
        })
    }
}

module.exports = new apiController;