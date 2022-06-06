const express = require('express')
const app = express()
const port = 8080
const axios = require('axios')
const response = require('express/lib/response')

app.get('/prices', (req,response) => {
    response.set('Access-Control-Allow-Origin', '*')
    axios.get('https://api.coindesk.com/v1/bpi/currentprice.json').then(res => {
        return response.json(res.data)
    })
})
app.get('/latest', (req,response) => {
    let param = req.query.currency
    response.set('Access-Control-Allow-Origin', '*')
    axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?convert=${param}`,{
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
  console.log(`Example app listening on ${port}`)
})