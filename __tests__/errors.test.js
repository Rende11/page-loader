// @flow

import os from 'os';
import fs from 'mz/fs';
import path from 'path';
import nock from 'nock';
import axios from '../src/lib/axios';
import { URL } from 'url';

import  loader  from '../src/loader';
import { generateHtmlName, generateDirName } from '../src/nameGenerator';


nock.disableNetConnect();


describe('connect errors', () => {
  const host = 'https://test.com';
  const filePath = './__fixtures__/expected.html';
  const dirName = path.join(__dirname, filePath);
  nock(host)
    .get('/').reply(200, 'ok')
    .get('/404').reply(404);

  it('Not ok response status', () => {
    expect.assertions(1);
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'x-'));
    return expect(loader('https://test.com/404', tempDir)).rejects
      .toMatch('ERROR: Request failed with status code 404');
  });

  it('Directory not exists', () => {
    expect.assertions(1);
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'x-'));
    return expect(loader(host, './notexists')).rejects
      .toMatch("ERROR: Selected directory doesn't exists");
  });
  it('Target directory is a file', () => {
    expect.assertions(1);
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'x-'));
    const host = 'https://example.com';
    nock(host).get('/').reply(200, 'hello world');
    return expect(loader(host, dirName)).rejects
      .toMatch("ERROR: Selected file not a directory");
  });
  it('File already exists', () => {
    expect.assertions(1);
    const host = 'https://example.com';
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'xy-'));
    fs.mkdir(path.join(tempDir, generateDirName(host)));
    nock(host).get('/').reply(200, 'hello world');
    return expect(loader(host, tempDir).then(() =>loader(host, tempDir))).rejects
      .toMatch("ERROR: File already exists");
  });
  it('Permission denied', () => {

  });
});
