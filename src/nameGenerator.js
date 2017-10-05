// @flow


/* export const generateFileName = (url: string) => {
  const { hostname, pathname } = new URL(url);
  const replaced = `${hostname}${pathname}`.replace(/\W/gi, '-').replace(/-$/gi, '');
  const withExtension = `${replaced}.html`;
  return withExtension;
};
*/
export const generatePath = (route: string) => {
  const { dir, base } = path.parse(route);
  return `${dir.replace(/\W/gi, '-')}${base}`;
};


const generateName = (base, extension) => {
  const replaced = `${base}`.replace(/\W/gi, '-').replace(/-$/gi, '');
  const withExtension = `${replaced}${extension}`;
  return withExtension;
};


export const generateFileName = (url: string) => {
  const { hostname, pathname } = new URL(url);
  return generateName(`${hostname}${pathname}`, '.html');
};
