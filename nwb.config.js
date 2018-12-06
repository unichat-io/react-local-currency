const webpack = require('webpack')

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactLocalCurrency',
      externals: {
        react: 'React'
      }
    }
  },
  karma: {
    browsers: ['ChromeHeadless']
  },
  webpack: {
    extra: {
      plugins: [
        new webpack.EnvironmentPlugin({
          REACT_IPDATA_API_KEY: '',
          REACT_APP_OXR_API_ID: ''
        })
      ]
    }
  }
}
