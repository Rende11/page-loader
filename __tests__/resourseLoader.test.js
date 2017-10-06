// @flow

import { replaceTagsPath, getResoursesHrefs, fullPathedLinks } from '../src/resourseLoader';
import { generateResName } from '../src/nameGenerator';
import fs from 'mz/fs';

test('Check replace hrefs', () => {
  /* const content = fs.readFileSync('./__tests__/__fixtures__/simple.html', 'utf8');
  const replaced = replaceTagsPath(content);
  const expected = fs.readFileSync('./__tests__/__fixtures__/expected.html', 'utf8');
    expect(replaced).toBe(expected);*/


});


describe('Test files name generator', () => {
  it('Basic test', () => {
    const html = fs.readFileSync('./__tests__/__fixtures__/simple.html', 'utf8');
    const hrefs = getResoursesHrefs(html);
    console.log(fullPathedLinks(hrefs, 'hexlet.io'));
    expect([]).toBe(['a', 'b']);
  });
  it('Test Res name', () => {
    const x = generateResName('https://hexlet.io/assets/application.js');

    expect(x).toBe(['a', 'c']);
  })
});
