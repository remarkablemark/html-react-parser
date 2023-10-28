import { domToReact, htmlToDOM } from 'html-react-parser';

// $ExpectType DOMNode[]
const domNodes = htmlToDOM('<div>text</div>');

// $ExpectType string | Element | Element[]
domToReact(domNodes);
