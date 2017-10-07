// @flow

import axios from 'axios';
import { URL } from 'url';
import mz from 'mz/fs';
import path from 'path';
import { getLinks, replaceTagsPath } from './resourseLoader';
import { generateHtmlName, generateDirName, generateResName } from './nameGenerator';

export const loadHtml = (url: string, route: string = './') => {
  const filePath = path.resolve(`${route}/${generateHtmlName(url)}`);
  return axios.get(url)
    .then(response => response.data)
    .then(data => mz.writeFile(filePath, data, 'utf8'));
};


const loadRes = (url: string, route: string = './') => {
  const name = generateResName(url);
  const full = path.join(route, name);
  const options = {
    method: 'get',
    url,
    responseType: 'stream',
  };
  return axios(options).then(content => content.data.pipe(mz.createWriteStream(full)));
};
export const loader = (url: string, route: string = './') => {
  const dirName = path.join(route, generateDirName(url));
  const filePath = path.resolve(`${route}/${generateHtmlName(url)}`);
  return loadHtml(url, route)
    .then(() => mz.mkdir(dirName))
    .then(() => mz.readFile(filePath))
    .then((content) => {
      const { host } = new URL(url);
      const links = getLinks(content, host);
      return Promise.all(links.map(link => loadRes(link, dirName)));
    })
    .then(() => mz.readFile(filePath))
    .then(content => replaceTagsPath(content, generateDirName(url)))
    .then(content => mz.writeFile(filePath, content, 'utf8'));
};

