import axios from 'axios';
import {API_URL} from '@env';

const userApiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
  timeout: 35 * 1000,
});

async function getUserToken({username, password}) {
  try {
    const res = await userApiClient.post('/login', {username, password});
    return res;
  } catch (e) {
    return {error: {message: e.message}};
  }
}

export default {getUserToken};
