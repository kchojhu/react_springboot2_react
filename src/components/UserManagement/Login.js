import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {login} from "../../actions/SecurityActions";

class Login extends Component {
    state = {
        username: '',
        password: '',
        errors: {}
    }

    componentDidMount() {
        if (this.props.security.validToken) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.security.validToken) {
            this.props.history.push('/dashboard');
        }


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

        const loginRequest = {
            ...this.state
        };

        this.props.login(loginRequest);
    }

    render() {
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <form action="dashboard.html" onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className={classnames("form-control form-control-lg", {
                                        'is-invalid': this.state.errors.username
                                    })}
                                           placeholder="Username" name="username" value={this.state.username}
                                           onChange={this.onChange}/>
                                    {this.state.errors.username && (
                                        <div className="invalid-feedback">{this.state.errors.username}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input type="password" className={classnames("form-control form-control-lg", {
                                        'is-invalid': this.state.errors.password
                                    })}
                                           placeholder="Password" name="password" value={this.state.password}
                                           onChange={this.onChange}/>
                                    {this.state.errors.password && (
                                        <div className="invalid-feedback">{this.state.errors.password}</div>
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

Login.propTypes = {
    login: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
export default connect(mapStateToProps, {login})(Login);
