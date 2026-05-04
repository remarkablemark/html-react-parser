import { createRoot } from 'react-dom/client';
import parse from 'html-react-parser';

const root = createRoot(document.getElementById('root'));

let trustedHtml = (window.trustedTypes && window.trustedTypes.createPolicy)
                ? window.trustedTypes.createPolicy('csp-react-html', {createHTML: function(s) { return s; }})
                : null;

root.render(parse('<h1>HTMLReactParser loaded with Webpack</h1>',{
   trustedTypePolicy : trustedHtml
}));
