const express    = require("express");
const app        = express();
var bodyParser   = require("body-parser");
var jsonParse    = bodyParser.json();
var mongoose     = require('mongoose');
var port         = 5000
var config       = require("./config/keys");

app.use(jsonParse);

app.listen(port,() => {
    console.log("Server running on port "+port)
})

//MONGOOSE CONNECTION
mongoose.connect(config.mongo_url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("mongoDB connected");
});

app.use("/wallet",require("./api/wallet"));