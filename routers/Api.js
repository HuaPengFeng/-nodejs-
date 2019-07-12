var express = require("express");
var router = express.Router();

var apiController = require("../controller/apiController")
var apiGoodsController = require("../controller/apiGoodsController")


//api模块
router.get("/", apiController.index)
router.get("/del", apiController.del);

//api商品板块
router.get("/goods", apiGoodsController.index)
router.get("/goods/list", apiGoodsController.list)
router.get("/goods/xq", apiGoodsController.xq)
module.exports = router;