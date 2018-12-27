import axios from 'axios';

const setJwtToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
        console.log('ok1');
    } else {
        console.log('ok2');
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default setJwtToken;
