// @flow
import pathNode from 'path';
import { URL } from 'url';

export const generatePath = (route: string) => {
  const { dir, base } = pathNode.parse(route);
  return `${dir.replace(/\W/gi, '-').replace(/-$/gi, '').replace(/^-/gi, '')}${base}`;
};

const replaceSlashes = (str: string) => str.replace(/\W/gi, '-').replace(/-$/gi, '').replace(/^-/gi, '');

export const generateName = (base: string, extension: string) => {
  const replaced = replaceSlashes(base);
  const withExtension = `${replaced}${extension}`;
  return withExtension;
};


export const generateHtmlName = (url: string) => {
  const { hostname, pathname } = new URL(url);
  return generateName(`${hostname}${pathname}`, '.html');
};


export const generateDirName = (url: string) => {
  const { hostname, pathname } = new URL(url);
  return generateName(`${hostname}${pathname}`, '_files');
};


export const generateResName = (url: string) => {
  const { pathname } = new URL(url);
  const { dir, ext, name } = pathNode.parse(pathname);
  const fullName = `${dir}/${name}`;
  return generateName(fullName, ext);
};


export const convertLink = (link: string) => {
  const { dir, base } = pathNode.parse(link);
  const replaced = replaceSlashes(dir);

  return `${replaced}-${base}`.replace(/^-/, '');
};

export const convertUrl = (url: string) => convertLink(new URL(url).pathname);

export const convert = (str: string) => {
  if (str.startsWith('http')) {
    return convertUrl(str);
  }
  return convertLink(str);
};

