const express = require('express');
var app = express();
app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static("public"));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require('mongoose');
require('dotenv').config();
//Connect database 
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(`${MONGODB_URL}`)
.then(()=>{
    console.log("Mongoose Connect Success");
    require('./routes/Homepage/User')(app);
    require('./routes/Homepage/Product')(app);
    require('./routes/Homepage/main')(app);
}).catch((err)=>{
    console.log(err);
    console.log("Mongoose Connect Failed");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT,function(){
    console.log(`Server running on ${PORT}`);
});

