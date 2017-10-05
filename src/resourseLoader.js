// @flow

import cheerio from 'cheerio';
// import fs from 'mz/fs';
import path from 'path';
import { generatePath } from './nameGenerator';

export const replaceTagsPath = (html: string) => {
  const $ = cheerio.load(html);
  const links = $('link');
  links.attr('href', (i, value) => path.normalize(`/local/${generatePath(value)}`));
  const scripts = $('script');
  scripts.attr('src', (i, value) => path.normalize(`/local/${generatePath(value)}`));
  const imgs = $('img');
  imgs.attr('src', (i, value) => path.normalize(`/local/${generatePath(value)}`));
  return $.html();
};


const tags = ['link', 'script', 'img'];

export const getResoursesHrefs = (html: string, host: string) => {
  const $ = cheerio.load(html);
  const links = $('link');
};
