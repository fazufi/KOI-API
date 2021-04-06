const midtransClient = require('midtrans-client');

function payment(req, res) {

  let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: 'SB-Mid-server-r4bv1xR4n-F1kMeLWi-BSxU2',
    clientKey: 'SB-Mid-client-44vIK3bYDYuZOsAq'
  });

  let parameter = req.body
  snap.createTransaction(parameter)
    .then((transaction) => {
      // transaction token
      let transactionToken = transaction.token;
      console.log('transactionToken:', transactionToken);

      // transaction redirect url
      let transactionRedirectUrl = transaction.redirect_url;
      console.log('transactionRedirectUrl:', transactionRedirectUrl);
      res.send({
        'transactionToken': transactionToken,
        'transactionRedirectUrl': transactionRedirectUrl
      })
    })
    .catch((e) => {
      console.log('Error occured:', e.message);
      res.send('Error occured:', e.message)
    });

}

module.exports = payment
