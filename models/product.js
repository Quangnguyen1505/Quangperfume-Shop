const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:String,
    category_id:String,
    price_original:Number,
    price_current:Number,
    image:String,
    description:String,
    dateCreate:Date,
    Status:Boolean
})
module.exports = mongoose.model("product",productSchema);

