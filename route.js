const express = require("express");
const https = require("https");

const api = express.Router();

api.get("/api", async (req, res) => {
  const options = {
    host: "api.myngp.com",
    path: "/v2/BroadcastEmails",
    auth: "apiuser:5CA6F1BD-863C-46CE-93B6-526DF0C92FF4",
  };

  let data;

  await https.get(options, (_res) => {
    _res.on("data", (d) => {
      if (!data) {
        data = d;
      } else {
        data += d;
      }
    });

    _res.on("end", () => {
      data = JSON.parse(data);

      data.items.forEach((item) => {
        console.log(`${item.emailMessageId} "${item.name}"`);
      });

      console.log(`Total: ${data.count} emails`);

      res.send(data);
    });

    _res.on("error", (err) => {
      console.log("An error occured while processing your request");
      console.log(err);
    });
  });
});

module.exports = api;
