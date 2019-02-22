import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Header from "../header.js";
import Menu from "./../menu.js";
import UserService from "./../service/userservice.js";
//import TableRow from "./../tablerowComponent.js";

class DisplayUser extends Component {
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

    onClickMoreInfo(userName){
        console.log(userName);
        var h = this.props.history;
        h.push('personalinfo/'+userName);
        
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
     
                 <div className="col-md-9">
                   
                 <div>
                      <Link className="nav-link pull-right" to="/createuser" > 
                      <input type="button" value="+ Add New User" className="btn btn-primary pull-right"/> 
                      </Link>
                     </div> <br></br>
                 <p>  
                    <h3> <center> List of Users </center> </h3>
                 </p>
                 <div className="col-md-11">
                  <table className="table table-borderd table-striped">
                      <thead>
                          <tr>
                              <th>User Name</th>
                              
                              <th>Role</th>
                              <th>Email Id</th>
                              <th> Date </th>
                              <th>Action</th>
                          </tr>
                      </thead>


                      <tbody>
                                    {
                                        this.state.Users.map((u,i)=>(
                                            
                                           <TableRow key={i}  row={u} rec={this.state.Users} userinfo={this.onClickMoreInfo.bind(this)}>
                                           
                                           
                                           </TableRow> 
                                        ))
                                    
                                    }
                                </tbody>
                  </table>
                 </div>
                </div>
                </div>
        
         );
    }
}
 

class TableRow extends Component {
    constructor(props) {
      super(props);
    }
  
    onClickgetUserName(){
       this.props.userinfo(this.props.row.userName);
    }

    render() {
      return (
        <tr>
            
          {Object.keys(this.props.rec[0]).map((r, i) =>
            r !== "_id" ? r !== "__v" ? r !=="password" ? <td>{this.props.row[r]}</td> : null : null :null
          )}
            <td>
            
            <input type="button" className="btn btn-warning" value="Manage Info" onClick={this.onClickgetUserName.bind(this)}/> 
            
            </td>
        </tr>
      );
    }
  }

export default DisplayUser;
