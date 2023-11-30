var jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const checkAdmin = (req, res, next) => {
    // app.use(cookieParser());
    if (!req.cookies.TOKEN) {
        // res.json({result:0,message:"Wrong parameters"});
        res.redirect("./login");
    } else {
        var token = req.cookies.TOKEN;
        console.log(token);
        Token.findOne({Token :token,Status:true})
            .then((t) => {
                if (t == null) {
                    res.redirect("./login");
                    // res.json({result:0,message:"Token has been expried"});
                } else {
                    //verify
                    jwt.verify(token, process.env.privateKey, function (err, decoded) {
                        if (err) {
                            res.redirect("./login");
                            // res.json({result:0,message:"Token error"});
                        } else {
                            if (decoded.data.userType == 1) {
                                next();
                            } else {
                                res.redirect("./Quangperfume");
                                // res.json({result:0,message:"You are not allowed"});
                            }
                        }
                    });
                }
            })
            .catch((err) => {
                res.redirect("./login");
                // res.json({result:0,message:"Invalid token"});
            })
    }
}
module.exports = checkAdmin;