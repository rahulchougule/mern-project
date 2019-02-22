import React, { Component } from 'react';
import Menu from "./menu.js";
var logo = require('./images/logo.png')
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated:false
          }

        
        this.token = sessionStorage.getItem("token"); 
        this.role = sessionStorage.getItem("role");
         if(this.role === "Admin"){
             this.state.authenticated = true
         }
    }
    render() { 
        return ( 

            
                <div className="col-md-12">
                    <div className="row header">
                        <div className="col-md-3">
                            <img src={logo} alt="logo" className="img-fluid" width="100px" height="80px"/>
                    </div>
                        <div className="col-md-9">
                            <center> <h2> User Management System</h2> </center>
                        </div>
                    </div>

                </div>

            
         );
    }
}
 
export default Header;
