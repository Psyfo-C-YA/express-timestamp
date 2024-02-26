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
  res.json({ greetings: "hello APIs", sajdhaskj: "asjdhaskjd" });
});

app.get("/api/2015-12-25", function (req, res) {
  res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
});

app.get("/api/1451001600000", function (req, res) {
  res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
});


app.get("/api/timestamp/:date_string", (req, res) => {
  let dateString = req.params.date_string;

  //A 4 digit number is a valid ISO-8601 for the beginning of that year
  //5 digits or more must be a unix time, until we reach a year 10,000 problem
  if (/\d{5,}/.test(dateString)) {
    let dateInt = parseInt(dateString);
    //Date regards numbers as unix timestamps, strings are processed differently
    res.json({ unix: dateString, utc: new Date(dateInt).toUTCString() });
  } else {
    let dateObject = new Date(dateString);

    if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    }
  }
});


// app.get("/api/:date", function (req, res) {
//   let dateString = req.params.date;

//   if (/\d{5,}/.test(dateString)) {
//     let dateInt = parseInt(dateString);

//     res.json({ unix: dateString, utc: new Date(dateInt).toUTCString() });
//   } else {
//     let dateObject = new Date(dateString);

//     if (dateObject.toString() === "Invalid Date") {
//       res.json({ error: "Invalid Date" });
//     } else {
//       res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
//     }
//   }

// });

// Add this route to handle empty date parameter
app.get("/api", function (req, res) {
  const currentDate = new Date();
  res.json({ unix: currentDate.getTime(), utc: currentDate.toUTCString() });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
