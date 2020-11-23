const attributesToProps = require('../lib/attributes-to-props');
const utilities = require('../lib/utilities');

describe('attributes to props', () => {
  describe('HTML', () => {
    it('converts attributes to React props', () => {
      expect(
        attributesToProps({
          class: 'ic',
          for: 'tran',
          'http-equiv': 'refresh'
        })
      ).toEqual({
        className: 'ic',
        htmlFor: 'tran',
        httpEquiv: 'refresh'
      });
    });

    it('converts standard attributes to React props', () => {
      expect(
        attributesToProps({
          allowfullscreen: true,
          charset: 'utf-8',
          tabindex: 1
        })
      ).toEqual({
        allowFullScreen: true,
        charSet: 'utf-8',
        tabIndex: 1
      });
    });

    it('converts RDFa attributes to React props', () => {
      expect(
        attributesToProps({
          property: 'foo',
          typeof: 'bar'
        })
      ).toEqual({
        property: 'foo',
        typeof: 'bar'
      });
    });

    it('converts non-standard attributes to React props', () => {
      expect(
        attributesToProps({
          itemscope: true,
          itemid: 1337
        })
      ).toEqual({
        itemScope: true,
        itemID: 1337
      });
    });

    it('keeps `data-*` and `aria-*` attributes as is', () => {
      expect(
        attributesToProps({
          'data-foo': 'bar',
          'aria-live': 'polite'
        })
      ).toEqual({
        'data-foo': 'bar',
        'aria-live': 'polite'
      });
    });

    it('converts attributes with weird capitalization', () => {
      expect(
        attributesToProps({
          'ACCEPT-CHARSET': 'ISO-8859-1',
          formNOvalidate: true,
          sEcUrItY: 'restricted',
          'data-FOO': 'bar'
        })
      ).toEqual({
        acceptCharset: 'ISO-8859-1',
        formNoValidate: true,
        security: 'restricted',
        'data-FOO': 'bar'
      });
    });

    it('converts boolean attributes', () => {
      expect(
        attributesToProps({
          readonly: ''
        })
      ).toEqual({
        readOnly: true
      });

      expect(
        attributesToProps({
          disabled: 'disabled'
        })
      ).toEqual({
        disabled: true
      });
    });

    it('converts overloaded boolean attributes', () => {
      expect(
        attributesToProps({
          download: ''
        })
      ).toEqual({
        download: true
      });

      expect(
        attributesToProps({
          download: 'filename'
        })
      ).toEqual({
        download: 'filename'
      });
    });
  });

  describe('SVG', () => {
    it('converts attributes to React props', () => {
      expect(
        attributesToProps({
          edgeMode: 'edgeMode',
          'fill-opacity': '0.42',
          'fill-rule': 'evenodd',
          'glyph-orientation-vertical': 'auto',
          'horiz-adv-x': '9001',
          stroke: 'none',
          'xml:base': 'http://example.org'
        })
      ).toEqual({
        edgeMode: 'edgeMode',
        fillOpacity: '0.42',
        fillRule: 'evenodd',
        glyphOrientationVertical: 'auto',
        horizAdvX: '9001',
        stroke: 'none',
        xmlBase: 'http://example.org'
      });
    });

    it('keeps incorrectly capitalized attributes', () => {
      expect(
        attributesToProps({
          'XLINK:HREF': '#',
          YChannelSelector: 'G',
          ZoomAndPan: 'disable'
        })
      ).toEqual({
        'XLINK:HREF': '#',
        YChannelSelector: 'G',
        ZoomAndPan: 'disable'
      });
    });
  });

  // cssToJs
  describe('style', () => {
    const propsEmptyStyle = { style: {} };

    it.each([undefined, null])('does not parse invalid value: %s', style => {
      expect(attributesToProps({ style })).toEqual({ style });
    });

    it('does not parse CSS comment', () => {
      const style = '/* comment */';
      expect(attributesToProps({ style })).toEqual(propsEmptyStyle);
    });

    it('parses "" to {}', () => {
      const style = '';
      expect(attributesToProps({ style })).toEqual(propsEmptyStyle);
    });

    it('parses CSS to JS', () => {
      const style = `
        color: #f00; font-size: 42px; z-index: -1; -webkit-border-top-right-radius: 10rem; background: url(data:image/png; base64,ivborw0kggoaaaansaaaabgdbtueaalgpc/xhbqaaaafzmuexurczmzpf399fx1+bm5mzy9avzxbesmgces5/p8/t9furvcrmu73jwlzosgsiizurcjo/ad+eqjjb4hv8bft+idpqocx1wjosbfhh2xssxeiyn3uli/6mnree07uiwjev8u8czwyuqdlkpg1bkb4nnm+veanfhqn1k4+gpt6ugqcvu2h2ovuif);
        /* display: block;  */
        --custom-property: #f00;
        border-bottom-left-radius:1em;border-right-style:solid;Z-Index:-1;-moz-border-radius-bottomleft:20px'
      `;
      expect(attributesToProps({ style })).toMatchSnapshot();
    });
  });

  describe('custom', () => {
    it('converts attributes named after Object properties', () => {
      // handled as custom attributes
      const attributes = {
        __defineGetter__: '',
        __defineSetter__: '',
        __lookupGetter__: '',
        __lookupSetter__: '',
        __proto__: '',
        constructor: '',
        hasOwnProperty: '',
        isPrototypeOf: '',
        propertyIsEnumerable: '',
        toLocaleString: '',
        toString: '',
        valueOf: ''
      };

      expect(attributesToProps(attributes)).toEqual(attributes);
    });

    describe('when utilties.PRESERVE_CUSTOM_ATTRIBUTES=false', () => {
      const { PRESERVE_CUSTOM_ATTRIBUTES } = utilities;

      beforeAll(() => {
        utilities.PRESERVE_CUSTOM_ATTRIBUTES = false;
      });

      afterAll(() => {
        utilities.PRESERVE_CUSTOM_ATTRIBUTES = PRESERVE_CUSTOM_ATTRIBUTES;
      });

      it('omits unknown attributes', () => {
        expect(
          attributesToProps({
            unknownAttribute: 'someValue'
          })
        ).toEqual({});
      });

      it('omits incorrectly capitalized attributes', () => {
        expect(
          attributesToProps({
            'XLINK:HREF': '#',
            YChannelSelector: 'G',
            ZoomAndPan: 'disable'
          })
        ).toEqual({});
      });
    });
  });
});
