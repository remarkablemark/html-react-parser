import attributesToProps from '../lib/attributes-to-props.js';

// @ts-expect-error Property 'default' exists on type
export default attributesToProps.default || attributesToProps;
