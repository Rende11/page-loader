// @flow

import { replaceTagsPath, getResoursesHrefs, fullPathedLinks } from '../src/resourseLoader';
import { generateDirName, generateHtmlName, convertLink } from '../src/nameGenerator';
import fs from 'mz/fs';


describe('Test files name generator', () => {
  it('Basic test', () => {
    expect(generateHtmlName('https://ru.hexlet.io/courses/js-sync'))
      .toBe('ru-hexlet-io-courses-js-sync.html');
  });

  it('Basic test 2', () => {
    expect(generateHtmlName('https://google.com'))
      .toBe('google-com.html');
  });

  it('Test HTML file name', () => {
    const url = 'htts://hexlet.io';
    const fileName = generateHtmlName(url);
    expect(fileName).toBe('hexlet-io.html');
  });

  it('Test dir name', () => {
    const url = 'https://hexlet.io';
    const dir = generateDirName(url);
    expect(dir).toBe('hexlet-io_files');
  });

  it('Test replace resourse', () => {
    const link = '/assets/icons/default/favicon-8fa102c058afb01de5016a155d7db433283dc7e08ddc3c4d1aef527c1b8502b6.ico';
    const localLink = 'assets-icons-default-favicon-8fa102c058afb01de5016a155d7db433283dc7e08ddc3c4d1aef527c1b8502b6.ico';
    expect(convertLink(link)).toBe(localLink);
  })
});
