
const axios = require("axios");
require('dotenv').config();
//custom res.data
const instance = axios.create();

instance.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

instance.interceptors.response.use((response) => {
    const data = response;
    return data;  
});

export default instance;

