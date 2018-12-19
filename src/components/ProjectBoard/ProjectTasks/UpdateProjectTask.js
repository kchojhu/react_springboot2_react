import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {updateProjectTask, getProjectTask} from "../../../actions/BacklogActions";

class UpdateProjectTask extends Component {

    constructor(props, context) {
        super(props, context);

        const {id, projectSequence} = this.props.match.params;

        this.state = {
            id: "",
            projectSummary: "",
            acceptanceCriteria: "",
            status: "",
            priority: "",
            dueDate: "",
            projectIdentifier:id,
            projectSequence,
            errors: {}
        }

    }

    componentDidMount() {
        this.props.getProjectTask(this.state.projectIdentifier, this.state.projectSequence, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(() => ({ ...nextProps.projectTask }));
        if (nextProps.errors) {
            this.setState(() => ({errors: nextProps.errors}));
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        const updatedTask = {...this.state};

        console.log('Updated Task', updatedTask);
        this.props.updateProjectTask(this.state.projectIdentifier, this.state.projectSequence, updatedTask, this.props.history);
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const {id} = this.props.match.params;

        return (
            <div className="add-PBI">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to={`/projectBoard/${id}`} className="btn btn-light">
                                Back to Project Board
                            </Link>
                            <h4 className="display-4 text-center">Update Project Task</h4>
                            <p className="lead text-center">Project Name + Project Code</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className={classnames("form-control form-control-lg", {
                                        'is-invalid': this.state.errors.projectSummary
                                    })} name="projectSummary"
                                           placeholder="Project Task summary" value={this.state.projectSummary}
                                           onChange={this.onChange}/>
                                    {this.state.errors.projectSummary && (
                                        <div className="invalid-feedback">{this.state.errors.projectSummary}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control form-control-lg" placeholder="Acceptance Criteria"
                                              name="acceptanceCriteria" onChange={this.onChange}
                                              value={this.state.acceptanceCriteria}></textarea>
                                </div>
                                <h6>Due Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="dueDate"
                                           value={this.state.dueDate} onChange={this.onChange}/>
                                </div>
                                <div className="form-group">
                                    <select className="form-control form-control-lg" name="priority"
                                            value={this.state.priority} onChange={this.onChange}>
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <select className="form-control form-control-lg" name="status"
                                            value={this.state.status} onChange={this.onChange}>
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>

                                <input type="submit" className="btn btn-primary btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    projectTask: state.backlogs.projectTask,
    errors: state.errors
});

UpdateProjectTask.propTypes = {
    updateProjectTask: PropTypes.func.isRequired,
    getProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    projectTask: PropTypes.object.isRequired
};
export default connect(mapStateToProps, {updateProjectTask, getProjectTask})(UpdateProjectTask);