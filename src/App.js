import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import {BrowserRouter, Route} from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import {Provider} from "react-redux";
import store from "./store";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App">
                        <Header/>

                        <Route exact path="/dashboard" component={Dashboard}/>
                        <Route exact path="/addProject" component={AddProject}/>
                        <Route exact path="/updateProject/:id" component={UpdateProject}/>
                        <Route exact path="/projectBoard/:id" component={ProjectBoard}/>
                        <Route exact path="/addProjectTask/:id" component={AddProjectTask}/>
                        <Route exact path="/updateProjectTask/:id/:projectSequence" component={UpdateProjectTask}/>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
