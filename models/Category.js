var mongoose = require("mongoose");

var CategorySchema = mongoose.Schema({
    author: String,
    title: String,
    pic: String
})

CategorySchema.statics.getCategoryDataAndCount = function(limit, pageData, callback) {
    var page = 0;
    if (pageData != undefined) {
        page = pageData;
    }
    var _this = this;
    _this.find({}).limit(limit).skip(page * limit).sort({ _id: -1 }).then(function(result) {
        _this.find().countDocuments().then(function(num) {
            callback(result, Math.ceil(num / limit))
        })
    })
}

module.exports = mongoose.model("Music", CategorySchema)