import attributesToProps, {
  type Attributes,
} from '../../src/attributes-to-props';

it('returns empty object is argument is undefined', () => {
  expect(attributesToProps()).toEqual({});
});

it.each(['input', 'select', 'textarea'])(
  'converts uncontrolled component attributes',
  (nodeName) => {
    expect(
      attributesToProps(
        {
          value: 'foo',
          checked: false,
        } as unknown as Attributes,
        nodeName,
      ),
    ).toEqual({
      defaultValue: 'foo',
      defaultChecked: true,
    });
  },
);

it.each(['button', 'data', 'li', 'meter', 'option', 'progress', 'param'])(
  'converts non-uncontrolled component attributes',
  (nodeName) => {
    expect(
      attributesToProps(
        {
          value: 'foo',
          checked: false,
        } as unknown as Attributes,
        nodeName,
      ),
    ).toEqual({
      value: 'foo',
      checked: true,
    });
  },
);

describe('attributesToProps with HTML attribute', () => {
  it('converts attributes to React props', () => {
    const attributes = {
      class: 'ic',
      for: 'tran',
      'http-equiv': 'refresh',
    };
    expect(attributesToProps(attributes)).toMatchInlineSnapshot(`
      {
        "className": "ic",
        "htmlFor": "tran",
        "httpEquiv": "refresh",
      }
    `);
  });

  it('converts standard attributes to React props', () => {
    const attributes = {
      allowfullscreen: true,
      charset: 'utf-8',
      tabindex: 1,
    } as unknown as Attributes;

    expect(attributesToProps(attributes)).toMatchInlineSnapshot(`
      {
        "allowFullScreen": true,
        "charSet": "utf-8",
        "tabIndex": 1,
      }
    `);
  });

  it('converts RDFa attributes to React props', () => {
    const attributes = {
      property: 'foo',
      typeof: 'bar',
    };
    expect(attributesToProps(attributes)).toMatchInlineSnapshot(`
      {
        "property": "foo",
        "typeof": "bar",
      }
    `);
  });

  it('converts non-standard attributes to React props', () => {
    const attributes = {
      itemscope: true,
      itemid: 1337,
    } as unknown as Attributes;

    expect(attributesToProps(attributes)).toMatchInlineSnapshot(`
      {
        "itemID": 1337,
        "itemScope": true,
      }
    `);
  });

  it('keeps `data-*` and `aria-*` attributes as is', () => {
    const attributes = {
      'data-foo': 'bar',
      'aria-live': 'polite',
    };
    expect(attributesToProps(attributes)).toMatchInlineSnapshot(`
      {
        "aria-live": "polite",
        "data-foo": "bar",
      }
    `);
  });

  it('converts attributes with weird capitalization', () => {
    const attributes = {
      'ACCEPT-CHARSET': 'ISO-8859-1',
      formNOvalidate: true,
      sEcUrItY: 'restricted',
      'data-FOO': 'bar',
    } as unknown as Attributes;

    expect(attributesToProps(attributes)).toMatchInlineSnapshot(`
      {
        "acceptCharset": "ISO-8859-1",
        "data-FOO": "bar",
        "formNoValidate": true,
        "security": "restricted",
      }
    `);
  });

  /**
   * The presence of a boolean attribute on an element represents the “true” value, and the absence of the attribute represents the “false” value.
   * The values “true” and “false” are not allowed on boolean attributes.
   * To represent a false value, the attribute has to be omitted altogether.
   *
   * @see {@link https://meiert.com/en/blog/boolean-attributes-of-html/}
   */
  it('converts boolean attributes', () => {
    const attributes = {
      allowfullscreen: '',
      allowpaymentrequest: '',
      async: 'false',
      autofocus: 'true',
      autoplay: 'true',
      checked: 'true',
      controls: '',
      default: '',
      draggable: 'false',
      disabled: 'disabled',
      formnovalidate: 'true',
      hidden: 'true',
      ismap: '',
      itemscope: '',
      loop: '',
      multiple: '',
      muted: '',
      nomodule: '',
      novalidate: '',
      open: '',
      playsinline: '',
      readonly: '',
      required: '',
      reversed: '',
      selected: '',
      truespeed: '',
    };
    expect(attributesToProps(attributes, 'select')).toMatchInlineSnapshot(`
      {
        "allowFullScreen": true,
        "allowpaymentrequest": "",
        "async": true,
        "autoFocus": true,
        "autoPlay": true,
        "controls": true,
        "default": true,
        "defaultChecked": true,
        "disabled": true,
        "draggable": "false",
        "formNoValidate": true,
        "hidden": true,
        "ismap": "",
        "itemScope": true,
        "loop": true,
        "multiple": true,
        "muted": true,
        "noModule": true,
        "noValidate": true,
        "open": true,
        "playsInline": true,
        "readOnly": true,
        "required": true,
        "reversed": true,
        "selected": true,
        "truespeed": "",
      }
    `);
  });

  it.each([
    [{ download: '' }, { download: true }],
    [{ download: 'filename' }, { download: 'filename' }],
  ])('converts overloaded boolean attribute: %p', (attributes, props) => {
    expect(attributesToProps(attributes)).toEqual(props);
  });

  it.each([
    [{ checked: '' }, { defaultChecked: true }],
    [{ checked: 'checked' }, { defaultChecked: true }],
    [{ value: '' }, { defaultValue: '' }],
    [{ value: 'foo' }, { defaultValue: 'foo' }],
    [
      { value: 'foo', type: 'submit' },
      { value: 'foo', type: 'submit' },
    ],
    [
      { value: 'foo', type: 'reset' },
      { value: 'foo', type: 'reset' },
    ],
  ])(
    'converts form attribute to uncontrolled component property',
    (attributes, props) => {
      expect(attributesToProps(attributes, 'input')).toEqual(props);
    },
  );

  it('preserves value of option element', () => {
    expect(attributesToProps({ value: 'foo' }, 'option')).toEqual({
      value: 'foo',
    });
  });
});

