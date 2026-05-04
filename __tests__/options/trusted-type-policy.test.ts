import htmlToDOM from 'html-dom-parser';

import parse from '../../src';

vi.mock('html-dom-parser', () => ({
  default: vi.fn(() => []),
}));

describe('trustedTypePolicy option', () => {
  it('passes trustedTypePolicy to html-dom-parser', () => {
    const trustedTypePolicy = {
      createHTML: vi.fn((input: string) => input),
    };

    parse('<div>test</div>', { trustedTypePolicy });

    expect(htmlToDOM).toHaveBeenCalledWith(
      '<div>test</div>',
      expect.objectContaining({
        lowerCaseAttributeNames: false,
        trustedTypePolicy,
      }),
    );
  });
});
