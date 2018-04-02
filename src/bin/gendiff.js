#!/usr/bin/env node
import program from 'commander';

program
  .version('0.0.1')
  .usage('[options] <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format', 'Output format');

program.parse(process.argv);
