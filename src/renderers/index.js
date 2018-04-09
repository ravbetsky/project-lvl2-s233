import renderTree from './tree';
import renderPlain from './plain';

const renderers = { tree: renderTree, plain: renderPlain };

export default (data, format = 'tree') =>
  renderers[format](data);
