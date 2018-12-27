import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import {Provider} from "react-redux";
import store from "./store";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import jwt_decode from "jwt-decode";
import setJwtToken from "./securityUtils/setJwtToken";
import {SET_CURRENT_USER} from "./actions/Types";
import {createUser, logout} from "./actions/SecurityActions";
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';
import SecureRoutes from "./securityUtils/SecureRoutes";


const jwtToken = localStorage.getItem('jwtToken');

if (jwtToken) {
    setJwtToken(jwtToken);
    const decode = jwt_decode(jwtToken);

    store.dispatch({
        type: SET_CURRENT_USER,
        payload: decode
    });

    const currentTime = Date.now() / 1000;
    if (decode.exp < currentTime) {
        store.dispatch(logout());
        window.location.href = "/";
    }
}

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App">
                        <Header/>
                        <Switch>
                            <Route exact path="/" component={Landing}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/login" component={Login}/>

                            <SecureRoutes exact path="/dashboard" component={Dashboard}/>
                            <SecureRoutes exact path="/addProject" component={AddProject}/>
                            <SecureRoutes exact path="/updateProject/:id" component={UpdateProject}/>
                            <SecureRoutes exact path="/projectBoard/:id" component={ProjectBoard}/>
                            <SecureRoutes exact path="/addProjectTask/:id" component={AddProjectTask}/>
                            <SecureRoutes exact path="/updateProjectTask/:id/:projectSequence" component={UpdateProjectTask}/>
                            <Route component={Login}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
