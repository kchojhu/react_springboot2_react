import React, {Component} from 'react';
import {Route, Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import connect from "react-redux/es/connect/connect";

const SecureRoutes = ({component: Component, security, ...otherProps}) => (
  <Route {...otherProps} render={props => security.validToken ? <Component {...props} /> : <Redirect to="/login"/>} />
);

const mapStateToProps = state => ({
    security: state.security
});

SecureRoutes.propTypes = {
    security: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(SecureRoutes);