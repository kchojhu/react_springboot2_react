import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logout} from "../../actions/SecurityActions";

class Header extends Component {

    logout = () => {
        this.props.logout();
        window.location.href="/";
    }

    render() {
        const {validToken, user} = this.props.security;

        const content = validToken ? (<div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                        Dashboard
                    </Link>
                </li>
            </ul>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                     <i className="fa fa-user-circle mr-1"></i> {user.fullname}
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={this.logout}>
                        Logout
                    </Link>
                </li>
            </ul>
        </div>) : (<div className="collapse navbar-collapse" id="mobile-nav">

            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">
                        Sign Up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
            </ul>
        </div>);

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Personal Project Management Tool
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    {content}
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    security: state.security
});

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired
};
export default connect(mapStateToProps, {logout})(Header);
