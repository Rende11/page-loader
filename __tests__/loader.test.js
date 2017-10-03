// @flow

import os from 'os';
import fs from 'mz/fs';
import path from 'path';
import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';


import loader from '../src';
import { generateFileName } from '../src/loader';


const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'xyz-'));
const body = fs.readFileSync('./__tests__/__fixtures__/hexlet-io.html', 'utf8');
const host = 'https:/hexlet.io';
const status = 200;
axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

describe('Base request test', () => {
  it ('Hexlet should work', (done) => {
    nock(host)
      .get('/')
      .reply(status, 'KEKE' );


    loader(host, tempDir)
      .then(() => done())
      .catch(done.fail);
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
