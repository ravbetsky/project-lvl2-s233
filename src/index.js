import fs from 'fs';
import path from 'path';
import { has, union, keys } from 'lodash';
import getParser from './parsers';

const getPadding = (level, mode = ' ') =>
  `${' '.repeat((level - 1) * 4)}${' '.repeat(2)}${mode} `;

const stringify = (body, level) => {
  if (body instanceof Object) {
    return JSON.stringify(body, null, '\t')
      .replace(/\t+/g, getPadding(level + 1))
      .replace(/"/g, '')
      .replace(/\}/g, `${getPadding(level)}}`);
  }
  return body;
};

const symbols = new Map([['unchanged', ' '], ['deleted', '-'], ['added', '+']]);

const node = key => (body, type = 'unchanged') => ({ key, ...body, type });

const render = (tree, level = 0) => {
  const { key, type, ...body } = tree;
  const { value, children } = body;
  const result = children ? `{\n${children.map(el => render(el, level + 1)).join('\n')}\n${' '.repeat((level) * 4)}}` : value;
  if (key) {
    return `${getPadding(level, symbols.get(type))}${key}: ${stringify(result, level)}`;
  }
  return `${result}`;
};

const build = (before, after) => {
  const allKeys = union(keys(before), keys(after));
  const result = allKeys.reduce((acc, key) => {
    const makeNode = node(key);
    if (has(before, key)) {
      if (has(after, key)) {
        if (after[key] instanceof Object && before[key] instanceof Object) {
          return acc.concat(makeNode({ children: build(before[key], after[key]) }));
        } else if (after[key] !== before[key]) {
          return acc.concat(makeNode({ value: before[key] }, 'deleted'), makeNode({ value: after[key] }, 'added'));
        }
        return acc.concat(makeNode({ value: before[key] }));
      }
      return acc.concat(makeNode({ value: before[key] }, 'deleted'));
    }
    return acc.concat(makeNode({ value: after[key] }, 'added'));
  }, []);
  return result;
};

export default (pathToBefore, pathToAfter) => {
  const extBefore = path.extname(pathToBefore);
  const extAfter = path.extname(pathToAfter);
  const before = getParser(extBefore)(fs.readFileSync(pathToBefore, 'utf8'));
  const after = getParser(extAfter)(fs.readFileSync(pathToAfter, 'utf8'));
  const result = { children: build(before, after) };
  return render(result);
};
