// @flow

import axios from 'axios';
import { URL } from 'url';
import mz from 'mz/fs';
import path from 'path';
// import { replaceTagsPath } from './resourseLoader';

export const generateFileName = (url: string) => {
  const { hostname, pathname } = new URL(url);
  const replaced = `${hostname}${pathname}`.replace(/\W/gi, '-').replace(/-$/gi, '');
  const withExtension = `${replaced}.html`;
  return withExtension;
};

export const generatePath = (route: string) => {
  const { dir, base } = path.parse(route);
  return `${dir.replace(/\W/gi, '-')}${base}`;
};

export const loader = (url: string, route: string = './') => {
  const filePath = path.resolve(`${route}/${generateFileName(url)}`);
  return axios.get(url)
    .then(response => response.data)
  // .then(data => replaceTagsPath(data))
    .then(data => mz.writeFile(filePath, data, 'utf8'));
};

