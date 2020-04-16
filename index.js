var express = require('express');
var app = express();
const server = require('http').createServer(app);

app.get('*', (req, res) => {
  return res.redirect('https://vpn-management-stable.azurewebsites.net/');
});

server.listen(process.env.PORT || 3000);