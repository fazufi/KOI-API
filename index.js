const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const path = require("path");


const db = require("./helper/knex");

const app = express();

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use((req, res, next) => {
  req.db = db;
  next();
});
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));


app.use("/", require("./src/routes"));
app.listen(5000, () => console.log("Server started on port 5000"));
