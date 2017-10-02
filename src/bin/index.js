#!/usr/bin/env node


import cli from 'commander';
import fs from 'fs';
import half from '../';

const config = fs.readFileSync('./package.json', 'utf8');
const { version } = JSON.parse(config);

cli
  .version(version)
  .arguments('<url>')
  .description('Download data from url')
  .option('-o, --output', 'Path for saving data')
  .parse(process.argv)
  .action(url =>
    console.log(half(url)));

