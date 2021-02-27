const https = require("https");

const options = {
  host: "api.myngp.com",
  path: "/v2/BroadcastEmails",
  auth: "apiuser:5CA6F1BD-863C-46CE-93B6-526DF0C92FF4",
};

https.get(options, (res) => {
  let data;

  res.on("data", (d) => {
    if (!data) {
      data = d;
    } else {
      data += d;
    }
  });

  res.on("end", () => {
    data = JSON.parse(data);

    data.items.forEach((item) => {
      console.log(`${item.emailMessageId} "${item.name}"`);
    });

    console.log(`Total: ${data.count} emails`);
    
    return data;
  });

  res.on("error", (err) => {
    console.log("An error occured while processing your request");
    console.log(err);
  });
});
