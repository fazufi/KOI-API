const express = require('express')
const payment = require('./controller/payment')
const cors = require('cors')

const app = express()
const port = 5000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
  res.send('Welcome to payment KOI backend!')
})

app.post("/payment", payment)

app.listen(port, () => {
  console.log(`Payment KOI backend listening at http://localhost:${port}`)
})
