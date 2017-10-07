// @flow

import { generateDirName, generateHtmlName, convert } from '../src/nameGenerator';

describe('Test files name generator', () => {
  it('Basic test', () => {
    expect(generateHtmlName('https://ru.hexlet.io/courses/js-sync'))
      .toBe('ru-hexlet-io-courses-js-sync.html');
  });

  it('Basic test 2', () => {
    expect(generateHtmlName('https://google.com'))
      .toBe('google-com.html');
  });

  it('Test replace resourse', () => {
    const link = '/assets/icons/default/favicon-8fa102c058afb01de5016a155d7db433283dc7e08ddc3c4d1aef527c1b8502b6.ico';
    const localLink = 'assets-icons-default-favicon-8fa102c058afb01de5016a155d7db433283dc7e08ddc3c4d1aef527c1b8502b6.ico';
    expect(convert(link)).toBe(localLink);
  });

  it('Test replace cdn resourses', () => {
    const remoteLink = 'https://cdn2.hexlet.io/attachments/d716c7eab3879273ec10faf38b5266db3cea2f9a/store/917bf394ec7db64af746bfa598d796b592bf3fd91d41576d8f34ec3ab6e7/image.png';
    const localRemoteLink = 'attachments-d716c7eab3879273ec10faf38b5266db3cea2f9a-store-917bf394ec7db64af746bfa598d796b592bf3fd91d41576d8f34ec3ab6e7-image.png';
    expect(convert(remoteLink)).toBe(localRemoteLink);
  });
});

describe('Test name generator', () => {
  const url = 'htts://hexlet.io';
  const fileName = generateHtmlName(url);
  const dir = generateDirName(url);

  it('Test HTML file name', () => {
    expect(fileName).toBe('hexlet-io.html');
  });

  it('Test dir name', () => {
    expect(dir).toBe('hexlet-io_files');
  });
});
