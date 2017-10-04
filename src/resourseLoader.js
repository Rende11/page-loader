import cheerio from 'cheerio';
import fs from 'mz/fs';
import path from 'path';

export const replace = (html: string) => {

  const $ = cheerio.load(html);
  const links = $('link');
  links.attr('href', (i, value) => path.normalize(`/local/${value}`));
  const scripts = $('script');
  scripts.attr('src', (i, value) => path.normalize(`/local/${value}`));
  const imgs = $('img');
  imgs.attr('src', (i, value) => path.normalize(`/local/${value}`));
  return $.html();
};

