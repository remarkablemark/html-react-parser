# Contributing

<details>
<summary>Table of Contents</summary>

- [Fork](#fork)
- [Install](#install)
- [Develop](#develop)
- [Test](#test)
- [Lint](#lint)
- [Release](#release)

</details>

Pull requests are welcome! By participating in this project, you agree to abide by our [code of conduct](https://github.com/remarkablemark/.github/blob/master/CODE_OF_CONDUCT.md).

## Fork

[Fork](https://github.com/remarkablemark/html-react-parser/fork) and then clone the repository:

```sh
# replace <USER> with your username
git clone git@github.com:<USER>/html-react-parser.git
```

```sh
cd html-react-parser
```

## Install

Set the Node.js version with [nvm](https://github.com/nvm-sh/nvm#intro):

```sh
nvm use
```

Install the dependencies:

```sh
npm install
```

## Develop

Make your changes, add tests/documentation, and ensure tests and lint pass:

```sh
npm test
```

```sh
npm run lint
```

```sh
npm run lint:tsc
```

Write a commit message that follows the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **test**: Add missing tests or correct existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Updates configuration files and scripts for continuous integration
- **docs**: Documentation only changes

The commit message will be linted during the pre-commit Git hook. To manually lint the most recent commit message:

```sh
git log -1 --pretty=format:"%s" | npx commitlint
```

Push to your fork and create a [pull request](https://github.com/remarkablemark/html-react-parser/compare/).

At this point, wait for us to review your pull request. We'll try to review pull requests within 1-3 business days. We may suggest changes, improvements, and/or alternatives.

Things that will improve the chance that your pull request will be accepted:

- [ ] Write tests that pass [CI](https://github.com/remarkablemark/html-react-parser/actions/workflows/build.yml).
- [ ] Write solid documentation.
- [ ] Write a good [commit message](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit).

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

Check types:

```sh
npm run lint:dts
```

## Release

Release and publish are automated with [Release Please](https://github.com/googleapis/release-please).
