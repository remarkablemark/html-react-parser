import { domToReact, htmlToDOM } from 'html-react-parser';

// $ExpectType (Element | Text | Comment | ProcessingInstruction)[]
const domNodes = htmlToDOM('<div>text</div>');

// $ExpectType string | Element | Element[]
domToReact(domNodes);
