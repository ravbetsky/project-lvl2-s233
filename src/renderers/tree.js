import _ from 'lodash';

const getPadding = level => ' '.repeat(level * 4);
const getInfo = mode => `  ${mode} `;

const stringify = (body, level) => {
  if (body instanceof Object) {
    return JSON.stringify(body, null, '\t')
      .replace(/\t+/g, getPadding(level + 1))
      .replace(/"/g, '')
      .replace(/\}/g, `${getPadding(level)}}`);
  }
  return body;
};

const nodeRenderers = {
  inserted(node, level, render) {
    const { children, key } = node;
    return `${getPadding(level)}${getInfo(' ')}${key}: ${render(children, level + 1)}`;
  },
  unchanged(node, level) {
    const { from, key } = node;
    return `${getPadding(level)}${getInfo(' ')}${key}: ${stringify(from, level + 1)}`;
  },
  deleted(node, level) {
    const { from, key } = node;
    return `${getPadding(level)}${getInfo('-')}${key}: ${stringify(from, level + 1)}`;
  },
  added(node, level) {
    const { to, key } = node;
    return `${getPadding(level)}${getInfo('+')}${key}: ${stringify(to, level + 1)}`;
  },
  updated(node, level) {
    return [this.deleted(node, level), this.added(node, level)];
  },
};


const render = (data, level = 0) => {
  const result = _.flatten(data.map((node) => {
    const { type } = node;
    return nodeRenderers[type](node, level, render);
  }));

  return ['{', ...result, `${getPadding(level)}}`].join('\n');
};

export default render;
