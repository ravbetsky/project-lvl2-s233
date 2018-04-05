import path from 'path';
import genDiff, { toString as diffToString } from '../src';

test('JSON difference', () => {
  const pathToBefore = path.join(__dirname, '/__fixtures__/before.json');
  const pathToAfter = path.join(__dirname, '/__fixtures__/after.json');
  const expected = [
    { key: 'host', value: 'hexlet.io', type: 'unchanged' },
    { key: 'timeout', value: 50, type: 'deleted' },
    { key: 'timeout', value: 20, type: 'added' },
    { key: 'proxy', value: '123.234.53.22', type: 'deleted' },
    { key: 'verbose', value: true, type: 'added' },
  ];
  expect(genDiff(pathToBefore, pathToAfter)).toBe(diffToString(expected));
});
