import React, { Component } from 'react';
import LoginService from "./../service/loginservice.js";


class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            //id:0,
    
            userName:"",
            password:"",
            //dateTime:""
         }
    
    
        this.serve =  new LoginService();
    }

    onChangeInput(e){
        this.setState({[e.target.name]:e.target.value})
    }


  

    onClickSave(e){  
         
        let userCrd = {
            //id:this.state.id,
            userName:this.state.userName,
            password:this.state.password,
            //dateTime:new Date()
        }

        this.serve.userAuthentication(userCrd)
        .then(resp=>resp.json())
        .then(resp=>{
            if(resp.status===200){
                console.log("-------------", resp.userName);
                
                sessionStorage.setItem("token",resp.token);
                sessionStorage.setItem("role", resp.role);
                sessionStorage.setItem("userName", resp.userName);
                
                this.role = sessionStorage.getItem("role");
                console.log(this.role);
                
                if(this.role === "Admin" || this.role ==="Operator"){
                this.props.history.push('/dashboard') }
                else if(this.role === "AccessUser"){
                    //this.props.history.push('/userdashboard/'+ resp.userName) 
                    this.props.history.push('/userdashboard/'+resp.userName) 
                }
            }
            else{
                alert(JSON.stringify(resp.message))
            }
        })
        .catch(error=>console.log(error.status));
    }
    
    render() { 
        return ( 
            <div id="login">
            <div className="container">
                
                <div className="col-md-6 form">
                        <div className="form-group">
                            <center><h3>Login</h3> </center>
                            <label htmlFor="userName"> User Name</label>
                            <input type="text" className="form-control" id="userName"
                            onChange={this.onChangeInput.bind(this)}
                            name="userName"
                            
                            required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" className="form-control" id="password"
                            onChange={this.onChangeInput.bind(this)}
                            name="password"
                            
                            required/>
                        </div>
                        <div >
                        <button type="submit" className="btn btn-primary" onClick={this.onClickSave.bind(this)}>Get In</button>
                        </div>
                </div>
            </div>
            </div>
         );
    }
}
 
export default Login;