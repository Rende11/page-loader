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
  return axios.get(url).then(response => response.data);
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

const loader = async (url: string, route: string = './') => {
  try {
    const dirName = path.join(route, generateDirName(url));
    log('Resourses directory %s', dirName);
    const filePath = path.join(route, generateHtmlName(url));
    log('File path - %s', filePath);
    await mz.mkdir(dirName);
    const html = await loadHtml(url, route);
    const { host } = new URL(url);
    const links = getLinks(html, host);
    log('Founded resourses <- %s', links.length);
    links.map(link => loadRes(link, dirName));
    await replacer(filePath, html, url);
    return filePath;
  } catch (error) {
    if (error.response) {
      const responseError = `ERROR: ${error.message}`;
      return Promise.reject(responseError);
    }
    if (error.code) {
      return Promise.reject(errorsList[error.code]);
    }
    if (error.message) {
      return Promise.reject(error.message);
    }
    return Promise.reject(error);
  }
};

export default loader;
