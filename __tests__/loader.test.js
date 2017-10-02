// @flow

import loader from '../src';
import { generateFileName } from '../src/loader';
/*
describe('base request test', () => {
  it ('Google should work', () =>
     loader('https://yandex.ru')
    .then(status => expect(status).toBe(200)));
});
*/
describe('Test files name generator', () => {
  it ('Basic test', () => {
    expect(generateFileName('https://ru.hexlet.io/courses/js-sync'))
      .toBe('ru-hexlet-io-courses-js-sync.html');
  });
  it ('Basic test 2', () => {
    expect(generateFileName('https://google.com'))
      .toBe('google-com.html');
  });
});
