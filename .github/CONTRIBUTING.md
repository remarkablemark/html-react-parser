# Contributing

<details>
<summary>Table of Contents</summary>

- [Test](#test)
- [Fork](#fork)
- [Lint](#lint)
- [Release](#release)

</details>

All pull requests are welcome! By participating in this project, you
agree to abide by our **[code of conduct]**.

[code of conduct]: https://github.com/remarkablemark/.github/blob/master/CODE_OF_CONDUCT.md

## Fork

[Fork], then clone the repository:

[fork]: https://github.com/remarkablemark/html-react-parser/fork

```sh
# replace <USER> with your username
git clone git@github.com:<USER>/html-react-parser.git
cd html-react-parser
```

Install the package dependencies:

```sh
npm install
```

Make your changes. Add tests and/or documentation. Ensure all tests and lint pass:

```sh
npm test
npm run lint
npm run lint:dts
```

Write a commit message that follows the [Conventional Commits][commit] specification:

- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests
- **docs**: Documentation only changes

The commit message will be linted during the pre-commit Git hook.
To manually lint the most recent commit message:

```sh
git log -1 --pretty=format:"%s" | npx commitlint
```

Push to your fork and [create a pull request][pr].

[pr]: https://github.com/remarkablemark/html-react-parser/compare/

At this point you're waiting on us. We'll try to review pull requests within
1-3 business days. We may suggest changes, improvements, and/or alternatives.

Things that will improve the chance that your pull request will be accepted:

- [ ] Write tests that pass [CI].
- [ ] Write good documentation.
- [ ] Write a [good commit message][commit].

[ci]: https://github.com/remarkablemark/html-react-parser/actions/workflows/build.yml
[commit]: https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit

## Test

Run tests with coverage:

```sh
npm test
```

Run tests in watch mode:

```sh
npm run test:watch
```

View the coverage report in your browser:

```sh
open coverage/lcov-report/index.html
```

## Lint

Run ESLint:

```sh
npm run lint
```

Fix lint errors:

```sh
npm run lint:fix
```

Type check TypeScript declaration files:

```sh
npm run lint:dts
```

## Release

Release and publish are automated with [Release Please].

[release please]: https://github.com/googleapis/release-please
