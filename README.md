
# React Local Currency

[![Travis][build-badge]][build] [![npm package][npm-badge]][npm] [![Coveralls][coveralls-badge]][coveralls]

## Installation

First, install the component:

```bash
yarn add react-local-currency
```
or
```bash
npm i react-local-currency --save
```

## Usage

```js
  import LocalCurrency from 'react-local-currency'

  ...

  <LocalCurrency
    amount={7} // Default price
    base='USD' // Default currency
    IPDATA_API_KEY='?' // Get the api key from http://ipdata.co
    OXR_API_ID='?' // Get the api id from https://openexchangerates.org
    render={({ data, loading, error }) => {
      if (error) return `Error! ${error.message}`

      if (loading) return 'Loading ...'

      if (!data) return null

      return (
        <div>
          <h3>
            My service price: <strong>7 USD.</strong>
          </h3>
          <h3>
            My currency based on my IP: <strong>{`${data.currency}`}</strong>
          </h3>
          <h3>
            My local price is: <strong>{`${data.amount} ${data.currency}`}</strong>
          </h3>
        </div>
      )
    }}
  />
```

To see a full example, look at [the demo](https://react-local-currency.unichat.io)

## Authors

- [Sebastián Lorenzo](https://github.com/slorenzo)

## Sponsored by

- [UNICHAT](https://unichat.io)

## License

MIT license. Copyright © 2018.

[build-badge]: https://img.shields.io/travis/unichat-io/react-local-currency/master.png?style=flat-square
[build]: https://travis-ci.org/unichat-io/react-local-currency

[npm-badge]: https://img.shields.io/npm/v/react-local-currency.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-local-currency

[coveralls-badge]: https://img.shields.io/coveralls/unichat-io/react-local-currency/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/unichat-io/react-local-currency
