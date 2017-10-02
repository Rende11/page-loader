// @flow

import axios from 'axios';
import { URL } from 'url';
import mz from 'mz/fs';

export const generateFileName = (url: string) => {
  const { hostname, pathname } = new URL(url);
  const replaced = `${hostname}${pathname}`.replace(/\W/gi, '-').replace(/-$/gi, '');
  const withExtension = `${replaced}.html`;
  return withExtension;
};

const makeDir = (path, data) =>
  mz.exists(path)
    .then((isExists) => {
      if (!isExists) {
        mz.mkdir(path)
          .catch(err => console.log(err));
      }
      return data;
    });

export const loader = (url: string, path: string = './') => {
  const filePath = `${path}${generateFileName(url)}`;
  axios.get(url)
    .then(response => response.data)
    .then(data => makeDir(path, data))
    .then(data => mz.writeFile(filePath, data, 'utf8'))
    .catch(error => console.log(error));
};

