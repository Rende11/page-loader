// @flow

import _ from 'lodash';
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

export const getResoursesHrefs = (html: string) => {
  const $ = cheerio.load(html);
  const links = $('link');
  const scripts = $('script');
  const imgs = $('img');

  return _.flatten(tags.map(tag => [...$(tag)]
    .map(link => $(link).attr(mapedLinks[tag])))).filter(x => !!x) ;
};

export const fullPathedLinks = (links: array, hostname: string) =>
  links.map(link => link.startsWith('http') ? link : `https://${path.join(hostname, link)}`);

export const getLinks = (html: string, host: string) => {
  const refs = getResoursesHrefs(html);
  const links = fullPathedLinks(refs, host);
  console.log(links);
  return links;
};

const mapedLinks = {
  'link': 'href',
  'img': 'src',
  'script': 'src'
}
