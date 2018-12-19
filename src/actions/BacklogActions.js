import axios from 'axios';
import {DELETE_PROJECT, DELETE_PROJECT_TASK, GET_BACKLOG, GET_ERRORS, GET_PROJECT_TASK} from "./Types";

export const addProjectTask = (backlogId, projectTask, history) => async dispatch => {
    try {
        await axios.post(`/api/backlog/${backlogId}`, projectTask);
        history.push(`/projectBoard/${backlogId}`);
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
}

export const updateProjectTask = (backlogId, projectTaskId, projectTask, history) => async dispatch => {
    try {
        await axios.patch(`/api/backlog/${backlogId}/${projectTaskId}`, projectTask);
        history.push(`/projectBoard/${backlogId}`);
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
}

export const getBacklog = (backlogId) => async dispatch => {
    try {
        const response = await axios.get(`/api/backlog/${backlogId}`);
        dispatch({
            type: GET_BACKLOG,
            payload: response.data
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
}

export const getProjectTask = (backlogId, projectTaskId, history) => async dispatch => {
    try {
        const response = await axios.get(`/api/backlog/${backlogId}/${projectTaskId}`);
        dispatch({
            type: GET_PROJECT_TASK,
            payload: response.data
        });
    } catch (err) {
        history.push('/dashboard');
    }
}

export const deleteProjectTask = (backlogId, projectTaskId) => async dispatch => {
    if (window.confirm('Are you sure?')) {
        await axios.delete(`/api/backlog/${backlogId}/${projectTaskId}`);
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: projectTaskId
        });
    }
}