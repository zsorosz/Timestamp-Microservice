// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

//Get timestamp and UTC String for a date
app.get("/api/:date?", function (req, res) {
  let date = req.params.date;
  if (req.params.date === undefined) {
    date = new Date();
  }
  let timeStamp = new Date(date).getTime();
  let utcString = new Date(date).toUTCString();

  if (!timeStamp) {
    utcString = new Date(date.substring(0, 10) * 1000).toUTCString();
    timeStamp = Number(date);
  }

  if (utcString === "Invalid Date") {
    res.json({ error: utcString });
  } else {
    res.json({ unix: timeStamp, utc: utcString });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
