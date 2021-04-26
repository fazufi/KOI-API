
const midtransClient = require("midtrans-client");

function payment(req, res) {
  let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: "SB-Mid-server-r4bv1xR4n-F1kMeLWi-BSxU2",
    clientKey: "SB-Mid-client-44vIK3bYDYuZOsAq",
  });

  let parameter = req.body;
  snap
    .createTransaction(parameter)
    .then((transaction) => {
      console.log(transaction);
      res.json(transaction);
    })
    .catch((e) => {
      console.log("Error occured:", e.message);
      res.send("Error occured:", e.message);
    });
}

module.exports = payment;
