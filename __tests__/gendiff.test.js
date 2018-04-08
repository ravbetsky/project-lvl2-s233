import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getFixturePath = fileName => path.join(__dirname, '__fixtures__', fileName);

test('JSON difference', () => {
  const pathToBefore = getFixturePath('before.json');
  const pathToAfter = getFixturePath('after.json');
  const pathToDiff = getFixturePath('diff.txt');
  const expected = fs.readFileSync(pathToDiff, 'utf-8');
  expect(genDiff(pathToBefore, pathToAfter)).toBe(expected);
});

test('YAML difference', () => {
  const pathToBefore = getFixturePath('before.yml');
  const pathToAfter = getFixturePath('after.yml');
  const pathToDiff = getFixturePath('diff.txt');
  const expected = fs.readFileSync(pathToDiff, 'utf-8');
  expect(genDiff(pathToBefore, pathToAfter)).toBe(expected);
});

test('INI difference', () => {
  const pathToBefore = getFixturePath('before.ini');
  const pathToAfter = getFixturePath('after.ini');
  const pathToDiff = getFixturePath('diff.txt');
  const expected = fs.readFileSync(pathToDiff, 'utf-8');
  expect(genDiff(pathToBefore, pathToAfter)).toBe(expected);
});
