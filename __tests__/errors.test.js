// @flow

import os from 'os';
import fs from 'mz/fs';
import path from 'path';
import nock from 'nock';
import axios from '../src/lib/axios';


import  loader  from '../src/loader';
import { generateHtmlName } from '../src/nameGenerator';


nock.disableNetConnect();


describe('connect errors', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'x-'));

  it('Wrong hostname', () => {

  });

  it('Not ok response status', () => {
    expect.assertions(1);
    nock('https://test.com').get('/notexists').reply(404);
    return expect(loader('https://test.com/notexists', tempDir)).rejects
      .toMatch('Request failed with status code 404');
  });
});
