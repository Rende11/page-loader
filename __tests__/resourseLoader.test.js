// @flow

import fs from 'mz/fs';
import { replaceTagsPath } from '../src/resourseLoader';

describe('Replace file references', () => {
  test('Base test', () => {
    const body = fs.readFileSync('./__tests__/__fixtures__/simple-com.html');
    const replacedBody = fs.readFileSync('./__tests__/__fixtures__/expected.html', 'utf8');
    expect(replaceTagsPath(body, 'simple-com_files')).toBe(replacedBody);
  });
});
