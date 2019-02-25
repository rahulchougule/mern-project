var mongoose =  require("mongoose");

var userSchema = mongoose.Schema({
    
     id:Number,
     userName:String,
     password:String,
     role:String,
     email:String,     
     dateTime:Date
     //ipAddress:Number
})

var LoginStatusSchema = mongoose.Schema({
     userName:String,
     dateTime:Date,
     ip:String
})


module.exports = mongoose.model("User", userSchema, "Users")

module.exports = mongoose.model("LoginStatus", LoginStatusSchema, "LoginStatus")