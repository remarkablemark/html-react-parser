import parse, { Element } from 'html-react-parser';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        {parse(
          `
            Welcome to <a href="https://nextjs.org">Next.js</a>
            and HTMLReactParser!
          `,
          {
            replace(domNode) {
              if (domNode instanceof Element && domNode.name === 'a') {
                return (
                  <a
                    className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                    href="https://nextjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Next.js
                  </a>
                );
              }
            },
          },
        )}
      </h1>
    </div>
  );
}
