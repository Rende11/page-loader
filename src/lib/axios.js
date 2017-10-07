// @flow
import httpAdapter from 'axios/lib/adapters/http';
import axios from 'axios';

axios.defaults.adapter = httpAdapter;
export default axios;


