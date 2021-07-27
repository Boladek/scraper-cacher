## Description

Scraper-Cacher is a simple web service that parses urls and returns meta data such as Title, description and largest Image (if present) of any urls passed as parameter. It also caches web-pages visited.

## Installation

git clone 'https://github.com/Boladek/scraper-cacher.git'

cd scraper-cacher/

```bash
$ yarn
```

## Running the app

```bash
#start your redis server
$ redis server

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

# USING It in the browser

```bash
go to localhost:3000/graphql

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Mubarak Bolaji](bmubarak88@gmail.com)
- Twitter - [@nestframework](https://twitter.com/nestframework)
- Heroku - ['https://scraper-cacher-haggle-x.herokuapp.com/']

## License

Nest is [MIT licensed](LICENSE).
