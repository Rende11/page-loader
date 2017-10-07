// @flow

import axios from 'axios';
import { URL } from 'url';
import mz from 'mz/fs';
import path from 'path';
import debug from 'debug';
import { getLinks, replaceTagsPath } from './resourseLoader';
import { generateHtmlName, generateDirName, generateResName } from './nameGenerator';

const logger = debug('page-loader');

export const loadHtml = (url: string, route: string = './') => {
  logger('Start loading %s', url);
  const filePath = path.resolve(`${route}/${generateHtmlName(url)}`);
  return axios.get(url)
    .then(response => response.data)
    .then((data) => {
      logger('Saving HTML file to %s', filePath);
      return mz.writeFile(filePath, data, 'utf8');
    });
};


const loadRes = (url: string, route: string = './') => {
  const name = generateResName(url);
  const full = path.join(route, name);
  const options = {
    method: 'get',
    url,
    responseType: 'stream',
  };
  return axios(options).then((content) => {
    logger('Saving resourse %s', name);
    return content.data.pipe(mz.createWriteStream(full));
  });
};
export const loader = (url: string, route: string = './') => {
  const dirName = path.join(route, generateDirName(url));
  logger('Resourses directory %s', dirName);
  const filePath = path.join(route, generateHtmlName(url));
  return loadHtml(url, route)
    .then(() => mz.mkdir(dirName))
    .then(() => mz.readFile(filePath))
    .then((content) => {
      const { host } = new URL(url);
      const links = getLinks(content, host);
      logger('Fouded resourses - %s', links.length);
      return Promise.all(links.map(link => loadRes(link, dirName)));
    })
    .then(() => mz.readFile(filePath))
    .then((content) => {
      logger('Replacing originals resourses path');
      return replaceTagsPath(content, generateDirName(url));
    })
    .then(content => mz.writeFile(filePath, content, 'utf8'));
};

