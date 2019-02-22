import React, { Component } from 'react';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    
        sessionStorage.clear();
        var h = this.props.history;
        h.push('/');

    }
    render() { 
        return ( 
            <div>
               
            </div>
         );
    }
}
 
export default Logout;