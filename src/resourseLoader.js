// @flow

import _ from 'lodash';
import cheerio from 'cheerio';
import path from 'path';
import { convert } from './nameGenerator';

const tags = ['link', 'script', 'img'];

const mapedLinks = {
  link: 'href',
  img: 'src',
  script: 'src',
};

export const replaceTagsPath = (html: string, dir: string) => {
  const $ = cheerio.load(html);
  tags.forEach(tag => {
    const links = $(tag);
    const option = mapedLinks[tag];
    links.attr(option, (i, value) => (value ? path.join(dir, convert(value)) : null));
  });
  return $.html();
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

