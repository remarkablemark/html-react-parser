import parse, { domToReact, htmlToDOM, Element } from 'html-react-parser';
import './App.css';

console.log(domToReact);
console.log(htmlToDOM);

export default function App() {
  return (
    <div className="App">
      {parse(
        `
        <h1 style="font-family: 'Lucida Grande';">
          HTMLReactParser<br class="remove"> with Create React App (TypeScript)
        </h1>
      `,
        {
          replace(domNode) {
            if (
              domNode instanceof Element &&
              domNode.attribs.class === 'remove'
            ) {
              return <></>;
            }
          },
        }
      )}
    </div>
  );
}
