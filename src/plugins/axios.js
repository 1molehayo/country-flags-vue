import _axios from 'axios';

const axios = _axios.create({
  baseURL: 'https://rest-contries.azurewebsites.net',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default axios;
