// @flow

import os from 'os';
import fs from 'mz/fs';
import path from 'path';
import nock from 'nock';
import fsExtra from 'fs-extra';
import axios from '../src/lib/axios';
import loader from '../src/loader';
import { generateDirName } from '../src/nameGenerator';


nock.disableNetConnect();

describe('connect errors', () => {
  const host = 'https://test.com';
  const filePath = './__fixtures__/expected.html';
  const dirName = path.join(__dirname, filePath);
  nock(host)
    .get('/').reply(200, 'OK')
    .get('/404')
    .reply(404);

  let tempDir;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'x-'));
  });


  afterEach(() => {
    fsExtra.removeSync(tempDir);
  });
  test('Test request', () => expect(axios.get(host).then(response => response.data)).resolves.toBe('OK'));

  it('Not ok response status', async () => {
    expect.assertions(1);
    await expect(loader('https://test.com/404', tempDir)).rejects
      .toBe('ERROR: Request failed with status code 404');
  });

  it('Directory not exists', async () => {
    expect.assertions(1);
    await expect(loader(host, './notexists')).rejects
      .toBe("ERROR: Selected directory doesn't exists");
  });

  it('Target directory is a file', async () => {
    expect.assertions(1);
    await expect(loader(host, dirName)).rejects
      .toBe('ERROR: Selected file not a directory');
  });

  it('File already exists', async () => {
    expect.assertions(1);
    fs.mkdir(path.join(tempDir, generateDirName(host)));
    await expect(loader(host, tempDir)).rejects
      .toBe('ERROR: File already exists');
  });

  it('Permission denied', async () => {
    expect.assertions(1);
    fs.chmodSync(tempDir, '000');
    await expect(loader(host, tempDir)).rejects
      .toBe('ERROR: Permission denied');
  });
});
