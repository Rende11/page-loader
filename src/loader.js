// @flow

import axios from 'axios';
import { URL } from 'url';
import mz from 'mz/fs';
import path from 'path';
import { getLinks } from './resourseLoader';
import { generateName, generateFileName, generateDirName, generateResName } from './nameGenerator';

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
  const name = generateResName(url);
  const full = path.join(route, name);
  const options = {
      method:'get',
      url,
      responseType:'stream'
  }
  console.log(url);
  return axios(options).then(content => content.data.pipe(mz.createWriteStream(full)));
}
export const loader = (url: string, route: string = './') => {
  const dirName = path.join(route, generateDirName(url));
  const filePath = path.resolve(`${route}/${generateFileName(url)}`)
  return loadHtml(url, route)
    .then(() => mz.mkdir(dirName))
    .then(() => mz.readFile(filePath))
    .then(content => {
      const { host } = new URL(url);
      const links = getLinks(content, host);
      return Promise.all(links.map(link => loadRes(link, dirName)));
    });
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
