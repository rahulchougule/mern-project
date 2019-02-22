import React, { Component } from 'react';
import Header from "./header.js";
import Menu from "./menu.js";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 

            <div className="row">
                <Header />
                <div className="col-md-2">
                <Menu />
                </div>
                
                <div className="col-md-2">
                        <div className="adminusers ">
                           <h3> 2 </h3> <h6><i class="fa fa-user"></i>  Admin users</h6>
                           <hr></hr>
                        </div>
                </div>
                
                <div className="col-md-2">
                        <div className="operatorusers">
                           <h3> 6 </h3>  <h6> <i class="fa fa-check"> </i>Operator users </h6>
                            <hr></hr>
                        </div>
                </div>
                
                <div className="col-md-2">
                        <div className="accessusers ">
                           <h3> 12 </h3>  <h6><i class="fa fa-group"></i> Access users</h6>
                           <hr></hr>
                        </div>
                </div>
                <div className="col-md-2">
                        <div className="pendingusers ">
                           <h3> 12 </h3> <h6><i class="fa fa-dot-circle-o"></i> Pending Approvals</h6>
                           <hr></hr>
                        </div>
                </div>
            </div>
         );
    }
}
 
export default Dashboard;