const getRates = (OXR_API_ID, base) => {
  const url = `https://openexchangerates.org/api/latest.json?base=${base}&app_id=${OXR_API_ID}`

  return fetch(url, { method: 'GET' }) // eslint-disable-line
}

export default getRates
