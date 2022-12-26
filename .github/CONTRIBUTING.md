# Contributing

<details>
<summary>Table of Contents</summary>

- [Test](#test)
- [Lint](#lint)
- [Release](#release)

</details>

All pull requests are welcome! By participating in this project, you
agree to abide by our **[code of conduct]**.

[code of conduct]: https://github.com/remarkablemark/html-react-parser/blob/master/.github/CODE_OF_CONDUCT.md

[Fork], then clone the repository:

[fork]: https://github.com/remarkablemark/html-react-parser/fork

```sh
# replace `<user>` with your username
git clone git@github.com:<user>/html-react-parser.git && cd html-react-parser
```

Install package dependencies:

```sh
npm install
```

Make your change. Add tests and/or documentation. Ensure all tests and lint pass:

```sh
npm test
npm run lint
npm run lint:dts
```

Write a commit message that follows the [Conventional Commits][commit] specification.

The commit message will be linted during the pre-commit Git hook.
To manually lint the most recent commit message:

```sh
git log -1 --pretty=format:"%s" | npx commitlint
```

Push to your fork and [submit a pull request][pr].

[pr]: https://github.com/remarkablemark/html-react-parser/compare/

At this point you're waiting on us. We like to comment on pull requests
within three business days (and, typically, one business day). We may suggest
changes, improvements, or alternatives.

Things that will improve the chance that your pull request will be accepted:

- [ ] Write tests that pass [CI].
- [ ] Write good documentation.
- [ ] Write a [good commit message][commit].

[ci]: https://github.com/remarkablemark/html-react-parser/actions/workflows/build.yml
[commit]: https://www.conventionalcommits.org/

## Test

Run tests with coverage:

```sh
npm test
```

View coverage report in your browser:

```sh
open coverage/lcov-report/index.html
```

## Lint

Lint codebase:

```sh
npm run lint
```

Fix lint errors:

```sh
npm run lint:fix
```

Test TypeScript declaration files for style and correctness:

```sh
npm run lint:dts
```

## Release

Release and publish are automated with [Release Please].

[release please]: https://github.com/googleapis/release-please
