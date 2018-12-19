import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteProjectTask} from "../../../actions/BacklogActions";

class ProjectTask extends Component {
    onDelete = () => {
        const {projectIdentifier, projectSequence} = this.props.projectTask;
        this.props.deleteProjectTask(projectIdentifier, projectSequence);
    }
    render() {
        const projectTask = this.props.projectTask;
        const classes = ['card-header', 'text-primary'];
        let priorityString = '';

        if (projectTask.priority === 1) {
            classes.push('bg-danger');
            classes.push('text-light');
            priorityString = 'HIGH';
        }

        if (projectTask.priority === 2) {
            classes.push('bg-warning');
            classes.push('text-light');
            priorityString = 'MEDIUM';
        }

        if (projectTask.priority === 3) {
            classes.push('bg-info');
            classes.push('text-light');
            priorityString = 'LOW';
        }
        
        return (
            <div className="card mb-1 bg-light">

                <div className={classes.join(' ')}>
                    ID: {projectTask.projectSequence} -- Priority: {priorityString}
                </div>
                <div className="card-body bg-light">
                    <h5 className="card-title">{projectTask.projectSummary}</h5>
                    <p className="card-text text-truncate ">
                        {projectTask.acceptanceCriteria}
                    </p>
                    <Link to={`/updateProjectTask/${projectTask.projectIdentifier}/${projectTask.projectSequence}`} className="btn btn-primary">
                        View / Update
                    </Link>

                    <button className="btn btn-danger ml-4" onClick={this.onDelete}>
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}

ProjectTask.propTypes = {
    deleteProjectTask: PropTypes.func.isRequired
};
export default connect(null, {deleteProjectTask})(ProjectTask);