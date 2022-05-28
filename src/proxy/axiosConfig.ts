import axios from 'axios';

const registerAxios = () => {
  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
};

export default registerAxios;
