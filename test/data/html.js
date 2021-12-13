module.exports = {
  single: '<p>foo</p>',
  multiple: '<p>foo</p><p>bar</p>',
  nested: '<div><p>foo <em>bar</em></p></div>',
  attributes:
    '<hr id="foo" class="bar baz" style="background:#fff;text-align:center" data-foo="bar"/>',
  complex:
    '<html><head><meta charSet="utf-8"/><title>Title</title><link rel="stylesheet" href="style.css"/></head><body><header id="header">Header</header><h1 style="color:#000;font-size:42px">Heading</h1><hr/><p>Paragraph</p><img src="image.jpg"/><div class="class1 class2">Some <em>text</em>.</div><script>alert();</script></body></html>',
  textarea: '<textarea>foo</textarea>',
  script: '<script>alert(1 < 2);</script>',
  style: '<style>body > .foo { color: #f00; }</style>',
  img: '<img src="http://stat.ic/img.jpg" alt="Image"/>',
  void: '<link/><meta/><img/><br/><hr/><input/>',
  comment: '<!-- comment -->',
  doctype: '<!DOCTYPE html>',
  title: '<title><em>text</em></title>',
  customElement:
    '<custom-element class="myClass" custom-attribute="value" style="-o-transition: all .5s; line-height: 1;"></custom-element>',
  form: '<input type="text" value="foo" checked="checked">'
};
