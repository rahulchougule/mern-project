import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {createBrowserHistory} from "history";

import PersonalInfo from './personalinfo/personalinfo';

const history = createBrowserHistory();

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated:false,
            opauthenticated:false,
            userauthenticated:false
          }

        
        this.token = sessionStorage.getItem("token"); 
        this.role = sessionStorage.getItem("role");
        this.userName = sessionStorage.getItem("username");

         if(this.role === "Admin"){
             this.state.authenticated = true
         }
         else if(this.role === "Operator")
         {
            this.state.opauthenticated = true
         }
         
         else if(this.role === "Access User")
         {
             this.state.userauthenticated = true
         }
    }
    render() { 
        return ( 

            
                        <div className="container">
                        <div className="row">
                        <div className="col-md-10 menubar">


                            
                        
                            <Link className="nav-link" to="/dashboard" >Dashboard</Link> 
                            
                                {this.state.userauthenticated &&
                                // <Link className="nav-link" to={{ pathname:"/userdashboard/", username:{ username: sessionStorage.getItem("userName")}}} >Profile</Link>                                                        
                                <Link className="nav-link" to="/userdashboard/:username" > Profile</Link>
                                }
                            
                            { this.state.authenticated  &&
                            <Link className="nav-link" to="/displayuser" > User Mangement</Link>
                            }
                            { this.state.authenticated &&
                            <Link className="nav-link" to="/displayPersonalInfo" >Personal Info</Link>
                            }

                            
                            { this.state.opauthenticated  &&
                            <Link className="nav-link" to="/displayuser" > User Mangement</Link>
                            }
                            { this.state.opauthenticated &&
                            <Link className="nav-link" to="/displayPersonalInfo" >Personal Info</Link>
                            }

                            <Link className="nav-link" to="/logout" >logout</Link>                            
                            

                        </div>
                          </div>      
                    </div>
            

            
         );
    }
}
 
export default Menu;
