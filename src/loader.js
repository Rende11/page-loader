// @flow

import axios from 'axios';
import { URL } from 'url';
import mz from 'mz/fs';
import path from 'path';
import { getLinks } from './resourseLoader';
import { generateName, generateFileName, generateDirName } from './nameGenerator';

export const loader5 = (url: string, route: string = './') => {
  const filePath = path.resolve(`${route}/${generateName(url, '')}`);
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

const loadHtml = (url: string, route: string = './') => {
  const filePath = path.resolve(`${route}/${generateFileName(url)}`)
  return axios.get(url)
    .then(response => response.data)
    .then(data => mz.writeFile(filePath, data, 'utf8'))
};


const loadRes = (url: string, route: string = './') => {


}
export const loader = (url: string, route: string = './') => {
  return loadHtml(url, route)
    .then(() => mz.mkdir(path.join(route, generateDirName(url))))

};


export const loader3 = (url: string, route: string = './') => {
  const { host } = new URL(url);
  return axios.get(url)
    .then(response => response.data)
    .then(data => {
      const links = getLinks(data, host);
      return Promise.all(links.map(link => loader2(link, route)));
    });
};

const loader4 = (url: string, route: string = './') => {

  loadHtml(url)
    .then(mz => mz.mkdir('./kek'))
    .then(
      () => loadRes(url, './kek'));

}
