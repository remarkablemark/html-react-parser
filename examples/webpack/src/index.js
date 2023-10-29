import { createRoot } from 'react-dom/client';
import parse from 'html-react-parser';

const root = createRoot(document.getElementById('root'));

root.render(parse('<h1>HTMLReactParser loaded with Webpack</h1>'));
