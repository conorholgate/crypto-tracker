const dotenv = require('./dotenv')
const { VITE_API_KEY } = process.env
const express = require('express')
const app = express()
const port = 8080
const axios = require('axios')
const errorHandler = require('./middleware/errorHandling')

// Setting the cors headers
const cors = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  next()
}
// Applies the cors headers to all routes
app.use(cors)

// Setting the headers for all routes
const headers = {
  'X-CMC_PRO_API_KEY': VITE_API_KEY,
  Accept: 'application/json',
  'Accept-Encoding': 'deflate, gzip',
}

// Gets the latest data for all coins
app.get('/latest', async (req, response, next) => {
  const { activeSort, sortDir, currency, selectedLimit, start } = req.query
  try {
    let { data } = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=${start}&convert=${currency}&limit=${selectedLimit}&sort=${activeSort}&sort_dir=${sortDir}`, {
      headers: headers,
    })
    return response.json(data)
  } catch (error) {
    next(err)
  }
})

// Gets data about one or many coins
app.get('/metadata', async (req, response, next) => {
  const { id, slug } = req.query
  let urlQuery = id ? `id=${id}` : `slug=${slug}`
  try {
    let { data } = await axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?${urlQuery}`, {
      headers: headers,
    })
    return response.json(data)
  } catch (err) {
    next(err)
  }
})
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

// Applies the error handler to all routes
app.use(errorHandler)
app.listen(port, () => {
  console.log(`Backend serving on ${port}`)
})
