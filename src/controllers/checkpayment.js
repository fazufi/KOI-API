const axios = require('axios')

exports.checkpayment = async(req, res) => {
  const payload = req.body.payload
  console.log(payload)
  const data = await axios.get(`https://api.sandbox.midtrans.com/v2/${payload}/status`, { 'headers': { 'Authorization': 'Basic U0ItTWlkLXNlcnZlci1yNGJ2MXhSNG4tRjFrTWVMV2ktQlN4VTI6', 'Accept': 'application/json', 'Content-Type': 'application/json' } })
  res.send(data.data)
}

