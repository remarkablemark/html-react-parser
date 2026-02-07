import attributesToProps from '../../src/attributes-to-props';

vi.mock('../../src/utilities', async (importOriginal) => ({
  ...(await importOriginal()),
  PRESERVE_CUSTOM_ATTRIBUTES: false,
}));

describe('utilities.PRESERVE_CUSTOM_ATTRIBUTES=false', () => {
  const emptyProps = {};

  it('omits unknown attributes', () => {
    const attributes = { unknownAttribute: 'someValue' };
    expect(attributesToProps(attributes)).toEqual(emptyProps);
  });
});
