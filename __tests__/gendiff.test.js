import genDiff from '../src';

test('JSON difference', () => {
  const pathToBefore = __dirname + '/__fixtures__/before.json';
  const pathToAfter = __dirname + '/__fixtures__/after.json';
  const expected = `
    {
        host: hexlet.io
      + timeout: 20
      - timeout: 50
      - proxy: 123.234.53.22
      + verbose: true
    }
  `;
  expect(genDiff(pathToBefore, pathToAfter)).toBe(expected);
});