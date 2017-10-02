#!/usr/bin/env node

// @flow
import cli from 'commander';
import fs from 'fs';
import loader from '../';

const config = fs.readFileSync('./package.json', 'utf8');
const { version } = JSON.parse(config);

cli
  .version(version)
  .arguments('<url>')
  .description('Download data from url')
  .option('-o, --output', 'Path for saving data')
  .action(url =>
    console.log(loader(url)))
  .parse(process.argv);
