// @flow

import os from 'os';
import fs from 'mz/fs';
import path from 'path';
import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';


import loader from '../src';
import { generateFileName } from '../src/loader';


nock.disableNetConnect();
describe('Base request test', () => {
  it('Hexlet should work', (done) => {
    const host = 'https://hexlet.io';
    const status = 200;
    axios.defaults.host = host;
    axios.defaults.adapter = httpAdapter;
    const fileName = generateFileName(host);
    const body = fs.readFileSync('./__tests__/__fixtures__/hexlet-io.html', 'utf8');
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'x-'));

    nock(host).get('/').reply(status, body);
    const route = `${tempDir}/${fileName}`;

    loader(host, tempDir)
      .then(() => fs.readFile(route, 'utf8'))
      .then((content) => {
        expect(content).toBe(body);
        done();
      }).catch(done.fail);
  });
});

test('Another test', () => {
  expect.assertions(1);
  const host = 'https://hexlet.io';
  const status = 200;
  axios.defaults.host = host;
  axios.defaults.adapter = httpAdapter;
  const fileName = generateFileName(host);
  const body = fs.readFileSync('./__tests__/__fixtures__/hexlet-io.html', 'utf8');
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'x-'));

  nock(host).get('/').reply(status, body);
  const route = `${tempDir}/${fileName}`;


  return loader(host, tempDir).then(() => fs.readFile(route, 'utf8'))
    .then((content) => {
      expect(content).toBe(body);
    });
});

describe('Test files name generator', () => {
  it('Basic test', () => {
    expect(generateFileName('https://ru.hexlet.io/courses/js-sync'))
      .toBe('ru-hexlet-io-courses-js-sync.html');
  });
  it('Basic test 2', () => {
    expect(generateFileName('https://google.com'))
      .toBe('google-com.html');
  });
});
