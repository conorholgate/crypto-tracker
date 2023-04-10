const dotenv = require('./dotenv')
const { VITE_API_KEY } = process.env
const express = require('express')
const app = express()
const port = 8080
const axios = require('axios')
const errorHandler = require('./middleware/errorHandling')

app.use(errorHandler)

const headers = {
  'X-CMC_PRO_API_KEY': VITE_API_KEY,
  Accept: 'application/json',
  'Accept-Encoding': 'deflate, gzip',
}

app.get(
  '/latest',
  async (req, response, next) => {
    const { activeSort, sortDir, currency, selectedLimit, start } = req.query
    response.set('Access-Control-Allow-Origin', '*')
    try {
      let { data } = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=${start}&convert=${currency}&limit=${selectedLimit}&sort=${activeSort}&sort_dir=${sortDir}`, {
        headers: headers,
      })
      return response.json(data)
    } catch (error) {
      next(err)
    }
  },
  errorHandler
)
app.get(
  '/metadata',
  async (req, response, next) => {
    const { id, slug } = req.query
    let urlQuery = id ? `id=${id}` : `slug=${slug}`
    response.set('Access-Control-Allow-Origin', '*')
    try {
      let { data } = await axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?${urlQuery}`, {
        headers: headers,
      })
      return response.json(data)
    } catch (err) {
      next(err)
    }
  },
  errorHandler
)
// app.get('/search', (req, response) => {
//   let search = req.query.search
//   response.set('Access-Control-Allow-Origin', '*')
//   axios
//     .get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=${search}&convert=GBP`, {
//       headers: headers,
//     })
//     .then(res => {
//       return response.json(res.data)
//     })
//     .catch(err => {
//       throw new Error(err)
//     })
// })

app.listen(port, () => {
  console.log(`Backend serving on ${port}`)
})
