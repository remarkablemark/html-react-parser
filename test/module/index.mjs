import assert from 'assert';
import parse, {
  attributesToProps,
  domToReact,
  htmlToDOM
} from '../../index.mjs';
import { Comment, Element, ProcessingInstruction, Text } from '../../index.mjs';

[parse, domToReact, htmlToDOM, attributesToProps].forEach(func => {
  assert.strictEqual(typeof func, 'function');
});

// domhandler
[Comment, Element, ProcessingInstruction, Text].forEach(func => {
  assert.strictEqual(typeof func, 'function');
});
