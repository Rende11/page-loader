// @flow

import axios from 'axios';
import { URL } from 'url';
import mz from 'mz/fs';
import path from 'path';

export const generateName = (extension: string) =>  (url: string) => {
  const { hostname, pathname } = new URL(url);
  const replaced = `${hostname}${pathname}`.replace(/\W/gi, '-').replace(/-$/gi, '');
  const withExtension = `${replaced}.${extension}`;
  return withExtension;
};

export const generateFileName = generateName('html');

export const generateResourseDirName = generateName('_files');


export const loader = (url: string, route: string = './') => {
  const filePath = path.resolve(`${route}/${generateFileName(url)}`);
  return axios.get(url)
    .then(response => response.data)
    .then(data => mz.writeFile(filePath, data, 'utf8'))
};

