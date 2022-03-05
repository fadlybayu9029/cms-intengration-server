require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routers = require('./routers')
const errHandler = require('./middleware/errhandler')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/', routers)
app.use(errHandler)

app.listen(port, function(){
    console.log(`online ${port}`)
})
