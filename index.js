const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const favicon = require("serve-favicon");
// const path = require("path");

const db = require("./helper/knex");
const payment = require("./src/controllers/payment");
const checkpayment = require("./src/controllers/checkpayment");
const rekap = require("./src/controllers/rekap");

const app = express();

///////////////////////////////////////////////////////////////////////////////////////////////////
// const { Client } = require('whatsapp-web.js');
// const qrcode = require('qrcode-terminal');

// const client = new Client();

// client.on('qr', (qr) => {
//   qrcode.generate(qr, { small: true })// Generate and scan this code with your phone
//   console.log('QR RECEIVED', qr);
// });

// client.on('ready', () => {
//   console.log('Client is ready!');
// });

// client.on('message', msg => {
//   if (msg.body == '!ping') {
//     msg.reply('pong');
//   }
// });

// client.initialize();
///////////////////////////////////////////////////////////////////////////////////////////////////

// app.use(favicon(path.join(__dirname, "public", "small", "favicon.ico")));
// app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use((req, res, next) => {
  req.db = db;
  next();
});
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.post("/rekappembayaran", rekap);
app.post("/checkpayment", checkpayment);
// app.post("/payment", payment);
app.use("/", require("./src/routes"));
app.listen(5000, () => console.log("Server started on port 5000"));
