import * as urljoin from 'url-join'

const ipdata = (ip, apiKey) => {
  const url = urljoin('https://api.ipdata.co/', `?api-key=${apiKey}`)

  return fetch(url, { method: 'GET' }) // eslint-disable-line
}

export default ipdata
