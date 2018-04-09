import _ from 'lodash';

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

const nodeRenderers = {
  inserted(node, path, render) {
    const { key, children } = node;
    return render(children, _.compact(path.concat(key)));
  },
  deleted(node, path) {
    const { key } = node;
    const prop = path.concat(key).join('.');
    return `Property '${prop}' was removed`;
  },
  added(node, path) {
    const { to, key } = node;
    const prop = path.concat(key).join('.');
    return `Property '${prop}' was added with ${to instanceof Object ? '' : 'value: '}${formatValue(to)}`;
  },
  updated(node, path) {
    const { key, from, to } = node;
    const prop = path.concat(key).join('.');
    return `Property '${prop}' was updated. From ${formatValue(from)} to ${formatValue(to)}`;
  },
};


const render = (data, path = []) => {
  const result = _.flatten(data
    .filter(node => Object.keys(nodeRenderers).includes(node.type))
    .map(node => nodeRenderers[node.type](node, path, render)));

  return result.join('\n');
};

export default render;
