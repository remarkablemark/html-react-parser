import { createRoot } from 'react-dom/client';
import parse from 'html-react-parser';

const root = createRoot(document.getElementById('root'));

const trustedHtml =
  window.trustedTypes && window.trustedTypes.createPolicy
    ? window.trustedTypes.createPolicy('csp-react-html', {
        createHTML: function (string) {
          return string;
        },
      })
    : null;

root.render(
  parse('<h1>HTMLReactParser loaded with Webpack</h1>', {
    trustedTypePolicy: trustedHtml,
  }),
);
