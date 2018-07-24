const test = require('ava');
const parse5 = require('parse5');
const { spy } = require('sinon');

const traverse = require('./parse5-traverse');

test('should do nothing', (t) => {
  const pre = spy();

  traverse(undefined, { pre });

  t.falsy(pre.called);
});

test('should enter 5 elements', (t) => {
  const ast = parse5.parseFragment('<a><b><c></c></b></a><a2></a2>');
  let countPre = 0;
  let countPost = 0;

  traverse(ast, {
    pre() {
      countPre += 1;
    },
    post() {
      countPost += 1;
    },
  });

  t.is(countPre, 5);
  t.is(countPost, 5);
});

test('should enter pre first, then post', (t) => {
  t.plan(2);

  const ast = parse5.parseFragment('');
  const pre = spy();

  traverse(ast, {
    pre,
    post() {
      t.true(pre.calledOnce);
    },
  });

  t.true(pre.calledOnce);
});

test('should enter pre first, then post, other way around', (t) => {
  t.plan(2);

  const ast = parse5.parseFragment('');
  const post = spy();

  traverse(ast, {
    pre() {
      t.false(post.called);
    },
    post,
  });

  t.true(post.calledOnce);
});

test('should traverse the correct order', (t) => {
  const ast = parse5.parseFragment('<a><b></b></a><a2></a2>');
  const traversed = [];

  traverse(ast, {
    pre(node) {
      traversed.push(node);
    },
  });

  t.deepEqual(ast, traversed[0]);
  t.deepEqual(ast.childNodes[0], traversed[1]);
  t.deepEqual(ast.childNodes[0].childNodes[0], traversed[2]);
  t.deepEqual(ast.childNodes[1], traversed[3]);
  t.is(traversed.length, 4);
});

test('should traverse template', (t) => {
  const ast = parse5.parseFragment('<a><b><template><c></c></template></b></a><a2></a2>');
  const traversed = [];

  traverse(ast, {
    pre(node) {
      traversed.push(node);
    },
  });

  t.is(traversed.length, 6);
});

test('should traverse a html', (t) => {
  const ast = parse5.parse('<!DOCTYPE html><html><head></head><body>Hi there!</body></html>');
  const traversed = [];

  traverse(ast, {
    pre(node) {
      traversed.push(node);
    },
  });

  t.is(traversed.length, 6);
});
