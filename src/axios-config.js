import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://superlist-dba04.firebaseio.com'
});

export default instance;