const express = require('express')
const app = express()
const port = 8080
const axios = require('axios')
const response = require('express/lib/response')

app.get('/latest', (req,response) => {
    console.log(req.query);
    let sort = req.query.activeSort
    let dir = req.query.sortDir
    let currency = req.query.currency
    let limit = req.query.selectedLimit
    response.set('Access-Control-Allow-Origin', '*')
    axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?convert=${currency}&limit=${limit}&sort=${sort}&sort_dir=${dir}`,{
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
app.get('/latest/sort', (req,response) => {
    let currency = req.query.currency
    let type = req.query.type
    let dir = req.query.direction
    response.set('Access-Control-Allow-Origin', '*')
    axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=100&convert=${currency}&sort=${type}&sort_dir=${dir}`,{
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