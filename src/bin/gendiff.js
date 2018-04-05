#!/usr/bin/env node
import program from 'commander';
import genDiff from '../';

program
  .version('0.0.1')
  .usage('[options] <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format', 'Output format');

program
  .action((...args) => console.log(genDiff(...args)));

program.parse(process.argv);
