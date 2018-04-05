import fs from 'fs';
import { has } from 'lodash';

const symbols = new Map([['unchanged', ''], ['deleted', '-'], ['added', '+']]);

export const toString = (diff) => {
  const result = diff.reduce((acc, obj) => {
    const { key, value, type } = obj;
    return `${acc}  ${symbols.get(type)} ${key}: ${value}\n`;
  }, '\n');
  return `{${result}}`;
};

export default (pathToBefore, pathToAfter) => {
  const before = JSON.parse(fs.readFileSync(pathToBefore, 'utf8'));
  const after = JSON.parse(fs.readFileSync(pathToAfter, 'utf8'));
  const allKeys = [...new Set(Object.keys(before).concat(Object.keys(after)))];
  const result = allKeys.reduce((acc, key) => {
    if (has(before, key)) {
      const oldData = { key, value: before[key], type: 'unchanged' };
      if (has(after, key)) {
        if (after[key] !== oldData.value) {
          return acc.concat({ ...oldData, type: 'deleted' }, { key, value: after[key], type: 'added' });
        }
        return acc.concat(oldData);
      }
      return acc.concat({ ...oldData, type: 'deleted' });
    }
    return acc.concat({ key, value: after[key], type: 'added' });
  }, []);
  return toString(result);
};
