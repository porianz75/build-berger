import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-saz-default-rtdb.firebaseio.com/'
});

export default instance;