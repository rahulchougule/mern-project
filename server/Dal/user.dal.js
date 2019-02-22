var mongoose = require("mongoose");
var usermod = require("./../Models/user.model")

var UserModel = mongoose.model("User");

module.exports = {
    getUsers:function(request, response){  // this method will get called from service url for execution

        // Business logic to get records from db ------------------------------------------------
      
        UserModel.find().exec(function(err,res){   
            if(err){
                response.send({status:404, error:"Error: Error occured at getRoles()"})
            }

            if(!res)
            {
                response.send({status:401, error:"User not found"})
            }
                response.send({status:200, data:res, message:"User found"})
               
                
        })

        // End of business logic to get records from db -----------------------------------------
    },
    postUsers:function(request, response){

        // to post data into PersInfo collection

        let user = {
            //id : request.body.id, 
            userName:request.body.userName, 
            password:request.body.password,
            role:request.body.role,
            email:request.body.email,
            dateTime:new Date()

        }

        UserModel.findOne({userName:request.body.userName}, function(err, res){

            if(err){
                response.send({status:500, error:"Internal server error"})
            }
            else if(!res){ // if does not found any id

                UserModel.create(user, function(err, res){
                 if(err){
                     response.send({status:500, error:"Internal server error" })
                 }   
                 response.send({status:200, data:res, message:"New user created"})
                })
            }
            else
            {
                response.send({error:402, error:"User with same name exist"})
            }
        })
    },
    updateUser:function(request, response){
         let user = {             
            id : request.body.id, 
            userName:request.body.userName, 
            password:request.body.password,
            dateTime:request.body.dateTime
         }

         UserModel.findOneAndUpdate({id:user.id}, {$set:{userName:user.userName, password:user.password, dateTime:user.dateTime}}, function(err, res){
             if(err){
                 response.send({status:500,error:"Internal server error"})
             }
             response.send({status:200, message:"User details updated", data:res})
         })
    },

    deleteUser:function(request, response){
        
        UserModel.deleteOne({id:request.body.id}, function(err, res){
            if(err){
                response.send({status:500, error:"Internal server error"})
            }
            response.send({status:200, message:"User deleted"})
        })
    }
}
