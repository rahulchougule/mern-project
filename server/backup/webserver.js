// load the required packages
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");


mongoose.Promise = global.Promise;
var cors = require("cors");
 
module.exports = instance = express();
var router = express.Router();
instance.use(router);
instance.use(bodyParser.urlencoded({ extended: false }));
instance.use(bodyParser.json());
instance.use(cors());  // to manage the different server origins

var Role = require("./Dal/role.dal.js");
var User = require("./Dal/user.dal.js");
var Login = require("./Dal/login.dal.js")

mongoose.connect(
    "mongodb://localhost/UserManagementSystem",
    { useNewUrlParser: true }
  );
  
  var dbConnect = mongoose.connection;
  if (!dbConnect) {
    console.log("Sorry Connection is not established");
    return;
  }

  console.log("connected");
  
  // var jwtSettings = {
  //     jwtSecret:"qwertyasdfqwertyasdf"
  // };

  // instance.set("jwtSecret", jwtSettings.jwtSecret)

  // to create role
  instance.post("/api/role", function(request, response){ // after hitting this url Role.postRoles will be executed. 
    var tokenReceived = request.headers.authorization.split(" ")[1];

    jwt.verify(tokenReceived, instance.get("jwtSecret"), function(err, decoded){
      if(err){
        response.send({status:500, error:"Internal server error : Token verification failed"})
      }
      else{
        request.decoded = decoded;
        Role.postRoles(request, response) // this method is defined in role.dal.js 
      }
    })
 
  });

  // to get roles
  instance.get("/api/role", function(request, response){
    Role.getRoles(request, response)
  });


  // to update role
  instance.put("/api/role", function(request, response){
    Role.updateRoles(request, response)
  });


  // to delete role
 instance.delete("/api/role", function(request, response){
   Role.deleteRoles(request, response)
 })


  // to get user /person
  instance.get("/api/user", function(request, response){
    User.getUsers(request, response)      
  })
 
 
  // to create user / person
  instance.post("/api/user", function(request, response){
    User.postUsers(request, response)      
  })

  
  // to update user
  instance.put("/api/user",function(request, response){
    User.updateUser(request, response)
  })


  // to delete user
  instance.delete("/api/user", function(request, response){
    
    User.deleteUser(request, response)
  })


  // to login 
  instance.post("/api/login",function(request, response){

    Login.login(request, response) 
  })


  instance.listen(4040, function() {
    console.log("Started listening on port 4040");
  });

  