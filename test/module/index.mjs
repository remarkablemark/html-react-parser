import assert from 'assert';
import parse, {
  domToReact,
  htmlToDOM,
  attributesToProps
} from '../../index.mjs';

[parse, domToReact, htmlToDOM, attributesToProps].forEach(func => {
  assert.strictEqual(typeof func, 'function');
});
