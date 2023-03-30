const dotenv = require('./dotenv')
const { VITE_API_KEY } = process.env
const express = require('express')
const app = express()
const port = 8080
const axios = require('axios')

const headers = {
  'X-CMC_PRO_API_KEY': VITE_API_KEY,
  Accept: 'application/json',
  'Accept-Encoding': 'deflate, gzip',
}

app.get('/latest', (req, response) => {
  const { activeSort, sortDir, currency, selectedLimit, start } = req.query
  response.set('Access-Control-Allow-Origin', '*')
  axios
    .get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=${start}&convert=${currency}&limit=${selectedLimit}&sort=${activeSort}&sort_dir=${sortDir}`, {
      headers: headers,
    })
    .then(res => {
      return response.json(res.data)
    })
    .catch(err => {
      throw new Error(err)
    })
})
app.get('/search', (req, response) => {
  let search = req.query.search
  response.set('Access-Control-Allow-Origin', '*')
  axios
    .get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=${search}&convert=GBP`, {
      headers: headers,
    })
    .then(res => {
      return response.json(res.data)
    })
    .catch(err => {
      throw new Error(err)
    })
})

app.listen(port, () => {
  console.log(`Backend serving on ${port}`)
})
