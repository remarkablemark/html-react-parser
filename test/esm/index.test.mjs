import { describe, it } from 'node:test';

import assert from 'assert';
import { isValidElement } from 'react';

import parse, {
  Comment,
  Element,
  ProcessingInstruction,
  Text,
  attributesToProps,
  domToReact,
  htmlToDOM,
} from '../../esm/index.mjs';

describe('index', () => {
  it('exports "parse" function', () => {
    assert.strictEqual(typeof parse, 'function');
  });

  it('parses HTML to React element', () => {
    assert.ok(isValidElement(parse('<p>text</p>')));
  });

  it('exports "attributesToProps" function', () => {
    assert.strictEqual(typeof attributesToProps, 'function');
  });

  it('exports "domToReact" function', () => {
    assert.strictEqual(typeof domToReact, 'function');
  });

  it('exports "htmlToDOM" function', () => {
    assert.strictEqual(typeof htmlToDOM, 'function');
  });
});

describe('domhandler', () => {
  it('exports "Comment" function', () => {
    assert.strictEqual(typeof Comment, 'function');
  });

  it('exports "Element" function', () => {
    assert.strictEqual(typeof Element, 'function');
  });

  it('exports "ProcessingInstruction" function', () => {
    assert.strictEqual(typeof ProcessingInstruction, 'function');
  });

  it('exports "Text" function', () => {
    assert.strictEqual(typeof Text, 'function');
  });
});
