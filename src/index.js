import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import build from './builder';
import render from './renderers';

export default (pathToBefore, pathToAfter, format = 'tree') => {
  const extBefore = path.extname(pathToBefore);
  const extAfter = path.extname(pathToAfter);
  const before = getParser(extBefore)(fs.readFileSync(pathToBefore, 'utf8'));
  const after = getParser(extAfter)(fs.readFileSync(pathToAfter, 'utf8'));
  const result = build(before, after);
  return render(result, format);
};
