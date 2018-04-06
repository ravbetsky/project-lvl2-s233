import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const pathToDiff = path.join(__dirname, '/__fixtures__/diff.txt');
const expected = fs.readFileSync(pathToDiff, 'utf-8');

test('JSON difference', () => {
  const pathToBefore = path.join(__dirname, '/__fixtures__/before.json');
  const pathToAfter = path.join(__dirname, '/__fixtures__/after.json');
  expect(genDiff(pathToBefore, pathToAfter)).toBe(expected);
});

test('YAML difference', () => {
  const pathToBefore = path.join(__dirname, '/__fixtures__/before.yml');
  const pathToAfter = path.join(__dirname, '/__fixtures__/after.yml');
  expect(genDiff(pathToBefore, pathToAfter)).toBe(expected);
});

test('INI difference', () => {
  const pathToBefore = path.join(__dirname, '/__fixtures__/before.ini');
  const pathToAfter = path.join(__dirname, '/__fixtures__/after.ini');
  expect(genDiff(pathToBefore, pathToAfter)).toBe(expected);
});
