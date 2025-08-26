import axios from 'axios';


const baseURLProject = process.env.NEXT_PUBLIC_API_URL + '/api';

export const nextServer = axios.create({
  baseURL: baseURLProject,
  withCredentials: true, // дозволяє axios працювати з cookie
});