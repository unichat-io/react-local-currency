import * as React from 'react'
import { render } from 'react-dom'

import LocalCurrency from '../../src'

import Title from './Title'
import Items from './Items'
import OuterContainer from './OuterContainer'
import InnerContainer from './InnerContainer'
import Divider from './Divider'

import GlobalStyles from './global'

class ReactLocalCurrencyDemo extends React.Component {
  render () {
    return (
      <React.Fragment>
        <GlobalStyles />
        <OuterContainer>
          <InnerContainer>
            <Title>
              Shows the price of your services <br /> in the customer's currency <br /> 💶 💷 💵 💴
            </Title>
            <Divider />
            <LocalCurrency
              amount={7}
              base='USD'
              IPDATA_API_KEY={process.env.REACT_IPDATA_API_KEY}
              OXR_API_ID={process.env.REACT_APP_OXR_API_ID}
              render={({ data, loading, error }) => {
                if (error) return `Error! ${error.message}`

                if (loading) return 'Loading ...'

                if (!data) return null

                return (
                  <Items>
                    <h3>
                      My service price: <strong>7 USD.</strong>
                    </h3>
                    <h3>
                      My currency based on my IP: <strong>{`${data.currency}`}</strong>
                    </h3>
                    <h3>
                      My local price is: <strong>{`${data.amount} ${data.currency}`}</strong>
                    </h3>
                  </Items>
                )
              }}
            />
          </InnerContainer>
        </OuterContainer>
      </React.Fragment>
    )
  }
}

render(<ReactLocalCurrencyDemo />, document.querySelector('#demo'))
