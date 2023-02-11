import parse, { domToReact, htmlToDOM, Element } from 'html-react-parser';
import './App.css';

console.log(domToReact);
console.log(htmlToDOM);

const parser = input =>
  parse(input, {
    replace: domNode => {
      if (domNode instanceof Element && domNode.attribs.class === 'remove') {
        return <></>;
      }
    }
  });

export default function App() {
  return (
    <div className="App">
      {parser(`
        <h2 style="font-family: 'Lucida Grande';">
          HTMLReactParser<br class="remove"> with Create React App
        </h2>
      `)}
    </div>
  );
}
