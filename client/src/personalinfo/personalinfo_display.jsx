import React, { Component } from 'react';
import { Link } from "react-router-dom";

import PersonalInfoService from "./../service/personalinfoservice";
import Header from "../header.js";
import Menu from "./../menu.js";

//import TableRow from "./../tablerowComponent.js";


class DisplayPersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            persons:[],
            authenticated:false,
            searchText: ""
        
        }

         this.token = sessionStorage.getItem("token");
         this.role = sessionStorage.getItem("role");
         if(this.role === "Admin"){
             this.state.authenticated = true
         }

        this.serve = new PersonalInfoService();

    

    }


    componentDidMount(){
         this.serve.getPersonalInfo(this.token)
                    .then((data) => data.json())
                    .then((value) => {this.setState({persons:value.data})
                    console.log("person list ---- : ", this.persons);})
                    .catch(error => {
                        console.log(`Error occured ${error.status}`);
                    });

                }
    //      onChangeInput(e){        
    //     this.setState({[e.target.name]:e.target.value})
    // }
     


    onClickSearch(username){       
       
        this.serve.getPersonalInfoByUserName(username, this.token)
        
        .then((data) => data.json())
        .then((value) => {
            this.setState({persons:[]})
            var temp = this.state.persons;
            temp.push(value.data);
            
            this.setState({persons:temp})
         console.log("person list ---- : ", this.persons);})
         .catch(error => {
            console.log(`Error occured ${error.status}`);
        });



        // this.serve.getPersonalInfoByUserName(userName, this.token)
                   
        //            .then((data) => data.json())
                     
        //            .then((value) => {this.setState({persons:value.data})
                     
        //             console.log("personal info search ------ : ", value.data);})
        //             .catch(error => {
        //                 console.log(`Error occured ${error.status}`);
        //             });
    }

    searchTextChange = (e) => {
        this.setState({[e.target.name]:e.target.value, searchText:e.target.value})
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
                     
                      
                     </div><br></br>
                        <p><h3><center> Personal Information : Active </center></h3></p>
                    <div className="col-md-11">
                    <div className="row">
                    <div className="col-md-6">
                    <div className="row">
                    <input type="text" name="searchText" className="form-control col-md-6" value={this.state.searchText} onChange = {this.searchTextChange}/> 
                    <input type="button" value="Search" className="btn btn-warning" onClick={() => this.onClickSearch(this.state.searchText)} />     
                     </div>   
                    </div>
                    <div className="col-md-6">
                    <Link className="nav-link pull-right" to="/displayPersonalInfoTemp" > 
                      <input type="button" value="Pending Aprrovals" className="btn btn-danger pull-right"/> 
                      </Link>

                      <Link className="nav-link pull-right" to="/displayuser" > 
                      <input type="button" value="+ Add New Person" className="btn btn-primary pull-right"/> 
                      </Link>    
                    </div> 
                    </div>
                    
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



                          </tr>
                      </thead>

                        <tbody>
                            {
                                this.state.persons.map((u, i) => (

                                    <TableRow key={i} row={u} rec={this.state.persons}>
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
  
    render() {
      return (
        <tr>
          {Object.keys(this.props.rec[0]).map((r, i) =>
            r !== "_id" ? r !== "__v" ? r !=="age" ? r !=="societyName" ? r !=="areaName"  ? r !=="pinCode" ? r!=="phoneNo" ? r!=="physicalDisablity" ? r!=="maritalStatus" ? r!=="educationStatus" ? r!=="birthSign" ? r!=="gender" ? <td>{this.props.row[r]}</td> : null : null :null:null:null:null:null:null:null:null:null:null
          )}
          
        </tr>
      );
    }
  }


export default DisplayPersonalInfo;


