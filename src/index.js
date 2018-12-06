import * as React from 'react'
import PropTypes from 'prop-types'

import getRates from './api/get-rates'
import ipdata from './api/ip-data'

import conversor from './utils/conversor'
import { checkHttpStatus, parseJSON } from './utils/request'

class LocalCurrency extends React.Component {
  static displayName = 'LocalCurrency'

  static propTypes = {
    accept: PropTypes.array,
    amount: PropTypes.number.isRequired,
    base: PropTypes.string.isRequired,
    IPDATA_API_KEY: PropTypes.string.isRequired,
    OXR_API_ID: PropTypes.string.isRequired,
    children: PropTypes.func,
    render: PropTypes.func
  };

  static defaultProps = {
    children: null,
    render: null,
    accept: []
  }

  state = {
    data: null,
    loading: true,
    error: null
  }

  async componentDidMount () {
    const { OXR_API_ID, amount, base } = this.props

    try {
      const { currency } = await this.getDataFromIPData()

      const r = await getRates(OXR_API_ID, base)
        .then(checkHttpStatus)
        .then(parseJSON)

      const fxInstance = conversor(r)

      this.setState({
        data: {
          amount: fxInstance(amount).from(base).to(currency.code),
          currency: currency.code
        },
        loading: null,
        error: null
      })
    } catch (error) {
      this.setState({
        error,
        loading: null
      })
    }
  }

  async getDataFromIPData () {
    const { IPDATA_API_KEY, accept } = this.props

    const { currency, threat } = await ipdata(null, IPDATA_API_KEY)
      .then(checkHttpStatus)
      .then(parseJSON)

    if (threat.is_tor || threat.is_proxy || threat.is_anonymous) {
      throw new Error('Unable to find the customer\'s currency')
    }

    if (!accept.lenght && accept.includes(currency)) {
      throw new Error('Invalid currency')
    }

    return { currency }
  }

  render () {
    const { children, render } = this.props

    if (children) {
      return children(this.state)
    }
    if (render) {
      return render(this.state)
    }

    console.error(
      'Component LocalCurrency:',
      'no children or render prop are present'
    )

    return null
  }
}

export default LocalCurrency
