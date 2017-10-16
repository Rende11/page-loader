// @flow

import os from 'os';
import fs from 'mz/fs';
import path from 'path';
import nock from 'nock';
import fsExtra from 'fs-extra';
import axios from '../src/lib/axios';
import loader from '../src/loader';
import { generateHtmlName } from '../src/nameGenerator';


nock.disableNetConnect();

describe('Save file', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'z-'));

  afterAll(() => {
    fsExtra.removeSync(tempDir);
  });

  const host = 'https://simple.com';
  const fileName = generateHtmlName(host);
  const status = 200;
  const fixturesPath = './__tests__/__fixtures__/';
  const body = fs.readFileSync(path.join(fixturesPath, fileName), 'utf8');
  const expectedBody = fs.readFileSync(path.join(fixturesPath, 'expected.html'), 'utf8');
  const cssPath = './__fixtures__/assets/ie.css';
  const scriptPath = './__fixtures__/assets/script.js';
  const imgPath = './__fixtures__/assets/picture.png';
  const remoteImgPath = './__fixtures__/assets/AWp3Tv.png';
  nock(host)
    .get('/')
    .reply(status, body)
    .get('/')
    .reply(status, body)
    .get('/assets/ie.css')
    .replyWithFile(status, path.join(__dirname, cssPath))
    .get('/assets/script.js')
    .replyWithFile(status, path.join(__dirname, scriptPath))
    .get('/assets/picture.png')
    .replyWithFile(status, path.join(__dirname, imgPath));
  nock('https://goo.gl')
    .get('/AWp3Tv')
    .replyWithFile(status, path.join(__dirname, remoteImgPath));

  test('Test request', async () => {
    expect.assertions(1);
    await expect(axios.get(host).then(response => response.data)).resolves.toBe(body);
  });

  test('Load html', async () => {
    expect.assertions(1);
    await expect(loader(host, tempDir).then(filePath => fs.readFile(filePath, 'utf8'))).resolves.toBe(expectedBody);
  });
});

