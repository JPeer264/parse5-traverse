# parse5-traverse
Simple but flexible AST traversal with pre and post visitors. The main code of this project comes from [ast-traverse](https://github.com/olov/ast-traverse/blob/master/ast-traverse.js). As `ast-traverse` is not compatible with [parse5](https://github.com/inikulin/parse5/blob/master/packages/parse5/docs/index.md), `parse5-traverse` got created.

## Getting started

```sh
$ npm install --save parse5-traverse
```

## Usage
```js
const parse5 = require('parse5');
const traverse = require('parse5-traverse');

const documentFragment = parse5.parseFragment('<table></table>');

// print AST node types, pre-order (node first, then its children)
traverse(ast, {
  pre(node, parent) {
    // node -> the current node
    // parent -> the parent node
  }
  post(node, parent) {
  }
});
```
