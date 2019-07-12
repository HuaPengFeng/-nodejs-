var Controller = require("./controller");
var goods = require("../models/goods");
var fs = require("fs");
var uploads = require("../function/uploads")

class goodsController extends Controller {
    constructor() {
        super();
    }

    //查找数据库数据渲染首页
    index(req, res) {
        goods.getGoodsDataAndCount(3, req.query.page, function(result, num) {
            // console.log(result)
            req.session.result = result;
            req.session.pageCount = num;
            res.render("admin/goods", req.session);
        })
    }

    add(req, res) {
        res.render("admin/goodsAdd", req.session)
    }

    //提交数据到后台
    addPost(req, res) {
        // console.log(req.body)
        goods.insertMany(req.body, function(err, result) {
            if (err) {
                res.render("admin/error", { err: "数据操作失败", url: "/admin/goods", date: 3000 })
                return;
            };
            res.redirect('/admin/goods');
        })
    }

    //提交图片
    upload(req, res) {
        uploads.init(req, function(data) {
            if (data.err == 200) {
                res.json(data)
            } else {
                res.render("admin/goods", { err: data.err, url: "/admin/goods", date: 3000 })
            }
        })
    }

    //删除后台图片
    deleteImg(req, res) {
        fs.unlink("./" + req.body.url, function(err, result) {
            if (err) {
                throw Error(err)
            } else {
                res.send("1")
                return
            }
        })
    }

    //修改功能
    edit(req, res) {
        var id = req.query.id;
        goods.find({ "_id": id }, function(err, result) {
            if (err) {
                throw Error(err)
            } else {
                req.session.result = result[0]
                res.render("admin/goodsEdit", req.session)
            }
        })
    }
    editPost(req, res) {
        var id = req.body.id;
        // console.log(req.body)
        goods.updateOne({ "_id": id }, req.body, function(err, result) {
            if (err) {
                res.render("admin/error", { err: "数据操作失败", url: "/admin/goods", date: 3000 })
            } else {
                res.redirect('/admin/goods');
            }
        })
    }


    //删除功能
    del(req, res) {
        var id = req.query.id;
        goods.FindAndDelete(id, function() {
            res.redirect("/admin/goods")
            return;
        })

    }
}


module.exports = new goodsController;