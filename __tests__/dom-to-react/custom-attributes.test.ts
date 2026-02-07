import htmlToDOM from 'html-dom-parser';

import domToReact from '../../src/dom-to-react';
import { html } from '../data';

vi.mock('react', async (importOriginal) => ({
  ...(await importOriginal()),
  version: '15.7.0',
}));

describe('domToReact', () => {
  describe('when React version is 15', () => {
    it('removes unknown attributes', () => {
      const reactElement = domToReact(htmlToDOM(html.customElement));
      expect(reactElement).toMatchSnapshot();
    });
  });
});
