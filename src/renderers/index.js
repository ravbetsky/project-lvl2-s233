import renderTree from './tree';
import renderPlain from './plain';
import renderJSON from './json';

const renderers = {
  tree: renderTree,
  plain: renderPlain,
  json: renderJSON,
};

export default (data, format = 'tree') =>
  renderers[format](data);
