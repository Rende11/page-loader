#!/usr/bin/env node

// @flow
import cli from 'commander';
import loader from '../';


cli
  .version('0.0.5')
  .arguments('<url>')
  .description('Download data from url')
  .action(url =>
    loader(url, cli.output)
      .catch(error => console.log(error)))
  .option('-o, --output [path]', 'Path for saving data')
  .parse(process.argv);
