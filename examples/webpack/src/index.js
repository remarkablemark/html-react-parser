import parse from 'html-react-parser';

import('react-dom').then(function (ReactDOM) {
  ReactDOM.render(
    parse('<h1>HTMLReactParser loaded with webpack</h1>'),
    document.getElementById('root')
  );
});
