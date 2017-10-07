// @flow

import axios from 'axios';
import { URL } from 'url';
import mz from 'mz/fs';
import path from 'path';
import debug from 'debug';
import { getLinks, replaceTagsPath } from './resourseLoader';
import { generateHtmlName, generateDirName, generateResName } from './nameGenerator';

const log = debug('page-loader');

export const loadHtml = (url: string, route: string = './') => {
  log('Start loading %s', url);
  const filePath = path.join(route, generateHtmlName(url));
  return axios.get(url)
    .then(response => response.data)
    .then((data) => {
      log('Saving HTML file to %s', filePath);
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
    log('Saving resourse %s', name);
    return content.data.pipe(mz.createWriteStream(full));
  });
};
const loader = (url: string, route: string = './') => {
  const dirName = path.join(route, generateDirName(url));
  log('Resourses directory %s', dirName);
  const filePath = path.join(route, generateHtmlName(url));
  log('File path - %s', filePath);
  return loadHtml(url, route)
    .then(() => mz.mkdir(dirName))
    .then(() => mz.readFile(filePath))
    .then((content) => {
      const { host } = new URL(url);
      const links = getLinks(content, host);
      log('Founded resourses - %s', links.length);
      return Promise.all([...links.map(link => loadRes(link, dirName)), replacer(filePath, content, url)])
    }).then(() => {
      log('Saved on %s', filePath);
      return filePath;
    });

};

const replacer = (filePath, content, url) => {
  log('Replacing original links');
  return mz.writeFile(filePath, replaceTagsPath(content, generateDirName(url)));
}
export default loader;
