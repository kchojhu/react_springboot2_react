import React, {Component} from 'react';
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import {connect} from 'react-redux';
import {getProjects} from "../actions/ProjectActions";
import PropTypes from 'prop-types';

class Dashboard extends Component {

    componentDidMount() {
        this.props.getProjects();
    }

    render() {

        const projectItems = this.props.projects.projects && this.props.projects.projects.map(project =>
            <ProjectItem project={project} key={project.projectIdentifier}/>
        );

        return (
            <div className="projects">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Projects</h1>
                            <br/>
                                <CreateProjectButton/>
                            <br/>
                            <hr/>

                            <div className="container">
                                {projectItems}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    projects: state.projects
});

Dashboard.propTypes = {
    projects: PropTypes.object.isRequired,
    getProjects: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {getProjects})(Dashboard);