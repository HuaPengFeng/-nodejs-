var controller = require("./controller");

class apiGoodsController extends controller {
    constructor() {
        super();
    }
    index(req, res) {
        res.send("api商品首页")
    }
    list(req, res) {
        res.send("api商品列表")
    }
    xq(req, res) {
        res.send("api商品详情页")
    }
}

module.exports = new apiGoodsController;