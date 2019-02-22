import React, { Component } from 'react';   
import { Link } from "react-router-dom";
import PersonalInfoService from "./../service/personalinfoservice.js";
import Header from "../header.js";
import Menu from "./../menu.js";

class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            
            firstName:"",
            middleName:"",
            lastName:"",            
            gender:"",
            dob:"",
            age:"",
            flat:"",
            societyName:"",
            areaName:"",
            city:"",
            pinCode:"",
            phoneNo:"",
            mobileNo:"",
            physicalDisablity:"",
            maritalStatus:"",
            educationStatus:"",
            birthSign:"",
            authenticated:false,
            persons:[],
            
        }
        this.onChangeInput = this.onChangeInput.bind(this)
        
        // if(this.props.params !== undefined)
        // { 
         this.userName = this.props.match.params.username;
        // }
        // else{       
        //  this.userName = sessionStorage.getItem("userName")
         //    }
        

        console.log("username ::: ", this.userName);
        
         
        this.token = sessionStorage.getItem("token"); 
        this.role = sessionStorage.getItem("role");
         if(this.role === "Admin"){
             this.state.authenticated = true
         } 


        this.serve = new PersonalInfoService();
    }

    onChangeInput(e){        
        this.setState({[e.target.name]:e.target.value})
    }

     clear(){
        
           this.setState({firstName:""});
           this.setState({middleName:""});
           this.setState({lastName:""});          
           this.setState({gender:""});
           this.setState({dob:""});
           this.setState({age:""}) ;
           this.setState({flat:""}) ;
           this.setState({societyName:""}) ;
            this.setState({areaName:""}) ;
            this.setState({city:""});
            this.setState({pinCode:""});
            this.setState({phoneNo:""});
            this.setState({mobileNo:""});
            this.setState({physicalDisablity:""});
            this.setState({maritalStatus:""});
            this.setState({educationStatus:""});
            this.setState({birthSign:""});
    }
    onClickSave(){
        let personalinfo = {
            userName:this.userName,
            firstName:this.state.firstName,
            middleName:this.state.middleName,
            lastName:this.state.lastName,            
            gender:this.state.gender,
            dob:this.state.dob,
            age:this.state.age,
            flat:this.state.flat,
            societyName:this.state.societyName,
            areaName:this.state.areaName,
            city:this.state.city,
            pinCode:this.state.pinCode,
            phoneNo:this.state.phoneNo,
            mobileNo:this.state.mobileNo,
            physicalDisablity:this.state.physicalDisablity,
            maritalStatus:this.state.maritalStatus,
            educationStatus:this.state.educationStatus,
            birthSign:this.state.birthSign
        }
     
        console.log("Gneder : ", personalinfo.gender);
        
         
        if(this.role ==="Admin")
        {
        this.serve.addPersonalInfo(personalinfo, this.token)
        .then(resp => resp.json())
        .then(resp=>resp.data)
        .catch(error => console.log(error.status));
       
         alert("Personal information saved successfully")
        
        }
        else if(this.role === "Operator"){
            
        this.serve.addPersonalInfoTemp(personalinfo, this.token)
        .then(resp => resp.json())
        .then(resp=>resp.data)
        .catch(error => console.log(error.status));
        
        alert("Personal information & waiting for admin aproval");
        
        }
        this.clear();

    }

    componentDidMount(){
        this.serve.getPersonalInfoByUserName(this.userName, this.token)
        .then((data) => data.json())
        .then((value) => {

            //console.log(JSON.stringify(value.data));   
            
            this.setState({
                 firstName:value.data.firstName,
                 middleName:value.data.middleName,
                 lastName:value.data.lastName,
                 dob:value.data.dob,
                 gender:value.data.gender,
                 age:value.data.age,
                 flat:value.data.flat,
                 societyName:value.data.societyName,
                 areaName:value.data.areaName,
                 city:value.data.city,
                 pinCode:value.data.pinCode,
                 mobileNo:value.data.mobileNo,
                 phoneNo:value.data.phoneNo,
                 physicalDisablity:value.data.physicalDisablity,
                 maritalStatus:value.data.maritalStatus,
                 educationStatus:value.data.educationStatus,
                 birthSign:value.data.birthSign                 

                }); 
            
        //console.log("data in didmount :", this.state.persons);
    })
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
            <div className="col-md-9"><br></br>
                <center><h2> Personal Information </h2></center>
                <div class="col-md-11">
                <hr/>
                </div>
                
                <form>
                
                    <div className="row">
                    <div className="col-md-6">
                    <div className="form-group col-md-12">
                                <label for="firstName"> First Name </label>
                                <input type="text" class="form-control" id="firstName" 
                                  onChange={this.onChangeInput}
                                  name="firstName"
                                  value={this.state.firstName}
                                  tabindex="1"/>
                            </div>

                            <div className="form-group col-md-12">
                                <label for="lastName"> Last Name </label>
                                <input type="text" class="form-control" id="lastName" 
                                  onChange={this.onChangeInput}
                                  name="lastName"
                                  value={this.state.lastName}
                                  tabindex="3"/>
                            </div>

                            <div className="form-group col-md-12">
                                <label for="dob"> Date of Birth </label>
                                <input type="date" id="dob" class="form-control" 
                                  onChange={this.onChangeInput.bind(this)}
                                  name="dob"
                                  value={this.state.dob}
                                  tabindex="5"/>
                            </div>

                            <u> <h5> Address </h5></u>
                            <div className="form-group col-md-12">
                                <label for="flat"> Flat No </label>
                                <input type="text" id="flat" class="form-control"
                                  onChange={this.onChangeInput.bind(this)}
                                  name="flat"
                                  value={this.state.flat}
                                  tabindex="7" />
                            </div>

                            <div className="form-group col-md-12">
                                <label for="areaName"> Area Name</label>
                                <input type="text" id="areaName" class="form-control" 
                                  onChange={this.onChangeInput.bind(this)}
                                  name="areaName"
                                  value={this.state.areaName}
                                  tabindex="9"/>
                            </div>
                            
                            <div className="form-group col-md-12">
                                <label for="mobileNo"> Mobile No</label>
                                <input type="text" id="mobileNo" class="form-control" 
                                  onChange={this.onChangeInput.bind(this)}
                                  name="mobileNo"
                                  value={this.state.mobileNo}
                                  tabindex="11"/>
                            </div>

                            <div className="form-group col-md-12">
                                <label for="physicalDisablity"> Physical Disability</label>
                                <input type="text" id="physicalDisablity" class="form-control" 
                                  onChange={this.onChangeInput.bind(this)}
                                  name="physicalDisablity"
                                  value={this.state.physicalDisablity}
                                  tabindex="15"/>
                            </div>

                            <div className="form-group col-md-12">
                                <label for="educationStatus"> Educational Status</label>
                                <input type="text" id="educationStatus" class="form-control" 
                                  onChange={this.onChangeInput.bind(this)}
                                  name="educationStatus"
                                  value={this.state.educationStatus}
                                  tabindex="17"/>
                            </div>

                    </div>
                    <div className="col-md-5">
                    <div className="form-group col-md-12">
                                <label for="middleName"> Middle Name </label>
                                <input type="text" class="form-control" id="firstName" 
                                  onChange={this.onChangeInput.bind(this)}
                                  name="middleName"
                                  value={this.state.middleName}
                                  tabindex="2"/>
                            </div>

                            <div className="form-group col-md-12">
                                <label for="gender"> Gender </label>
                                <select class="form-control" id="gender"
                                onChange={this.onChangeInput.bind(this)}
                                name="gender" 
                                tabindex="4">
                                 <option value="Male"> Male </option>
                                 <option value="Female">Female</option>
                                </select>
                            </div>

                            <div className="form-group col-md-12">
                                <label for="age"> Age </label>
                                <input type="text" id="age" class="form-control" 
                                  onChange={this.onChangeInput.bind(this)}
                                  name="age" 
                                  value={this.state.age} 
                                  tabindex="6"/>
                            </div>
                                <br/><br/>
                            <div className="form-group col-md-12">
                                <label for="societyName"> Society Name</label>
                                <input type="text" id="societyName" class="form-control"
                                  onChange={this.onChangeInput.bind(this)}
                                  name="societyName" 
                                  value={this.state.societyName}
                                  tabindex="8"/>
                            </div>

                            <div className="form-group col-md-12">
                                <div className="row">
                                <div className="col-md-6"> 
                                <label for="city"> City </label>
                                <input type="text" id="city" class="form-control" 
                                  onChange={this.onChangeInput.bind(this)}
                                  name="city"
                                  value={this.state.city}
                                  tabindex="10"/>
                                </div>
                                <div className="col-md-6"> 
                                <label for="pinCode"> PIN </label>
                                <input type="text" id="pinCode" class="form-control" 
                                  onChange={this.onChangeInput.bind(this)}
                                  name="pinCode" 
                                  value={this.state.pinCode}
                                  tabindex="12"/>
                                </div>
                                </div>
                            </div>

                            
                            <div className="form-group col-md-12">
                                <label for="phoneNo"> Phone No</label>
                                <input type="text" id="phoneNo" class="form-control" 
                                  onChange={this.onChangeInput.bind(this)}
                                  name="phoneNo"
                                  value={this.state.phoneNo}
                                  tabindex="13"/>
                            </div>

                            <div className="form-group col-md-12">
                                <label for="maritalStatus"> Marital Status</label>
                                <select name="maritalStatus" id="maritalStatus" class="form-control" tabindex="14">
                                    <option value="Unmarried"> Unmarried </option>
                                    <option value="Married"> Married </option>
                                </select>
                            </div>

                            <div className="form-group col-md-12">
                                <label for="birthSign"> Birth Sign</label>
                                <input type="text" id="birthSign" class="form-control" 
                                  onChange={this.onChangeInput.bind(this)}
                                  name="birthSign"
                                  value={this.state.birthSign}
                                  tabindex="16"/>
                            </div>
                    </div>
                    </div>
                    
                    <input type="button" value="Add" className="btn btn-success"
                    onClick={this.onClickSave.bind(this)} tabindex="18"/>
                </form>
            </div>
            </div>
            
         );
    }
}
 
export default PersonalInfo;