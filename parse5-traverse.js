/**
 * the main logic comes from https://github.com/olov/ast-traverse.
 * A big thanks to @olov.
 */
const traverse = (root, options = {}) => {
  const { pre, post, skipProperty } = options;

  const visit = (node, parent) => {
    let res;

    if (!node) {
      return;
    }

    if (pre) {
      res = pre(node, parent);
    }

    if (res !== false && (Array.isArray(node.childNodes) && node.childNodes.length >= 0)) {
      node.childNodes.forEach((child) => {
        if (skipProperty && skipProperty(node)) {
          return;
        }

        visit(child, node);
      });
    }

    if (post) {
      post(node, parent);
    }
  };

  visit(root, null);
};

module.exports = traverse;
