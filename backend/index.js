const express = require('express')
const app = express()
const port = 8080
const axios = require('axios')
const response = require('express/lib/response')

app.get('/prices', (req,response) => {
    response.set('Access-Control-Allow-Origin', '*')
    var data = null
    axios.get('https://api.coindesk.com/v1/bpi/currentprice.json').then(res => {
        //data = res.data
        return response.json(res.data)
    })
})

app.listen(port, () => {
  console.log(`Example app listening on ${port}`)
})