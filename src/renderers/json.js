import { compact, has } from 'lodash';

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
      const prevValue = acc[prop].value;
      return { ...acc, [prop]: { action: 'updated', from: prevValue, to: value } };
    }
    return { ...acc, [prop]: { action: type, value } };
  }
  return acc;
};

export default tree => iter(tree);
