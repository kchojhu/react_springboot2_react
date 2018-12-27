import axios from 'axios';
import {GET_ERRORS, SET_CURRENT_USER} from "./Types";
import setJwtToken from "../securityUtils/setJwtToken";
import jwt_decode from "jwt-decode";

export const createUser = (newUser, history) => async dispatch => {
    try {
        await axios.post(`/api/users/register`, newUser);
        history.push('/login');
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const login = (loginRequest) => async dispatch => {
    try {
        const response = await axios.post(`/api/users/login`, loginRequest);

        const token = response.data.token;

        localStorage.setItem('jwtToken', token);
        setJwtToken(token);

        const decode = jwt_decode(token);

        dispatch({
           type: SET_CURRENT_USER,
           payload: decode
        });

        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const logout = () => async dispatch => {
    localStorage.removeItem('jwtToken');
    setJwtToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });
};
