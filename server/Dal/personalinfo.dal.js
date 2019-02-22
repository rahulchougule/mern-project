var mongoose = require("mongoose");
var personmod = require("./../Models/personalinfo.model")

var PersonalInfoModel = mongoose.model("PersonalInfo");
var PersonalInfoModelTemp = mongoose.model("PersonalInfoTemp");



module.exports = {
    getPersonalInfo:function(request, response){  // this method will get called from service url for execution

        // Business logic to get records from db ------------------------------------------------
      
        PersonalInfoModel.find().exec(function(err,res){   
            if(err){
                response.send({status:404, error:"Error: Error occured at getPersonalInfo()"})
            }

            if(!res)
            {
                response.send({status:401, error:"Personal details not found"})
            }
                response.send({status:200, data:res, message:"Details found"})
        })

        // End of business logic to get Srecords from db -----------------------------------------
    },
    getPersonalInfoTemp:function(request, response){  // this method will get called from service url for execution

        // Business logic to get records from db ------------------------------------------------
      
        PersonalInfoModelTemp.find().exec(function(err,res){   
            if(err){
                response.send({status:404, error:"Error: Error occured at getPersonalInfo()"})
            }

            if(!res)
            {
                response.send({status:401, error:"Personal details not found"})
            }
                response.send({status:200, data:res, message:"Details found"})
        })

        // End of business logic to get Srecords from db -----------------------------------------
    },
    getPersonalInfoByUserName:function(request, response){  // this method will get called from service url for execution

        // Business logic to get records from db ------------------------------------------------
        console.log("dal call");
        
        console.log("name in dal =====",{username: request.params.userName});
        
        PersonalInfoModel.findOne({
            userName:request.params.userName
        }, function(err,res){   
            if(err){
                response.send({status:404, error:"Error: Error occured at getPersonalInfo()"})
            }

                response.send({status:200, data:res, message:"Details found"})
                                
        })

        // End of business logic to get records from db -----------------------------------------
    },
    postPersonalInfo:function(request, response){

        // to post data into PersInfo collection
           
             
        let personalinfo = {
            userName : request.body.userName, 
            firstName:request.body.firstName,
            middleName:request.body.middleName,
            lastName:request.body.lastName,
            gender:request.body.gender,
            dob:request.body.dob,
            age:request.body.age,
            flat:request.body.flat,
            societyName:request.body.societyName,
            areaName:request.body.areaName,
            city:request.body.city,
            pinCode:request.body.pinCode,
            phoneNo:request.body.phoneNo,
            mobileNo:request.body.mobileNo,
            physicalDisablity:request.body.physicalDisablity,
            maritalStatus:request.body.maritalStatus,
            educationStatus:request.body.educationStatus,
            birthSign:request.body.birthSign

        }

            
        PersonalInfoModel.findOne({
            // firstName:request.body.firstName,
            // middleName:request.body.middleName,
            // lastName:request.body.lastName
        
            userName:request.body.userName
             },
            function(err, res){

            if(err){
                response.send({status:500, message:"Internal server error"})
            }
            if(res){
                               
                var condition = {userName:request.body.userName}
                
                PersonalInfoModel.findOneAndUpdate(condition, personalinfo, {upsert:true}, function(err, res){
                    if(err){
                      
                        response.send({status:500, error:"Internal Error: Error occured while updating records"})
                    }
                    else{
                        response.send({status:200, data:personalinfo, message:"Personal info updated"})
                    }
                })
            }
            else if(!res){ // if does not found any id

                PersonalInfoModel.create(personalinfo, function(err, res){
                 if(err){
                     response.send({status:500, error:"Internal server error" })
                 }   
                 response.send({status:200, data:res, message:"Personal info stored"})
                })
            }
            else
            {
                console.log("Person with same name exist");
                
                response.send({error:402, message:"Person with same name exist"})
            }
        })
    },
    postPersonalInfoTemp:function(request, response){

        // to post data into PersInfo collection
           
             
        let personalinfo = {
            userName : request.body.userName, 
            firstName:request.body.firstName,
            middleName:request.body.middleName,
            lastName:request.body.lastName,
            gender:request.body.gender,
            dob:request.body.dob,
            age:request.body.age,
            flat:request.body.flat,
            societyName:request.body.societyName,
            areaName:request.body.areaName,
            city:request.body.city,
            pinCode:request.body.pinCode,
            phoneNo:request.body.phoneNo,
            mobileNo:request.body.mobileNo,
            physicalDisablity:request.body.physicalDisablity,
            maritalStatus:request.body.maritalStatus,
            educationStatus:request.body.educationStatus,
            birthSign:request.body.birthSign

        }

            
        PersonalInfoModelTemp.findOne({
            // firstName:request.body.firstName,
            // middleName:request.body.middleName,
            // lastName:request.body.lastName
        
            userName:request.body.userName
             },
            function(err, res){

            if(err){
                response.send({status:500, message:"Internal server error"})
            }
            // if(res){
                               
            //     var condition = {userName:request.body.userName}
                
            //     PersonalInfoModelTemp.findOneAndUpdate(condition, personalinfo, {upsert:true}, function(err, res){
            //         if(err){
            //              console.log(err);
                         
            //             response.send({status:500, error:"Internal Error: Error occured while updating records", message:"Internal Error: Error occured while updating records"})
            //         }
            //         else{
            //             response.send({status:200, data:personalinfo, message:"Personal info updated"})
            //         }
            //     })
            // }
            else if(!res){ // if does not found any id

                PersonalInfoModelTemp.create(personalinfo, function(err, res){
                 if(err){
                     response.send({status:500, error:"Internal server error" })
                 }   
                 response.send({status:200, data:res, message:"Personal info stored"})
                })
            }
            else
            {
                console.log("Person with same name exist");
                
                response.send({error:402, message:"Person with same name exist"})
            }
        })
    },

    updatePersonalInfo:function(request, response){
        //  let personalinfo = {             
             
        //     firstName:request.body.firstName,
        //     middleName:request.body.middleName,
        //     lastName:request.body.lastName,
        //     gender:request.body.gender,
        //     dob:request.body.dob,
        //     age:request.body.age,
        //     flatNumber:request.body.flatNumber,
        //     societyName:request.body.societyName,
        //     areaName:request.body.areaName,
        //     city:request.body.city,
        //     pinCode:request.body.pinCode,
        //     phoneNo:request.body.phoneNo,
        //     mobileNo:request.body.mobileNo,
        //     physicalDisablity:request.body.physicalDisablity,
        //     maritalStatus:request.body.maritalStatus,
        //     educationStatus:request.body.educationStatus,
        //     birthSign:request.body.birthSign

        //  }

         PersonalInfoModel.findOneAndUpdate({id:request.body.id}, {$set:{
            firstName:request.body.firstName,
            middleName:request.body.middleName,
            lastName:request.body.lastName,
            gender:request.body.gender,
            dob:request.body.dob,
            age:request.body.age,
            flatNumber:request.body.flatNumber,
            societyName:request.body.societyName,
            areaName:request.body.areaName,
            city:request.body.city,
            pinCode:request.body.pinCode,
            phoneNo:request.body.phoneNo,
            mobileNo:request.body.mobileNo,
            physicalDisablity:request.body.physicalDisablity,
            maritalStatus:request.body.maritalStatus,
            educationStatus:request.body.educationStatus,
            birthSign:request.body.birthSign
            
            }}, function(err, res){
             if(err){
                 response.send({status:500,error:"Internal server error"})
             }
             response.send({status:200, message:"Personal details updated", data:res})
         })
    },

    deletePersonalInfoTemp:function(request, response){
        
        console.log(request.params.userName);
        
        PersonalInfoModelTemp.deleteOne({userName:request.params.userName}, function(err, res){

            if(err){
                response.send({status:500, error:"Internal server error"})
            }
            response.send({status:200, message:"Personal Info deleted"})
        })
    }
}
