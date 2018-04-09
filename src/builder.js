import { has, union, keys } from 'lodash';

const node = key => (body, type = 'unchanged') => ({ key, ...body, type });

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

export default (before, after) => ({ children: build(before, after) });
