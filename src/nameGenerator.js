// @flow
import pathNode from 'path';
import { URL } from 'url';

export const generatePath = (route: string) => {
  const { dir, base } = pathNode.parse(route);
  return `${dir.replace(/\W/gi, '-').replace(/-$/gi, '').replace(/^-/gi, '')}${base}`;
};


export const generateName = (base: string, extension: string) => {
  const replaced = replaceSlashes(base);
  const withExtension = `${replaced}${extension}`;
  return withExtension;
};

const replaceSlashes = (str: string) => srt.replace(/W/gi, '-').replace(/-$/gi, '').replace(/^-/gi, '');


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
  const { dir, base, ext, name } = pathNode.parse(pathname);
  const fullName = `${dir}/${name}`;
  return generateName(fullName, ext);
};

export const generateResName2 = (route: string) => {
  const { dir, base, ext, name } = pathNode.parse(route);
  const d = generatePath(dir);
  return `${d}-${base}`;
}
