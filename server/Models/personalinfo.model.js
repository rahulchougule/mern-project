var mongoose = require("mongoose");

var personalInfoSchema = mongoose.Schema({

            userName:String,
            firstName:String,
            middleName:String,
            lastName:String,            
            gender:String,
            dob:String,
            age:Number,
            flat:String,
            societyName:String,
            areaName:String,
            city:String,
            pinCode:Number,
            phoneNo:Number,
            mobileNo:Number,
            physicalDisablity:String,
            maritalStatus:String,
            educationStatus:String,
            birthSign:String

});

module.exports = mongoose.model("PersonalInfo", personalInfoSchema, "PersonalInformation");

module.exports = mongoose.model("PersonalInfoTemp", personalInfoSchema, "PersonalInformationTemp");
