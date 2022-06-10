const express = require('express')
const app = express()
const port = 8080
const axios = require('axios')
const response = require('express/lib/response')

app.get('/latest', (req,response) => {
    let sort = req.query.activeSort
    let dir = req.query.sortDir
    let currency = req.query.currency
    let limit = req.query.selectedLimit
    let start = req.query.start
    response.set('Access-Control-Allow-Origin', '*')
    axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=${start}&convert=${currency}&limit=${limit}&sort=${sort}&sort_dir=${dir}`,{
        headers: {
            'X-CMC_PRO_API_KEY': 'e90f6218-8b96-4843-8b08-ab0246903f0d',
            'Accept': 'application/json',
            'Accept-Encoding': 'deflate, gzip'
        }
    }).then(res => {
        return response.json(res.data)
    }).catch(err => {
        return response.json(err)
    })
})
app.get('/search', (req,response) => {
    let search = req.query.search
    response.set('Access-Control-Allow-Origin', '*')
    axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=${search}&convert=GBP`,{
        headers: {
            'X-CMC_PRO_API_KEY': 'e90f6218-8b96-4843-8b08-ab0246903f0d',
            'Accept': 'application/json',
            'Accept-Encoding': 'deflate, gzip'
        }
    }).then(res => {
        return response.json(res.data)
    }).catch(err => {
        return response.json(err)
    })
})

app.listen(port, () => {
  console.log(`Backend serving on ${port}`)
})