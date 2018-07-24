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

    let { childNodes } = node;

    // in case a <template> tag is in the middle of the HTML: https://github.com/JPeer264/node-rcs-core/issues/58
    if (node.content && Array.isArray(node.content.childNodes)) {
      ({ childNodes } = node.content);
    }

    if (res !== false && (Array.isArray(childNodes) && childNodes.length >= 0)) {
      childNodes.forEach((child) => {
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
