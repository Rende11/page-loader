// @flow

import axios from 'axios';
import { URL } from 'url';
import mz from 'mz/fs';
import path from 'path';
// import { replaceTagsPath } from './resourseLoader';
import { generateFileName } from './nameGenerator';

export const loader = (url: string, route: string = './') => {
  const filePath = path.resolve(`${route}/${generateFileName(url)}`);
  return axios.get(url)
    .then(response => response.data)
    .then(data => mz.writeFile(filePath, data, 'utf8'));
};

/*
export const fileLoader = (url: string, route: string = './') => {
  const filePath = path.resolve(`${route}/${generateFileName(url)}`);
  return axios.get(url)
    .then(response => response.data)
    .then(data => mz.writeFile(filePath, data, 'utf8'));
};
*/
