const Controller = require("./controller");
const Category = require("../models/Category");

class CategoryController extends Controller {
    constructor() {
        super();
    }

    //查找数据 分类首页（查找数据库的数据渲染到category）
    index(req, res) {
        Category.getCategoryDataAndCount(10, req.query.page, function(result, num) {
            // console.log(result)
            req.session.result = result;
            req.session.pageCount = num;
            res.render("admin/category", req.session);
        })
    }
    add(req, res) {
        res.render("admin/categoryAdd", req.session);
    }

    //增加数据 往数据库添加数据
    addPost(req, res) {
        Category.insertMany(req.body, function(err, result) {
            if (err) {
                res.render("admin/error", { err: "数据操作失败", url: "/admin/category", date: 3000 })
                return;
            };
            res.redirect('/admin/category');
        })
    }

    //修改数据
    //1.去到修改页，把当前内容渲染到输入框
    edit(req, res) {
        var id = req.query.id;
        Category.find({ "_id": id }, function(err, result) {
            if (err) {
                res.render("admin/error", { err: "数据操作失败", url: "/admin/category", date: 3000 })
            } else {
                req.session.result = result[0]
                res.render("admin/categoryEdit", req.session)
            }
        })
    }

    //修改输入框中的内容，覆盖原本内容
    editPost(req, res) {
        var id = req.body.id;
        // console.log(req.body)
        Category.updateOne({ "_id": id }, {
            $set: {
                "author": req.body.author,
                "title": req.body.title,
            }
        }, function(err, result) {
            if (err) {
                res.render("admin/error", { err: "数据操作失败", url: "/admin/category", date: 3000 })
            } else {
                res.redirect('/admin/category');
            }
        })
    }

    //删除数据
    del(req, res) {
        var id = req.query.id;
        Category.deleteOne({ "_id": id }, function(err) {
            if (err) {
                res.render("admin/error", { err: "数据操作失败", url: "/admin/category", date: 3000 })
            } else {
                res.redirect('/admin/category');
            }
        })
    }
}
module.exports = new CategoryController;