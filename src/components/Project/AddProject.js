import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProject} from "../../actions/ProjectActions";
import classnames from 'classnames';

class AddProject extends Component {

    state = {
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
        if (nextProps.errors) {
            this.setState(() => ({errors: nextProps.errors}));
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        const newProject = {...this.state};
        console.log('New Project', newProject);
        this.props.createProject(newProject, this.props.history);
    }

    render() {
        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create Project form</h5>
                            <hr/>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className={classnames("form-control form-control-lg", {
                                        'is-invalid': this.state.errors.projectName
                                    })}
                                           placeholder="Project Name" name="projectName" value={this.state.projectName}
                                           onChange={this.onChange}
                                    />
                                    {this.state.errors.projectName && (
                                        <div className="invalid-feedback">{this.state.errors.projectName}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input type="text" className={classnames("form-control form-control-lg", {
                                        'is-invalid': this.state.errors.projectIdentifier
                                    })}
                                           placeholder="Unique Project ID" name="projectIdentifier"
                                           value={this.state.projectIdentifier}
                                           onChange={this.onChange}
                                    />
                                    {this.state.errors.projectIdentifier && (
                                        <div className="invalid-feedback">{this.state.errors.projectIdentifier}</div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <textarea className={classnames("form-control form-control-lg", {
                                        'is-invalid': this.state.errors.description
                                    })}
                                              placeholder="Project Description" name="description"
                                              value={this.state.description}
                                              onChange={this.onChange}
                                    ></textarea>
                                    {this.state.errors.description && (
                                        <div className="invalid-feedback">{this.state.errors.description}</div>
                                    )}
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="startDate"
                                           value={this.state.startDate}
                                           onChange={this.onChange}/>
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="endDate"
                                           value={this.state.endDate}
                                           onChange={this.onChange}
                                    />
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
    errors: state.errors
});

AddProject.propTypes = {
    createProject: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {createProject})(AddProject);