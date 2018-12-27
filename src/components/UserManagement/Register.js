import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {createUser} from "../../actions/SecurityActions";

class Register extends Component {

    state = {
        username: "",
        fullName: "",
        password: "",
        confirmPassword: "",
        errors: {}
    };

    componentDidMount() {
        if (this.props.security.validToken) {
            this.props.history.push('/dashboard');
        }
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

        const newUser = {
            ...this.state
        };

        this.props.createUser(newUser, this.props.history);
    }

    render() {
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Account</p>
                            <form action="create-profile.html" onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className={classnames("form-control form-control-lg", {
                                        'is-invalid': this.state.errors.fullName
                                    })} placeholder="Full Name"
                                           name="fullName" value={this.state.fullName} onChange={this.onChange}
                                           required/>
                                    {this.state.errors.fullName && (
                                        <div className="invalid-feedback">{this.state.errors.fullName}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input type="text" className={classnames("form-control form-control-lg", {
                                        'is-invalid': this.state.errors.username
                                    })} onChange={this.onChange}
                                           placeholder="Email Address" name="username" value={this.state.username}/>
                                    {this.state.errors.username && (
                                        <div className="invalid-feedback">{this.state.errors.username}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input type="password" className={classnames("form-control form-control-lg", {
                                        'is-invalid': this.state.errors.password
                                    })} onChange={this.onChange}
                                           placeholder="Password" name="password" value={this.state.password}/>
                                    {this.state.errors.password && (
                                        <div className="invalid-feedback">{this.state.errors.password}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input type="password" className={classnames("form-control form-control-lg", {
                                        'is-invalid': this.state.errors.confirmPassword
                                    })} onChange={this.onChange}
                                           placeholder="Confirm Password" value={this.state.confirmPassword}
                                           name="confirmPassword"/>
                                    {this.state.errors.confirmPassword && (
                                        <div className="invalid-feedback">{this.state.errors.confirmPassword}</div>
                                    )}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
});

Register.propTypes = {
    createUser: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
export default connect(mapStateToProps, {createUser})(Register);