var mongoose = require("mongoose") // to execute mongodb functions
var rolemod = require("./../Models/role.js") // to access schema

var RoleModel = mongoose.model("Role"); // model name 

module.exports={

    getRoles:function(request, response){  // this method will get called from service url for execution

        // Business logic to get records from db ------------------------------------------------
      
        RoleModel.find().exec(function(err,res){   
            if(err){
                response.send({status:404, error:"Error: Error occured at getRoles()"})
            }

            if(!res)
            {
                response.send({status:401, error:"Role not found"})
            }
                response.send({status:200, data:res, message:"Role found"})
        })

        // End of business logic to get records from db -----------------------------------------
    },

    postRoles:function(request, response){
        
        let role = {roleId:request.body.roleId, roleName:request.body.roleName}

        //console.log(request.body);
        
        RoleModel.findOne({roleName:role.roleName}, function(err, res){
            if(err){
                response.send({stauts:500, error:"Error occured while searching for record"})
            }             
            else if(!res) 
            {
                RoleModel.create(role, function(err, res){
                    if(err){
                        response.send({status:404, error:" Error occured at postRoles() "})
                    }   
                    
                        
                    response.send({status:200, data:res, message:"New role created"})
                })
            }           
            else {
                response.send({status:402, error:"Role already defined."})
            }            
        })    
    },

    updateRoles:function(request, response){

        let role = {roleId:request.body.roleId, roleName:request.body.roleName}

        
        RoleModel.findOneAndUpdate({roleId:role.roleId}, {$set:{'roleName':role.roleName}}, function(err, res){
            if(err){
                response.send({status:500, error:"Internal server error"})
            }
            response.send({status:200, message:"Role updated", data:res})

        });
    },

    deleteRoles:function(request, response){
        let role ={roleId:request.body.roleId}
        RoleModel.deleteOne({roleId:role.roleId}, function(err, res){
            if(err){
                response.send({stauts:500, error:"Internal server error"})
            }
            response.send({status:200, message:"Role deleted"})
        })
    }
}