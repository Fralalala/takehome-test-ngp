const express = require("express");
const api = require("./route");

const app = express()

app.use('', api)

app.listen(4000, () => {
  console.log("Listening on 4k")
})