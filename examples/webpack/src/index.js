import ReactDOM from 'react-dom/client';
import parse from 'html-react-parser';

ReactDOM.createRoot(document.getElementById('root')).render(
  parse('<h1>HTMLReactParser loaded with Webpack</h1>')
);
