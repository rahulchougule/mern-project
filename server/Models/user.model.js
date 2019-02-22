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

module.exports = mongoose.model("User", userSchema, "Users")