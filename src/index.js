import fs from 'fs';
import path from 'path';
import { has, union, keys } from 'lodash';
import getParser from './parsers';

const symbols = new Map([['unchanged', ' '], ['deleted', '-'], ['added', '+']]);

const toString = (diff) => {
  const result = diff.reduce((acc, obj) => {
    const { key, value, type } = obj;
    return `${acc}  ${symbols.get(type)} ${key}: ${value}\n`;
  }, '\n');
  return `{${result}}`;
};

export default (pathToBefore, pathToAfter) => {
  const extBefore = path.extname(pathToBefore);
  const extAfter = path.extname(pathToAfter);
  const before = getParser(extBefore)(fs.readFileSync(pathToBefore, 'utf8'));
  const after = getParser(extAfter)(fs.readFileSync(pathToAfter, 'utf8'));
  const allKeys = union(keys(before), keys(after));
  const result = allKeys.reduce((acc, key) => {
    if (has(before, key)) {
      const oldData = { key, value: before[key], type: 'unchanged' };
      if (has(after, key)) {
        if (after[key] !== oldData.value) {
          return acc.concat({ key, value: after[key], type: 'added' }, { ...oldData, type: 'deleted' });
        }
        return acc.concat(oldData);
      }
      return acc.concat({ ...oldData, type: 'deleted' });
    }
    return acc.concat({ key, value: after[key], type: 'added' });
  }, []);
  return toString(result);
};
