import React, {Component} from 'react';
import {createProject, getProject} from "../../actions/ProjectActions";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';

class UpdateProject extends Component {

    state = {
        id: "",
        projectName: "",
        projectIdentifier: "",
        description: "",
        startDate: "",
        endDate: "",
        errors: {}
    };

    constructor(props, context) {
        super(props, context);
    }

    componentWillReceiveProps(nextProps) {
        const { id, projectName, projectIdentifier, description, startDate, endDate} = nextProps.project;

        this.setState(() => ({ id, projectName, projectIdentifier, description, startDate, endDate}));

        if (nextProps.errors) {
            this.setState(() => ({errors: nextProps.errors}));
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount() {
        this.props.getProject(this.props.match.params.id, this.props.history);
    }

    onSubmit = (event) => {
        event.preventDefault();
        const updateProject = {...this.state};
        console.log('Update Project', updateProject);
        this.props.createProject(updateProject, this.props.history);
    }

    render() {
        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Update Project form</h5>
                            <hr/>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className={classnames("form-control form-control-lg", {
                                        'is-invalid': this.state.errors.projectName
                                    })}
                                           placeholder="Project Name" name="projectName"
                                           value={this.state.projectName} onChange={this.onChange}/>
                                    {this.state.errors.projectName && (
                                        <div className="invalid-feedback">{this.state.errors.projectName}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg"
                                           placeholder="Unique Project ID"
                                           disabled name="projectIdentifier"
                                           value={this.state.projectIdentifier}/>
                                </div>

                                <div className="form-group">
                                    <textarea className={classnames("form-control form-control-lg", {
                                        'is-invalid': this.state.errors.description
                                    })}
                                              placeholder="Project Description" name="description"
                                              value={this.state.description} onChange={this.onChange}
                                    ></textarea>
                                    {this.state.errors.projectIdentifier && (
                                        <div className="invalid-feedback">{this.state.errors.description}</div>
                                    )}
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="startDate"
                                           value={this.state.startDate} onChange={this.onChange}/>
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="endDate"
                                           value={this.state.endDate} onChange={this.onChange}/>
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
    project: state.projects.project,
    errors: state.errors
});

UpdateProject.propTypes = {
    createProject: PropTypes.func.isRequired,
    getProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
export default connect(mapStateToProps, {getProject, createProject})(UpdateProject);