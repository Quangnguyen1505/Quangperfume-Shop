const User = require('../../models/User');
const Token = require('../../models/Token');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
module.exports = function(app){
    app.post("/Register",(req,res)=>{
        var email = req.body.Email;
        var password = req.body.Password;
        var name = req.body.Name;
        var address = req.body.address;
        var mobile = req.body.mobile;
        if(!email || !password){
            // res.json({result:0,message:"Register wrong parameters"});
            console.log("error");
        }else{
            User.findOne({Email:email}).then((data)=>{
                if(data!=null){
                    res.json({result:0,message:"User is not availble."});
                }else{
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(password, salt, function(err, hash) {
                            if(err){
                                res.json({result:0,message:"Password hash error."});
                            }else{
                                const NewUser = new User({
                                    Email:email,
                                    Password:hash,
                                
                                    Avatar:"aa.png",
                                    Name:name,
                                    address:address,
                                    mobile:mobile,
                                    Active:true,
                                    RegisterDate:Date.now(),
                                    userType:0 // 0 user , 1 admin
                                });
                                NewUser.save().then((data)=>{
                                    res.json({result:1,message:"User Register Succesfully!",data:data});
                                    // console.log("User Register Succesfully!",data);
                                }).catch((err)=>{
                                    // res.json({result:0,message:"User Register Error.",error:err});
                                    console.log("User Register Error.",err);
                                })
                            }
                        });
                    });
                }
            }).catch((Err)=>{
                res.json({result:0,message:"Find error."});
            })
        }
    });
    app.post("/Login",(req,res)=>{
        var email = req.body.Email;
        var password = req.body.Password;
        console.log(email)
        if(!email || !password){
            res.json({result:0,message:"Register wrong parameters"});
        }else{
            User.findOne({Email:email}).then((data)=>{
                if(data!=null){
                    bcrypt.compare(password, data.Password, function(err, result) {
                        if(result===true){
                            data.Password="hello";
                            jwt.sign({
                                data: data
                              }, process.env.privateKey, { expiresIn: 60*60 },function(err,token){
                                    if(err){
                                        res.json({result:0,message:"Token error"});
                                    }else{
                                        const newToken = new Token({
                                            Email:email,
                                            Token:token,
                                            Status:true,
                                            RegisterDate:Date.now()
                                        });
                                        newToken.save().then((data)=>{
                                            res.json({result:1,message:"Create Token succesfully!",token:token});
                                        }).catch((err)=>{
                                            res.json({result:0,message:"Create Token failed!"});
                                        });
                                    }
                              });
                        }else{
                            res.json({result:0,message:"Password error"});
                        }
                    });
                }else{
                    res.json({result:0,message:"User is not register."});
                }
            }).catch((Err)=>{
                res.json({result:0,message:"Find error."});
            })
        }
    });
    app.post("/Verify",(req,res)=>{
        var token = req.body.Token;
        if(!token){
            res.json({result:0,message:"Token wrong parameters"});
        }else{
            Token.findOne({Token :token,Status:true}).then((data)=>{
                if(data==null){
                    res.json({result:0,message:"Token has been expried"})
                }else{
                    jwt.verify(token, process.env.privateKey, function(err, decoded) {
                        if(err){
                            res.json({result:0,message:"Verify Token Error!"});
                        }else{
                            res.json({result:1,message:"Verify Token Successfully!",dt:decoded});
                        }
                      });
                }
            }).catch((err)=>{
                res.json({result:0,message:"Invalid Token !",e:err});
            })
        }
    });
    app.post("/Logout",(req,res)=>{
        var token = req.body.Token;
        if(!token){
            res.json({result:0,message:"Token in parameter"});
        }else{
            Token.findOneAndDelete({Token:token},{Status:false}).then(()=>{
                res.json({result:1,message:"Logout is successfully!"});
            }).catch((e)=>{
                res.json({result:0,message:"Logout is failed!"});
            })
        }
    });
    // show list views admin
    app.post("/listuser",(req,res)=>{
        User.find({userType:0}).then((data)=>{
            res.json({
                result:1,
                userdata:data
            })
        }).catch((e)=>{
            res.json({
                result:0
            })
        })
    });
    app.get("/delete/user/:id",(req,res)=>{
        User.findByIdAndDelete(req.params.id).then((dt)=>{
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
