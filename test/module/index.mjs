import assert from 'assert';
import parse, {
  attributesToProps,
  domToReact,
  htmlToDOM
} from '../../index.mjs';
import {
  Comment,
  Element,
  Node,
  ProcessingInstruction,
  Text
} from '../../index.mjs';

[parse, domToReact, htmlToDOM, attributesToProps].forEach(func => {
  assert.strictEqual(typeof func, 'function');
});

// domhandler
[Comment, Element, Node, ProcessingInstruction, Text].forEach(func => {
  assert.strictEqual(typeof func, 'function');
});
