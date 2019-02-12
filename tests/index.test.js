import * as React from 'react'
import expect from 'expect'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import fetchMock from 'fetch-mock'

import LocalCurrency from '../src'

Enzyme.configure({ adapter: new Adapter() })

const noop = () => undefined
const wait = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms))

describe('React Local Currency', () => {
  beforeAll(() => {
    fetchMock.mock('https://openexchangerates.org/api/latest.json?base=USD&app_id=test', require('./get-rates.mock.json'))
    fetchMock.mock('https://api.ipdata.co/?api-key=test', require('./ip-data.mock.json'))
  })

  it('It renders without breaking using render as property', () => {
    const wrapper = shallow(
      <LocalCurrency
        amount={7}
        base='USD'
        IPDATA_API_KEY='test'
        OXR_API_ID='test'
        render={noop}
      />
    )

    expect(wrapper.length).toBe(1)
  })

  it('It renders without breaking using render as children elements', () => {
    const wrapper = shallow(
      <LocalCurrency
        amount={7}
        base='USD'
        IPDATA_API_KEY='test'
        OXR_API_ID='test'
      >
        {() => <div />}
      </LocalCurrency>
    )

    expect(wrapper.length).toBe(1)
  })

  it('It renders breaking - Wrong initialize ', () => {
    const wrapper = shallow(
      <LocalCurrency
        amount={7}
        base='USD'
        IPDATA_API_KEY='test'
        OXR_API_ID='test'
      />
    )

    expect(wrapper.isEmptyRender()).toBe(true)
  })

  it('Initialize sets initial state', async () => {
    const wrapper = shallow(
      <LocalCurrency
        amount={7}
        base='USD'
        IPDATA_API_KEY='test'
        OXR_API_ID='test'
        render={noop}
      />
    )

    expect(wrapper.state().loading).toBe(true)
    expect(wrapper.state().error).toBe(null)
    expect(wrapper.state().data).toBe(null)
  })

  it('It should convert USD to ARS', async () => {
    const wrapper = shallow(
      <LocalCurrency
        amount={7}
        base='USD'
        IPDATA_API_KEY='test'
        OXR_API_ID='test'
        render={noop}
      />
    )

    await wait(100)

    expect(wrapper.state().loading).toBe(null)
    expect(wrapper.state().error).toBe(null)
    expect(wrapper.state().data.currency).toBe('ARS')
    expect(wrapper.state().data.amount).toBe(262.948)
  })
})
