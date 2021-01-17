describe.each([
  ['unminified', '../../dist/html-react-parser'],
  ['minified', '../../dist/html-react-parser.min']
])('UMD %s', (_type, path) => {
  const parse = require(path);

  it('exports the parser', () => {
    expect(parse).toBeInstanceOf(Function);
  });

  it('exports default', () => {
    expect(parse.default).toBeInstanceOf(Function);
  });

  it('exports domToReact', () => {
    expect(parse.domToReact).toBeInstanceOf(Function);
  });

  it('exports htmlToDOM', () => {
    expect(parse.htmlToDOM).toBeInstanceOf(Function);
  });

  it('exports attributesToProps', () => {
    expect(parse.attributesToProps).toBeInstanceOf(Function);
  });
});
