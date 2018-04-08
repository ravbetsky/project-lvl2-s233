#!/usr/bin/env node
import program from 'commander';
import genDiff from '../';

program
  .version('0.0.1')
  .usage('[options] <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format', 'Output format');

program
  .action((firstConfig, secondConfig, options) => {
    const result = genDiff(firstConfig, secondConfig, options.format);
    return console.log(result);
  });

program.parse(process.argv);
