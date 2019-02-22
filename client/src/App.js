import React, { Component } from 'react';
import './App.css';
import {Route, Router, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";

import Login from "./auth/login";
import CreatUser from './user/user';
import PersonalInfo from './personalinfo/personalinfo';
import Header from "./header.js";
import DisplayPersonalInfo from "./personalinfo/personalinfo_display";
import DisplayUser from "./user/user_display.js";
import Dashboard from './dashboard';
import  DisplayPersonalInfoTemp from "./personalinfo/personalinfo_display_temp.js";
import Logout from './logout';
import UserDashboard from "./user/userdashboard";

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div>
        <Router history={history} >
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/dashboard' component={Dashboard} /> 
            <Route path='/createuser' component={CreatUser} />
            <Route path='/personalinfo/:username' component={PersonalInfo} />
            <Route path='/Header' component={Header} />
            <Route path='/displayPersonalInfo' component={DisplayPersonalInfo} />
            <Route path='/displayPersonalInfoTemp' component={DisplayPersonalInfoTemp} />
            <Route path='/displayuser' component={DisplayUser} />
            <Route path='/logout' component={Logout} />
            <Route path='/userdashboard/:username' component={UserDashboard} />

            </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
