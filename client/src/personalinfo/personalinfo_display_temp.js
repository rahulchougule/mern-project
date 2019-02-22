import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import PersonalInfoService from "./../service/personalinfoservice";
import Header from "../header.js";
import Menu from "./../menu.js";
//import TableRow from "./../tablerowComponent.js";


class DisplayPersonalInfoTemp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            persons:[],
            authenticated:false
         }

         this.token = sessionStorage.getItem("token");
         this.role = sessionStorage.getItem("role");
         if(this.role === "Admin"){
             this.state.authenticated = true
         }
        this.serve = new PersonalInfoService();
    
        
    }


    onClickApproveUser(persons){
        if(this.role === "Admin")
        {
            this.serve.addPersonalInfo(persons, this.token)
                   .then((data) => data.json())
                   .then((data) => data.data)
                   .catch(error => { 
                    console.log(`Error occured ${error.status}`);
                   });

            // this.serve.deletePersonalInfoTemp(userName, this.token)
            //        .then((data) => data.json())
            //        .then((data) => data.data)
            //        .catch(error => { 
            //            console.log(`Error occured ${error.status}`);
            //           });
                
            alert("Personal information approved")   
            this.forceUpdate()
        }
        else{
            alert("You dont permission")
        }
    }    
        
        onClickDeleteUser(userName){
            if(this.role === "Admin"){
                     this.serve.deletePersonalInfoTemp(userName, this.token)
                    .then((data) => data.json())
                    .then((data) => data.data)
                    .catch(error => { 
                        console.log(`Error occured ${error.status}`);
                       });
            this.setState(this.state);           
        alert("Information deleted from temporary")       
         }
         else{
             alert("You dont have permission")
         }
    }

       

    componentDidMount(){
         this.serve.getPersonalInfoTemp(this.token)
                    .then((data) => data.json())
                    .then((value) => {this.setState({persons:value.data})
                    console.log(value.data);})
                    .catch(error => {
                        console.log(`Error occured ${error.status}`);
                    });
                
                    if(this.role === "Operator"){
                        var btn = document.getElementById("btnapprove")
                        
                        
                        
                    }
                    //React.findDOMNode(this.refs.btnapprove).disabled = true;
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
                         
                      <Link className="nav-link pull-right" to="/displayPersonalInfoTemp" > 
                      <input type="button" value="Pending Aprrovals" className="btn btn-danger pull-right"/> 
                      </Link>

                      <Link className="nav-link pull-right" to="/displayuser" > 
                      <input type="button" value="+ Add New Person" className="btn btn-primary pull-right"/> 
                      </Link>
                     </div><br></br>
                        <p><h3><center> Personal Information : Inactive </center></h3></p>
                 
                 <div className="col-md-11">
                  <table className="table table-borderd table-striped">
                      <thead>
                          <tr>
                              <th>UserName</th>
                              <th>First Name</th>
                              <th>Middle Name</th>
                              <th>Last Name</th>
                              <th>DOB</th>
                              <th>City</th>
                              <th>Mobile</th>
                              <th>Action</th>



                          </tr>
                      </thead>

                        <tbody>
                            {
                                this.state.persons.map((u, i) => (

                                    <TableRow key={i} row={u} rec={this.state.persons} approveuser={this.onClickApproveUser.bind(this)} deleteuser={this.onClickDeleteUser.bind(this)}>
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

    onClickApprove(){
        this.props.approveuser(this.props.row);
        this.props.deleteuser(this.props.row.userName);
    }
    onClickReject(){

        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to delete this user information?.',
            buttons: [
              {
                label: 'Yes',
                onClick: () =>   this.props.deleteuser(this.props.row.userName)
              },
              {
                label: 'No',
              }
            ]
          });
       
    }
  
    render() {
      return (
        <tr>
          {Object.keys(this.props.rec[0]).map((r, i) =>
            r !== "_id" ? r !== "__v" ? r !=="age" ? r !=="flat" ? r !=="societyName" ? r !=="areaName"  ? r !=="pinCode" ? r!=="phoneNo" ? r!=="physicalDisablity" ? r!=="maritalStatus" ? r!=="educationStatus" ? r!=="birthSign" ? r!=="gender" ? <td>{this.props.row[r]}</td> : null : null :null:null:null:null:null:null:null:null:null:null:null
            )}
          <td> 
          
          <input  type="button" ref="btnapprove" value="Approve" className="btn btn-success" onClick={this.onClickApprove.bind(this)}   /> 
          <input  type="button" ref="btnreject" value="Reject" className="btn btn-danger" onClick={this.onClickReject.bind(this)} /> 
          
          </td>
        </tr>
      );
    }
  }


export default DisplayPersonalInfoTemp;


