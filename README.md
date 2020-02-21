# GoL JS - Game of Life implementation in JavaScript

For more information about the game, see [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

You can check the current master version here: https://chittolina.github.io/goljs/

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

In order to correctly use the application please make sure you have these packages
working fine before we can get started:

- [Node.js 10+](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/lang/en/)

## Installing the dependencies

```
yarn install
```

## Starting development server

In order to serve the client files, run:

```
yarn dev
```

This will serve the files at `http://localhost:1234` (a custom port may be used optionally in case of this one is already used)

## Building for production

```
yarn build
```

This will output the generated files under `dist`.

## Testing

```
yarn test
```

## Deploying

```
yarn deploy
```

This command will use github pages to deploy it. The only requirement is that you manually change the `predeploy` script and set a custom `--public-url` in case your repository name is other than `goljs`.


## Generating docs

```
yarn docs
```

This will output the docs under the `/docs` folder.
## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
