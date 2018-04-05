import path from 'path';
import fs from 'fs';
import genDiff from '../src';

test('JSON difference', () => {
  const pathToBefore = path.join(__dirname, '/__fixtures__/before.json');
  const pathToAfter = path.join(__dirname, '/__fixtures__/after.json');
  const pathToDiff = path.join(__dirname, '/__fixtures__/diff.txt');
  const expected = fs.readFileSync(pathToDiff, 'utf-8');
  expect(genDiff(pathToBefore, pathToAfter)).toBe(expected);
});
