import parse from '../../src';
import { render } from '../helpers';

describe('trim option', () => {
  it('preserves whitespace text nodes when disabled if valid in parent (default)', () => {
    const html = `<table>
  <tbody>
    <tr><td>hello</td><td>\n</td><td>&nbsp;</td>\t</tr>\r
  </tbody>
</table>`;
    const reactElement = parse(html) as React.JSX.Element;
    expect(render(reactElement)).toBe(
      '<table><tbody><tr><td>hello</td><td>\n</td><td>\u00a0</td></tr></tbody></table>',
    );
    expect(reactElement).toMatchSnapshot();
  });

  it('removes whitespace text nodes when enabled', () => {
    const html = `<table>
      <tbody><tr><td> text </td><td> </td>\t</tr>\r</tbody>\n</table>`;
    const options = { trim: true };
    const reactElement = parse(html, options) as React.JSX.Element;
    expect(render(reactElement)).toBe(
      '<table><tbody><tr><td> text </td><td></td></tr></tbody></table>',
    );
  });
});
