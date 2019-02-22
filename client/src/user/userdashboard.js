import React, { Component } from 'react';
import { Link } from "react-router-dom";

import PersonalInfoService from "./../service/personalinfoservice";

class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            persons:[]
        }
        this.serve = new PersonalInfoService();
        this.token = sessionStorage.getItem("token");
        this.userName = sessionStorage.getItem("userName");
    }

    onClickUpdae(){
        
        var h = this.props.history;
        h.push('../personalinfo/'+this.userName);
        
    } 

    componentDidMount(){
            
            
        let users = this.serve.getPersonalInfoByUserName(this.userName, this.token)
                    .then((data) => data.json())
                    .then((value) => {this.setState({persons:value.data})
                    console.log("data in comp -----", value.data);})
                    .catch(error => {
                        console.log(`Error occured ${error.status}`);
                    });

                }


    render() { 
        return (

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <br></br>
                   <center> <h4>User Dhashbord</h4></center>
                   <br/>
                   
                   <div className="row">
                   <div className="col-md-6 welcome ">
                       Welcome {this.state.persons.firstName} !
                    </div>
                    <div className="col-md-6 userlogout">   
                       <Link className="nav-link" to="/logout" >logout</Link> 
                   </div>
                   </div>
                   
                   
                   <hr/><br/>

                   <div className="">
                      <table className="table table-striped">
                      

                                           
                      <tr className="label">
                          <td >
                             <b> Your  Name  : </b> <span className="userdetails"> {this.state.persons.firstName} </span>
                          </td>
                          <td>
                              
                          </td>

                          <td >
                          <b>    Your Surname : </b><span className="userdetails"> {this.state.persons.lastName} </span>
                          </td>
                          <td>
                          
                          </td>
                      </tr>


                      
                      <tr >
                          <td>
                          <b>   Date of Birth :</b><span className="userdetails">{this.state.persons.dob } </span>
                          </td>
                          <td>
                          
                          </td>
                          <td>
                          <b>  Age : </b><span className="userdetails">{this.state.persons.age} </span>
                          </td>
                          <td>
                          
                          </td>
                      </tr>


                      
                      <tr className="label">
                          <td>
                          <b>   Flat No :</b><span className="userdetails"> {this.state.persons.flat} </span>
                          </td>
                          <td>
                          
                          </td>
                          <td >
                          <b>   Society :</b><span className="userdetails">{this.state.persons.societyName} </span>
                          </td>
                          <td>
                          
                          </td>
                      </tr>


                      
                      <tr>
                          <td>
                          <b>   Area :</b><span className="userdetails"> {this.state.persons.areaName} </span>
                          </td>
                          <td>
                          
                          </td>
                          <td>
                            <b>  City :</b><span className="userdetails"> {this.state.persons.city} </span>
                          </td>
                          <td>
                          
                          </td>
                      </tr>


                      
                      <tr className="label">
                          <td>
                          <b>  Education : </b><span className="userdetails">{this.state.persons.educationStatus} </span>
                          </td>
                          <td>
                          
                          </td>
                          <td>
                             <b> Marital Status : </b><span className="userdetails">{this.state.persons.maritalstatus} </span>
                          </td>
                          <td>
                          
                          </td>
                      </tr>



                      </table>

                      <div>
                      
                       <input type="button"  value="update" className="btn btn-primary" onClick={this.onClickUpdae.bind(this)} /> 
                      
                      
                      </div>  

                   </div>

                   </div>
                </div>

            </div>
          );
    }
}
 
export default UserDashboard;