var express = require("express");
var router = express.Router();
var adminController = require("../controller/adminController");
var categoryController = require("../controller/categoryController")
var goodsController = require("../controller/goodsController")


router.get("/login", adminController.login)
router.post("/login", adminController.loginPost)
router.use(adminController.validate) //验证是否登录，过滤后台连接
router.get("/", adminController.index)
router.get("/out", adminController.out)

//分类功能
router.get("/category", categoryController.index)
router.get("/category/add", categoryController.add)
router.post("/category/add", categoryController.addPost)
router.get("/category/edit", categoryController.edit)
router.post("/category/edit", categoryController.editPost)
router.get("/category/del", categoryController.del)



//商品功能
//查找数据渲染数据
router.get("/goods", goodsController.index);
//跳转添加数据页面
router.get("/goods/add", goodsController.add);
//添加数据
router.post("/goods/add", goodsController.addPost);
//上传图片
router.post("/goods/upload", goodsController.upload);
//删除图片
router.post("/goods/deleteImg", goodsController.deleteImg);
//修改功能
router.get("/goods/edit", goodsController.edit); //去到修改页面,并把需要修改的数据渲染到修改页
//修改好的数据重新写入数据库
router.post("/goods/edit", goodsController.editPost);
//删除功能
router.get("/goods/del", goodsController.del);

module.exports = router;