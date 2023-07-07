const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', './resources/views')

const router = require('./routes/index')
app.use(router)

app.listen(port, () => {
    console.log('Servidor:', 'http://localhost:' + port)
})
