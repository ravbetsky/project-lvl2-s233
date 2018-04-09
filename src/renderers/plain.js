import { compact, has } from 'lodash';

const formatValue = (value) => {
  switch (value.constructor) {
    case String:
      return `'${value}'`;
    case Object:
      return 'complex value';
    default:
      return value;
  }
};

const actions = {
  deleted() {
    return 'removed';
  },
  added(value) {
    return `added with ${value instanceof Object ? '' : 'value: '}${formatValue(value)}`;
  },
  updated(value1, value2) {
    return `updated. From ${formatValue(value1)} to ${formatValue(value2)}`;
  },
};

const iter = (tree, acc = {}, props = []) => {
  const { key, type, ...body } = tree;
  const { value, children } = body;
  if (children) {
    return children
      .reduce((iAcc, el) => ({ ...iAcc, ...iter(el, iAcc, props.concat(el.key)) }), acc);
  }
  if (type !== 'unchanged') {
    const prop = compact(props).join('.');
    if (has(acc, prop)) {
      const prevValue = acc[prop].value1;
      return { ...acc, [prop]: { action: 'updated', value1: prevValue, value2: value } };
    }
    return { ...acc, [prop]: { action: type, value1: value } };
  }
  return acc;
};

const render = log =>
  Object.keys(log).map((key) => {
    const { action, value1, value2 } = log[key];
    return `Property '${key}' was ${actions[action](value1, value2)}`;
  }).join('\n');

export default (tree) => {
  const log = iter(tree);
  return render(log);
};
