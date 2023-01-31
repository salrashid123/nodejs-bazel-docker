const http = require("http")
const express = require("express")

const port = 8080;
const app = express();

options = {}
app.get('/', function (req, res) {
  console.log('got request')
  res.writeHead(200);
  res.end(`ok\n`);
})
console.log("starting server");
http.createServer(options, app).listen(port);