describe('attributesToProps with SVG attribute', () => {
  it('converts attributes to React props', () => {
    const attributes = {
      edgeMode: 'edgeMode',
      'fill-opacity': '0.42',
      'fill-rule': 'evenodd',
      'glyph-orientation-vertical': 'auto',
      'horiz-adv-x': '9001',
      stroke: 'none',
      'xml:base': 'http://example.org',
    };
    expect(attributesToProps(attributes)).toMatchInlineSnapshot(`
      {
        "edgeMode": "edgeMode",
        "fillOpacity": "0.42",
        "fillRule": "evenodd",
        "glyphOrientationVertical": "auto",
        "horizAdvX": "9001",
        "stroke": "none",
        "xmlBase": "http://example.org",
      }
    `);
  });

  /**
   * SVG elements and attributes should all be entered in the case shown here since XML is case-sensitive (unlike HTML).
   *
   * @see {@link https://developer.mozilla.org/docs/Web/SVG/Tutorial/Introduction#before_you_start}
   */
  it('fixes incorrectly capitalized attributes', () => {
    const attributes = {
      'XLINK:HREF': '#',
      YChannelSelector: 'G',
      ZoomAndPan: 'disable',
    };
    expect(attributesToProps(attributes)).toEqual({
      xlinkHref: '#',
      yChannelSelector: 'G',
      zoomAndPan: 'disable',
    });
  });
});

describe('attributesToProps with style attribute', () => {
  const propsEmptyStyle = { style: {} };

  it.each([undefined, null] as unknown as string[])(
    'does not parse invalid value: %s',
    (style) => {
      expect(attributesToProps({ style })).toEqual({ style });
    },
  );

  it('skips CSS comment', () => {
    const style = '/* comment */';
    expect(attributesToProps({ style })).toEqual(propsEmptyStyle);
  });

  it.each(['', ' '])('parses %p to empty style object', (style) => {
    expect(attributesToProps({ style })).toEqual(propsEmptyStyle);
  });

  it('parses CSS style to JS object', () => {
    const style = `
        color: #f00; font-size: 42px; z-index: -1; -webkit-border-top-right-radius: 10rem; background: url(data:image/png; base64,ivborw0kggoaaaansaaaabgdbtueaalgpc/xhbqaaaafzmuexurczmzpf399fx1+bm5mzy9avzxbesmgces5/p8/t9furvcrmu73jwlzosgsiizurcjo/ad+eqjjb4hv8bft+idpqocx1wjosbfhh2xssxeiyn3uli/6mnree07uiwjev8u8czwyuqdlkpg1bkb4nnm+veanfhqn1k4+gpt6ugqcvu2h2ovuif);
        /* display: block;  */
        --custom-property: #f00;
        border-bottom-left-radius:1em;border-right-style:solid;Z-Index:-1;-moz-border-radius-bottomleft:20px;
        -ms-transform: none;
      `;
    expect(attributesToProps({ style })).toMatchInlineSnapshot(`
      {
        "style": {
          "--custom-property": "#f00",
          "MozBorderRadiusBottomleft": "20px",
          "WebkitBorderTopRightRadius": "10rem",
          "background": "url(data:image/png; base64,ivborw0kggoaaaansaaaabgdbtueaalgpc/xhbqaaaafzmuexurczmzpf399fx1+bm5mzy9avzxbesmgces5/p8/t9furvcrmu73jwlzosgsiizurcjo/ad+eqjjb4hv8bft+idpqocx1wjosbfhh2xssxeiyn3uli/6mnree07uiwjev8u8czwyuqdlkpg1bkb4nnm+veanfhqn1k4+gpt6ugqcvu2h2ovuif)",
          "borderBottomLeftRadius": "1em",
          "borderRightStyle": "solid",
          "color": "#f00",
          "fontSize": "42px",
          "msTransform": "none",
          "zIndex": "-1",
        },
      }
    `);
  });
});

describe('attributesToProps with custom attribute', () => {
  it('converts attributes named after Object properties', () => {
    const attributes = {
      __defineGetter__: '',
      __defineSetter__: '',
      __lookupGetter__: '',
      __lookupSetter__: '',
      __proto__: '',
      hasOwnProperty: '',
      isPrototypeOf: '',
      propertyIsEnumerable: '',
      toLocaleString: '',
      toString: '',
      valueOf: '',
    };
    expect(attributesToProps(attributes)).toMatchInlineSnapshot(`
      {
        "__defineGetter__": "",
        "__defineSetter__": "",
        "__lookupGetter__": "",
        "__lookupSetter__": "",
        "hasOwnProperty": "",
        "isPrototypeOf": "",
        "propertyIsEnumerable": "",
        "toLocaleString": "",
        "toString": "",
        "valueOf": "",
      }
    `);
  });
});
