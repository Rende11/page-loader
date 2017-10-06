// @flow
import pathNode from 'path';
import { URL } from 'url';

/* export const generateFileName = (url: string) => {
  const { hostname, pathname } = new URL(url);
  const replaced = `${hostname}${pathname}`.replace(/\W/gi, '-').replace(/-$/gi, '');
  const withExtension = `${replaced}.html`;
  return withExtension;
};
*/
export const generatePath = (route: string) => {
  const { dir, base } = pathNode.parse(route);
  return `${dir.replace(/\W/gi, '-')}${base}`;
};


export const generateName = (base, extension) => {
  const replaced = `${base}`.replace(/\W/gi, '-').replace(/-$/gi, '').replace(/^-/gi, '');
  const withExtension = `${replaced}${extension}`;
  return withExtension;
};


export const generateFileName = (url: string) => {
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
