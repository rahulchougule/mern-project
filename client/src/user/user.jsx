import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Header from "../header.js";
import Menu from "./../menu.js";
import UserService from "./../service/userservice.js";

var logo = require('./../images/logo.png')

class CreatUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userName:"",
            email:"",
            password:"",
            role:"",
            Users:[],
             authenticated:false
         }

         this.token = sessionStorage.getItem("token");
         this.role = sessionStorage.getItem("role");
         if(this.role === "Admin"){
             this.state.authenticated = true
         }
        this.serve = new UserService();
    }

    onChangeInput(e){        
        this.setState({[e.target.name]:e.target.value})
    }

    onClickSave(e){
        if(this.role === "Admin" || this.role === "Operator"){
        let user ={
            userName:this.state.userName,
            email:this.state.email,
            password:this.state.password,
            role:this.state.role
        }

        this.serve.createUser(user, this.token)
        .then(resp => resp.json() )
        .then(resp => {
                if(resp.error){
                    alert(resp.error)
                }
                else{
                    
                    alert("New user created");
                     resp.data()
                     }
        
        })
        .catch(error => console.log(error.status));
        }
        else{
            alert("You don't have permission for creating new user")
        }
    }


   

    componentDidMount(){
        let users = this.serve.getUser(this.token)
                    .then((data) => data.json())
                    .then((value) => {this.setState({Users:value.data})
                    console.log(value.data);})
                    .catch(error => {
                        console.log(`Error occured ${error.status}`);
                    });

                }


    render() { 
        return ( 

        
                <div className="row">
                <Header />   
                
                <div className="col-md-3">
                <Menu />
                </div>
     
                   <div className="col-md-5 userform">
               
                    <p>  
                        <h2> <center>Create new user </center> </h2>
                    Please fill following details to create new user. New user will be able to 
                    login only after the aproval of Admin. 
                    </p>
                    
                    <form>
                           

                         <div className="form-group"> 
                         <label for="userName"> User Name </label>
                         <input type="text" class="form-control" id="userName"
                         onChange={this.onChangeInput.bind(this)}
                         name="userName"
                         />
                         </div>   
                        
                         <div className="form-group"> 
                         <label for="email"> Email </label>
                         <input type="email" class="form-control" id="email"
                         onChange={this.onChangeInput.bind(this)}
                         name="email"/>
                         </div>

                         <div className="form-group"> 
                         <label for="password"> Password </label>
                         <input type="password" class="form-control" id="password"
                         onChange={this.onChangeInput.bind(this)}
                         name="password"/>
                         </div>
                        
                         <div className="form-group"> 
                         <label for="role"> Role </label>
                         <select name="role" id="role" className="form-control"
                         onChange={this.onChangeInput.bind(this)}>
                                <option value="Admin">Admin</option>
                                <option value="Operator">Operator</option>
                                <option value="AccessUser">Access User</option>
                         </select>
                         </div>

                         <input type="button" value="Create User" class="btn btn-success" onClick={this.onClickSave.bind(this)} />
                        </form>
                 </div>
                </div>
         
         );
    }
}
 


class TableRow extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <tr>
                {
                    Object.keys(this.props.Users[0]).map((u,i)=>(
                        
                        <td>{this.props.row[u]}</td>
                    ))
                }
            </tr>
        )
    }
}

export default CreatUser;
