// @flow

import axios from 'axios';

export default function (url: string) {
  return axios.get(url)
    .then(response => response.status)
    .catch(error => console.log(error));
}
