// @flow

import { replaceTagsPath, getResoursesHrefs, fullPathedLinks } from '../src/resourseLoader';
import { generateHtmlName } from '../src/nameGenerator';
import fs from 'mz/fs';

describe('Test files name generator', () => {
  test('empty', () => {
    expect('test').toBe('test');
  });
});
