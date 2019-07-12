var express = require("express");
var router = express.Router();

router.get("/", (err, res) => {
    res.send("前台首页")
})
router.get("/list", (err, res) => {
    res.send("前台列表")
})
router.get("/xq", (err, res) => {
    res.send("前台详情页")
})

module.exports = router;