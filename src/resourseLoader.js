// @flow

import _ from 'lodash';
import cheerio from 'cheerio';
import path from 'path';
import { convert } from './nameGenerator';

export const replaceTagsPath = (html: string, dir: string) => {
  const $ = cheerio.load(html);
  const links = $('link');
  links.attr('href', (i, value) => (value ? path.join(dir, convert(value)) : null));
  const scripts = $('script');
  scripts.attr('src', (i, value) => (value ? path.join(dir, convert(value)) : null));
  const imgs = $('img');
  imgs.attr('src', (i, value) => (value ? path.join(dir, convert(value)) : null));
  return $.html();
};


const tags = ['link', 'script', 'img'];

const mapedLinks = {
  link: 'href',
  img: 'src',
  script: 'src',
};

export const getResoursesHrefs = (html: string) => {
  const $ = cheerio.load(html);
  return _.flatten(tags.map(tag => [...$(tag)]
    .map(link => $(link).attr(mapedLinks[tag])))).filter(x => !!x);
};

export const fullPathedLinks = (links: Array<string>, hostname: string) =>
  links.map(link => (link.startsWith('http') ? link : `https://${path.join(hostname, link)}`));

export const getLinks = (html: string, host: string) => {
  const refs = getResoursesHrefs(html);
  const links = fullPathedLinks(refs, host);
  return links;
};

