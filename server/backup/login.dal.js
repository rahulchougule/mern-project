var mongoose= require("mongoose");
var usermod = require("./../Models/user.model.js");
var jwt = require("jsonwebtoken");

var LoginModel = mongoose.model("User")

var jwtSettings = {
    jwtSecret:"qwertyasdfqwertyasdf"
};

module.exports = instance.set("jwtSecret", jwtSettings.jwtSecret)
var tokenStore="";

module.exports = {

    login:function(request, response){

        var login = {
            userName:request.body.userName, 
            password:request.body.password,
            dateTime:request.body.dateTime
        }

        LoginModel.findOne({userName:request.body.userName},function(err, res){

            if(err){
                response.send({status:500, error:"Internal server error"})
            }
            if(!res){
                response.send({status:401, message:"User not found"})
            }
            if(login.userName==""){
                response.send({status:400, message:"Please enter username"})
            }
            else if(res){
                if(login.password == ""){
                    response.send({status:402, message:"Please enter password"})
                }
                if(login.password != res.password){
                    response.send({status:403, message:"Invalid password"})
                }
                else{
                    var token = jwt.sign({res}, instance.get("jwtSecret"), {expiresIn:3066})
                    tokenStore = token;

                    response.send({
                        authenticated:true,
                        message:"login successfull",
                        token:token  // sending token to method , as a return of login() and will be set into session 

                    });
                }
            }
        });
    }
}