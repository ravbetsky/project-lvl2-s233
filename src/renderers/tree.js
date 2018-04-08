const symbols = new Map([['unchanged', ' '], ['deleted', '-'], ['added', '+']]);

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

const render = (tree, level = 0) => {
  const { key, type, ...body } = tree;
  const { value, children } = body;
  const result = children ? `{\n${children.map(el => render(el, level + 1)).join('\n')}\n${' '.repeat((level) * 4)}}` : value;
  if (key) {
    return `${getPadding(level, symbols.get(type))}${key}: ${stringify(result, level)}`;
  }
  return result;
};

export default render;