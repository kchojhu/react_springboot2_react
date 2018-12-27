import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Backlog from "./Backlog";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getBacklog} from "../../actions/BacklogActions";

class ProjectBoard extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState(() => ({errors: nextProps.errors}));
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getBacklog(id);
    }

    render() {
        const {id} = this.props.match.params;
        const {projectTasks} = this.props.backlog;
        const {errors} = this.state;

        const boardAlgorithm = (errors, tasks) => {
            if (tasks.length < 1 ) {
                if (errors.projectNotFound) {
                    return <div className="alert alert-danger text-center" role="alert">{errors.projectNotFound}</div>;
                } else if (errors.projectIdentifier) {
                    return <div className="alert alert-danger text-center" role="alert">{errors.projectIdentifier}</div>;
                } else {
                    return <div className="alert alert-danger text-center" role="alert">No tasks</div>;
                }

            } else {
                return <Backlog projectTasks={projectTasks}/>
            }
        }

        return (
            <div className="container">
                <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br/>
                <hr/>

                {boardAlgorithm(errors, projectTasks)}

            </div>
        );
    }
}
const mapStateToProps = state => ({
    backlog: state.backlogs,
    errors: state.errors
});

ProjectBoard.propTypes = {
    getBacklog: PropTypes.func.isRequired,
    backlog: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
export default connect(mapStateToProps, {getBacklog})(ProjectBoard)
