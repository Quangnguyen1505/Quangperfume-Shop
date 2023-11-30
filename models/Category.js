const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title:String,
    dateCreate:Date,
    Status:Boolean
})
module.exports = mongoose.model("category",categorySchema);

