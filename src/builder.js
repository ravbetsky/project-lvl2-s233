import _ from 'lodash';

const buildNode = key => (body, type) => ({ key, ...body, type });

const buildAST = (before, after) => {
  const keys = _.union(_.keys(before), _.keys(after));
  return keys.map((key) => {
    const makeNode = buildNode(key);
    if (_.has(before, key)) {
      if (_.has(after, key)) {
        if (after[key] instanceof Object && before[key] instanceof Object) {
          return makeNode({ children: buildAST(before[key], after[key]) }, 'inserted');
        } else if (after[key] !== before[key]) {
          return makeNode({ from: before[key], to: after[key] }, 'updated');
        }
        return makeNode({ from: before[key] }, 'unchanged');
      }
      return makeNode({ from: before[key] }, 'deleted');
    }
    return makeNode({ to: after[key] }, 'added');
  }, []);
};

export default buildAST;
