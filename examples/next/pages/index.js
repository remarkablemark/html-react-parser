import Head from 'next/head';
import parse from 'html-react-parser';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <h1 className="title">
          {parse(`
            Welcome to <a href="https://nextjs.org">Next.js</a>
            and HTMLReactParser!
          `)}
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
