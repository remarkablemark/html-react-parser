import React from 'react';
import parse, { domToReact, htmlToDOM } from 'html-react-parser';
import './App.css';

console.log(domToReact);
console.log(htmlToDOM);

export default function App() {
  return (
    <div className="App">
      {parse(`
        <h2 style="font-family: 'Lucida Grande';">
          HTMLReactParser loaded with Create React App
        </h2>
      `)}
    </div>
  );
}
