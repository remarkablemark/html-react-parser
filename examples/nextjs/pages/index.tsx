import Head from 'next/head';
import parse, { Element } from 'html-react-parser';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <h1 className="title">
          {parse(
            `
            Welcome to <a href="https://nextjs.org">Next.js</a>
            and HTMLReactParser!
          `,
            {
              replace(domNode) {
                if (domNode instanceof Element && domNode.name === 'a') {
                  return (
                    <a href="https://nextjs.org" rel="noopener noreferrer">
                      Next.js
                    </a>
                  );
                }
              },
            },
          )}
        </h1>
      </main>

      <style jsx>{`
        .title {
          font-family: 'Lucida Grande';
        }
      `}</style>
    </div>
  );
}
