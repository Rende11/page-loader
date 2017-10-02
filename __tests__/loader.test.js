// @flow

import loader from '../src';
jest.mock('../src');

describe('base request test', () => {
  it ('Google should work', () =>
     loader('https://yandex.ru')
    .then(status => expect(status).toBe(200)));
});
