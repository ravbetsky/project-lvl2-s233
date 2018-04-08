import tree from './tree';
import plain from './plain';

const renderers = { tree, plain };

export default (tree, format = 'tree') =>
  renderers[format](tree);