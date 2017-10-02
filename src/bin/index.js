#!/usr/bin/env node

// @flow
import cli from 'commander';
import fs from 'fs';
import loader from '../';


cli
  .version('0.0.3')
  .arguments('<url>')
  .description('Download data from url')
  .action(url =>
    console.log(loader(url, cli.output)))
  .option('-o, --output [path]', 'Path for saving data')
  .parse(process.argv);
