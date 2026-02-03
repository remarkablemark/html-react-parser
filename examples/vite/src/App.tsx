import parse, { Element } from 'html-react-parser';
import './App.css';

export default function App() {
  return (
    <>
      {parse(
        `
            Welcome to <a href="https://vite.dev">Vite</a>
            and HTMLReactParser!
          `,
        {
          replace(domNode) {
            if (domNode instanceof Element && domNode.name === 'a') {
              return (
                <a
                  href="https://vite.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vite
                </a>
              );
            }
          },
        },
      )}
    </>
  );
}
