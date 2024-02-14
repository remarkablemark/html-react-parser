import domToReact from '../lib/dom-to-react.js';

// @ts-expect-error Property 'default' exists on type
export default domToReact.default || domToReact;
