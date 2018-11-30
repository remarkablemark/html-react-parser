const React = require('react');
const assert = require('assert');
const attributesToProps = require('../lib/attributes-to-props');

describe('attributesToProps', () => {
  let actualReactVersion;
  beforeEach(() => {
    actualReactVersion = React.version;
  });

  afterEach(() => {
    React.version = actualReactVersion;
  });

  describe('HTML DOM', () => {
    it('converts attributes to React props', () => {
      assert.deepEqual(
        attributesToProps({
          class: 'ic',
          for: 'tran',
          'http-equiv': 'refresh'
        }),
        {
          className: 'ic',
          htmlFor: 'tran',
          httpEquiv: 'refresh'
        }
      );
    });

    it('converts standard properties to React props', () => {
      assert.deepEqual(
        attributesToProps({
          allowfullscreen: true,
          charset: 'utf-8',
          tabindex: 1
        }),
        {
          allowFullScreen: true,
          charSet: 'utf-8',
          tabIndex: 1
        }
      );
    });

    it('converts RDFa properties to React props', () => {
      assert.deepEqual(
        attributesToProps({
          property: 'foo',
          typeof: 'bar'
        }),
        {
          property: 'foo',
          typeof: 'bar'
        }
      );
    });

    it('converts non-standard properties to React props', () => {
      assert.deepEqual(
        attributesToProps({
          itemscope: true,
          itemid: 1337
        }),
        {
          itemScope: true,
          itemID: 1337
        }
      );
    });

    it('keeps `data-` and `aria-` attributes as is', () => {
      assert.deepEqual(
        attributesToProps({
          'data-foo': 'bar',
          'aria-live': 'polite'
        }),
        {
          'data-foo': 'bar',
          'aria-live': 'polite'
        }
      );
    });

    it('converts properties with weird capitalization', () => {
      assert.deepEqual(
        attributesToProps({
          'ACCEPT-CHARSET': 'ISO-8859-1',
          formNOvalidate: true,
          sEcUrItY: 'restricted',
          'data-FOO': 'bar'
        }),
        {
          acceptCharset: 'ISO-8859-1',
          formNoValidate: true,
          security: 'restricted',
          'data-FOO': 'bar'
        }
      );
    });

    it('converts bool properties', () => {
      assert.deepEqual(
        attributesToProps({
          readonly: ''
        }),
        {
          readOnly: true
        }
      );

      assert.deepEqual(
        attributesToProps({
          disabled: 'disabled'
        }),
        {
          disabled: true
        }
      );
    });

    it('does not include unknown attributes for older react versions', () => {
      React.version = '0.14';
      assert.deepEqual(
        attributesToProps({
          unknownAttribute: 'someValue'
        }),
        {}
      );
    });
  });

  describe('SVG DOM properties', () => {
    it('converts attributes/properties to React props', () => {
      assert.deepEqual(
        attributesToProps({
          edgeMode: 'edgeMode',
          'fill-opacity': '0.42',
          'fill-rule': 'evenodd',
          'glyph-orientation-vertical': 'auto',
          'horiz-adv-x': '9001',
          stroke: 'none',
          'xml:base': 'http://example.org'
        }),
        {
          edgeMode: 'edgeMode',
          fillOpacity: '0.42',
          fillRule: 'evenodd',
          glyphOrientationVertical: 'auto',
          horizAdvX: '9001',
          stroke: 'none',
          xmlBase: 'http://example.org'
        }
      );
    });

    it('includes but does not convert incorrectly capitalized properties', () => {
      assert.deepEqual(
        attributesToProps({
          'XLINK:HREF': '#',
          ychannelselector: 'G',
          ZoomAndPan: 'disable'
        }),
        {
          'XLINK:HREF': '#',
          ychannelselector: 'G',
          ZoomAndPan: 'disable'
        }
      );
    });

    it('does not include incorrectly capitalized properties on older React versions', () => {
      React.version = '0.14';
      assert.deepEqual(
        attributesToProps({
          'XLINK:HREF': '#',
          ychannelselector: 'G',
          ZoomAndPan: 'disable'
        }),
        {}
      );
    });
  });

  describe('style', () => {
    it('converts CSS style string to JS style object', () => {
      // proper css
      assert.deepEqual(
        attributesToProps({
          style:
            'color: #f00; font-size: 42px; z-index: -1; -moz-border-radius-topright: 10px; background: url(data:image/png; base64,ivborw0kggoaaaansaaaabgdbtueaalgpc/xhbqaaaafzmuexurczmzpf399fx1+bm5mzy9avzxbesmgces5/p8/t9furvcrmu73jwlzosgsiizurcjo/ad+eqjjb4hv8bft+idpqocx1wjosbfhh2xssxeiyn3uli/6mnree07uiwjev8u8czwyuqdlkpg1bkb4nnm+veanfhqn1k4+gpt6ugqcvu2h2ovuif)'
        }),
        {
          style: {
            color: '#f00',
            fontSize: '42px',
            zIndex: '-1',
            MozBorderRadiusTopright: '10px',
            background:
              'url(data:image/png; base64,ivborw0kggoaaaansaaaabgdbtueaalgpc/xhbqaaaafzmuexurczmzpf399fx1+bm5mzy9avzxbesmgces5/p8/t9furvcrmu73jwlzosgsiizurcjo/ad+eqjjb4hv8bft+idpqocx1wjosbfhh2xssxeiyn3uli/6mnree07uiwjev8u8czwyuqdlkpg1bkb4nnm+veanfhqn1k4+gpt6ugqcvu2h2ovuif)'
          }
        }
      );

      // valid but messy
      assert.deepEqual(
        attributesToProps({
          style:
            'border-bottom-left-radius:1em;border-right-style:solid;Z-Index:-1;-moz-border-radius-bottomleft:20px'
        }),
        {
          style: {
            borderBottomLeftRadius: '1em',
            borderRightStyle: 'solid',
            zIndex: '-1',
            MozBorderRadiusBottomleft: '20px'
          }
        }
      );

      // style is null
      assert.deepEqual(
        attributesToProps({
          style: null
        }),
        {
          style: null
        }
      );

      // style is undefined
      assert.deepEqual(
        attributesToProps({
          style: undefined
        }),
        {
          style: undefined
        }
      );

      // style is empty string
      assert.deepEqual(
        attributesToProps({
          style: ''
        }),
        {
          style: {}
        }
      );
    });
  });
});
