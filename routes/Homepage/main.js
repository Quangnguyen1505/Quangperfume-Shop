const checkAdmin = require('../../middlewares/verifyToken');
var cookieParser = require('cookie-parser');
module.exports = function(app){
    app.use(cookieParser());

    // administration
    app.get("/admin",checkAdmin,(req,res,next)=>{
        res.render("./admin/index",{page:"home"});
    });
    app.get("/login",(req,res)=>{
        res.render("./admin/login");
    });
    app.get("/Signup",(req,res)=>{
        res.render("./admin/signup");
    });
    app.get("/users",(req,res)=>{
        res.render("./admin/index",{page:"users"});
    });
    app.get("/products",(req,res)=>{
        res.render("./admin/index",{page:"products"});
    });
    app.get("/add-products",(req,res)=>{
        res.render("./admin/index",{page:"add-products"});
    });
    
    // User interface
    app.get("/Quangperfume",(req,res)=>{
        res.render("./user/index");
    });
    app.get("/introduce",(req,res)=>{
        res.render("./user/pages/introduce");
    });
    app.get("/contact",(req,res)=>{
        res.render("./user/pages/contact");
    });
    app.get("/products_women",(req,res)=>{
        res.render("./user/pages/perfume_women");
    });
    app.get("/products_man",(req,res)=>{
        res.render("./user/pages/perfume_man");
    });
    app.get("/other-products",(req,res)=>{
        res.render("./user/pages/other-products");
    });
}