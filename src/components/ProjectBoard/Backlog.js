import React, {Component} from 'react';
import {Link} from "react-router-dom";
import classnames from "classnames";
import ProjectTask from "./ProjectTasks/ProjectTask";

class Backlog extends Component {
    render() {
        const projectTasks = this.props.projectTasks.map(projectTask =>
            <ProjectTask key={projectTask.id} projectTask={projectTask}/>
        );

        const toDoTasks = [];
        const inProgressTasks = [];
        const doneTasks = [];

        projectTasks.forEach((task) => {
            switch (task.props.projectTask.status) {
                case 'TO_DO' :
                    toDoTasks.push(task);
                    break;
                case 'IN_PROGRESS':
                    inProgressTasks.push(task);
                    break;
                case 'DONE':
                    doneTasks.push(task);
                    break;
            }
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-secondary text-white">
                                <h3>TO DO</h3>
                            </div>
                        </div>
                        {toDoTasks}
                   </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-primary text-white">
                                <h3>In Progress</h3>
                            </div>
                        </div>
                        {inProgressTasks}
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-success text-white">
                                <h3>Done</h3>
                            </div>
                        </div>
                        {doneTasks}
                    </div>
                </div>
            </div>
        );
    }
}

export default Backlog;