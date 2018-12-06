import * as fx from 'money'

const conversor = ({ rates, base }) => {
  const fxInstance = fx.factory()
  fxInstance.rates = rates
  fxInstance.base = base

  return fxInstance
}

export default conversor
