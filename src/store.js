import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initState = {};

const middleware = [thunk];

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

let store;

if (window.navigator.userAgent.includes("Chrome") && reduxDevTools) {
    store = createStore(rootReducer, initState, compose(applyMiddleware(...middleware),
        reduxDevTools)
    );
} else {
    store = createStore(rootReducer, initState, compose(applyMiddleware(...middleware)));
}

export default store;
