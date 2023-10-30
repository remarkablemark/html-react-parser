import HTMLReactParser from '../lib/index.js';

export {
  Comment,
  Element,
  ProcessingInstruction,
  Text,
  attributesToProps,
  domToReact,
  htmlToDOM,
} from '../lib/index.js';

export default HTMLReactParser.default || HTMLReactParser;
