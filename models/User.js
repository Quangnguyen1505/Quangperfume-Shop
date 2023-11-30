const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Email:{
        type:String,
        lowercase:true,
        unique:true,
        require:true
    },
    Password:{
        type:String,
        require:true
    },
    Name:String,
    address:String,
    mobile:Number,
    Active:Boolean,
    RegisterDate:Date,
    userType:Number // 0 user , 1 admin
})
module.exports = mongoose.model("users",userSchema);

