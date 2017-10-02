// @flow

import axios from 'axios';

export default function (url: string) {
  axios.get('https://www.google.ru/')
    .then(response => console.log(response.status))
    .catch(error => console.log(error));
}
