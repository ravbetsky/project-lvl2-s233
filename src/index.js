import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import build from './builder';
import render from './renderers';

const getParsedFile = pathToFile =>
  getParser(path.extname(pathToFile))(fs.readFileSync(pathToFile, 'utf8'));

export default (pathToBefore, pathToAfter, format = 'tree') => {
  const before = getParsedFile(pathToBefore);
  const after = getParsedFile(pathToAfter);
  const result = build(before, after);
  return render(result, format);
};
