const paths = ['dist/html-react-parser.min.js', 'dist/html-react-parser.js'];

describe.each(paths)('UMD %s', (type) => {
  const parse = require(`../../${type}`);

  it('exports default', () => {
    expect(parse.default).toBeInstanceOf(Function);
  });

  describe('internal', () => {
    it.each(['attributesToProps', 'domToReact', 'htmlToDOM'])(
      'exports %s',
      (name) => {
        expect(parse[name]).toBeInstanceOf(Function);
      },
    );
  });

  describe('domhandler', () => {
    it.each(['Comment', 'Element', 'ProcessingInstruction', 'Text'])(
      'exports %s',
      (name) => {
        expect(parse[name]).toBeInstanceOf(Function);
      },
    );
  });
});
