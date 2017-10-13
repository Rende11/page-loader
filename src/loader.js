// @flow

import axios from 'axios';
import { URL } from 'url';
import mz from 'mz/fs';
import path from 'path';
import debug from 'debug';
import Listr from 'listr';
import { getLinks, replaceTagsPath } from './resourseLoader';
import { generateHtmlName, generateDirName, generateResName } from './nameGenerator';

const log = debug('page-loader');

const errorsList = {
  ENOTFOUND: 'ERROR: Resourse not found',
  ENOENT: "ERROR: Selected directory doesn't exists",
  ENOTDIR: 'ERROR: Selected file not a directory',
  EEXIST: 'ERROR: File already exists',
  EACCES: 'ERROR: Permission denied',
};

export const loadHtml = async (url: string, route: string = './') => {
  log('Start loading %s', url);
  const filePath = path.join(route, generateHtmlName(url));
  const response = await axios.get(url)
  log('Saving HTML file to %s', filePath);
  return mz.writeFile(filePath, response.data, 'utf8');
};

const loadRes = (url: string, route: string = './') => {
  const name = generateResName(url);
  const full = path.join(route, name);
  const options = {
    method: 'get',
    url,
    responseType: 'stream',
  };
  const tasks = new Listr([
    {
      title: `Load resourse ${url}`,
      task: async () => {
        const content = await axios(options);
        log('Saving resourse %s', name);
        return content.data.pipe(mz.createWriteStream(full));
      },
    },
  ]);
  tasks.run().catch(err => (err));
};

const replacer = (filePath, content, url) => {
  log('Replacing original links');
  return mz.writeFile(filePath, replaceTagsPath(content, generateDirName(url)));
};

const loader2 = (url: string, route: string = './') => {
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
      return Promise.all([...links.map(link => loadRes(link, dirName)),
        replacer(filePath, content, url)]);
    })
    .then(() => {
      log('Saved on %s', filePath);
      return filePath;
    })
    .catch((error) => {
      if (error.response) {
        const responseError = `ERROR: ${error.message}`;
        return Promise.reject(responseError);
      }
      if (error.code) {
        return Promise.reject(errorsList[error.code]);
     }
      return Promise.reject(error);
    });
};


const loader = async (url: string, route: string = './') => {
  const dirName = path.join(route, generateDirName(url));
  log('Resourses directory %s', dirName);
  const filePath = path.join(route, generateHtmlName(url));
  log('File path - %s', filePath);
  const html = await loadHtml(url, route);
  mz.mkdir(dirName)
  const { host } = new URL(url);
  const links = getLinks(html, host);
  log('Founded resourses <- %s', links.length);
  return Promise.all([...links.map(link => loadRes(link, dirName)),
        replacer(filePath, content, url)])

    .then(() => {
      log('Saved on %s', filePath);
      return filePath;
    })
    .catch((error) => {
      if (error.response) {
        const responseError = `ERROR: ${error.message}`;
        return Promise.reject(responseError);
      }
      if (error.code) {
        return Promise.reject(errorsList[error.code]);
     }
      return Promise.reject(error);
    });
};


export default loader;
