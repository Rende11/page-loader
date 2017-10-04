// @flow

import axios from 'axios';
import { URL } from 'url';
import mz from 'mz/fs';
import path from 'path';

export const generateFileName = (url: string) => {
  const { hostname, pathname } = new URL(url);
  const replaced = `${hostname}${pathname}`.replace(/\W/gi, '-').replace(/-$/gi, '');
  const withExtension = `${replaced}.html`;
  return withExtension;
};

/* const makeDir = (path: string, data: string) =>
  mz.exists(path)
    .then((isExists) => {
      if (!isExists) {
        mz.mkdir(path)
          .catch(err => console.log(err));
      }
      return data;
    });
    */
export const loader = (url: string, route: string = './') => {
  const filePath = path.resolve(`${route}/${generateFileName(url)}`);
  return axios.get(url)
    .then(response => response.data)
    .then(data => mz.writeFile(filePath, data, 'utf8'))
    .catch(error => console.log(error));
};

