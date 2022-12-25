describe.each([
  ['minified', '../../dist/html-react-parser.min'],
  ['unminified', '../../dist/html-react-parser']
])('UMD %s', (_type, path) => {
  const parse = require(path);

  it('exports parser', () => {
    expect(parse).toBeInstanceOf(Function);
  });

  it('exports default', () => {
    expect(parse.default).toBeInstanceOf(Function);
  });

  describe('internal', () => {
    it.each(['attributesToProps', 'domToReact', 'htmlToDOM'])(
      'exports %s',
      name => {
        expect(parse[name]).toBeInstanceOf(Function);
      }
    );
  });

  describe('domhandler', () => {
    it.each(['Comment', 'Element', 'ProcessingInstruction', 'Text'])(
      'exports %s',
      name => {
        expect(parse[name]).toBeInstanceOf(Function);
      }
    );
  });
});
