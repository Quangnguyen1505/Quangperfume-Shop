const Cate = require('../../models/Category');
const Product = require("../../models/product");
var multer = require('multer');
module.exports = function(app){
    app.post("/administrator/category",(req,res)=>{
        Cate.find().then((data)=>{
            res.json({result:1,categories:data});
        }).catch((err)=>{
            res.json({result:0,err:err});
        });
    });
    app.post("/addNew/Product",(req,res)=>{
        // if(!Title || !Category || !Price_original || !Description){
        //     // res.json({result:0,message:"Wrong paramters"})
        //     console.log("rong");
        // }else{
            // var newProd = new Product({
            //     title:req.body.title,
            //     category_id:req.body.category_id,
            //     price_original:req.body.price_original,
            //     price_current: req.body.price_current,
            //     image:req.body.image,
            //     description:req.body.description,
            //     dateCreate:Date.now(),
            //     Status:true
            // });
            // newProd.save().then((data)=>{
            //     // res.json({result:1,message:"Product save successfully!"});
            //     console.log("lưu thanh cong"+data);
            // }).catch((e)=>{
            //     // res.json({result:0,message:"Product save faled!"});
            //     console.log("lưu failed"+e);
            // })
        // }
        upload(req, res, function (err) {
            console.log(req.body);
            var newProd = new Product({
                title:req.body.title,
                category_id:req.body.category_id,
                price_original:req.body.price_original,
                price_current: req.body.price_current,
                image:req.body.image,
                description:req.body.description,
                dateCreate:Date.now(),
                Status:true
            });
            newProd.save().then(()=>{
                console.log("save succes");
            })
            .catch((e)=>{
                console.log("save failed"+e);
            })
        });
    });
    // upload files
    //multer
    //random number
    function randomXToY(minVal, maxVal) {
        var randVal = minVal + (Math.random() * (maxVal - minVal));
        return Math.round(randVal);
    }
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/upload')
        },
        filename: function (req, file, cb) {
            cb(null, randomXToY(10, 999) + "-" + file.originalname)
        }
    });
    var upload = multer({
        storage: storage,
        fileFilter: function (req, file, cb) {
            console.log(file);
            if (file.mimetype == "image/bmp"
                || file.mimetype == "image/png"
                || file.mimetype == "image/gif"
                || file.mimetype == "image/jpg"
                || file.mimetype == "image/jpeg"
            ) {
                cb(null, true)
            } else {
                return cb(new Error('Only image are allowed!'))
            }
        }
    }).single("avatar");

    app.post("/uploadfile", function (req, res) {

        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                res.json({ result: 0, message: "A Multer error occurred when uploading." });
            } else if (err) {
                res.json({ result: 0, message: "An unknown error occurred when uploading." });
            } else {
                console.log(req.file); // Thông tin file đã upload
                res.json({ result: 1, message: "Upload is okay", info: req.file });
            }

        });
    });
    app.post("/listprod",(req,res)=>{
        Product.find().then((data)=>{
            res.json({
                result:1,
                proddata:data
            });
        }).catch((e)=>{
            res.json({
                result:0
            })
        })
    });
    app.post("/listprod_women",(req,res)=>{
        Product.find({category_id:"Nước hoa nữ"}).then((data)=>{
            res.json({
                result:1,
                proddata:data
            });
        }).catch((e)=>{
            res.json({
                result:0
            })
        })
    });
    app.post("/listprod_man",(req,res)=>{
        Product.find({category_id:"Nước hoa nam"}).then((data)=>{
            res.json({
                result:1,
                proddata:data
            });
        }).catch((e)=>{
            res.json({
                result:0
            })
        })
    });
    app.post("/listprod_other",(req,res)=>{
        Product.find({category_id:"Sản phẩm khác"}).then((data)=>{
            res.json({
                result:1,
                proddata:data
            });
        }).catch((e)=>{
            res.json({
                result:0
            })
        })
    });
    app.get("/delete/:id",(req,res)=>{
        Product.findByIdAndDelete(req.params.id).then((dt)=>{
            res.json({
                result:1
            })
        }).catch((e)=>{
            res.json({
                result:0
            })
        });
    });
    
}