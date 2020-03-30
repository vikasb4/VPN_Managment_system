var express = require('express');
var app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let connectionsInUse = {};

io.on('connection', (socket) => {
  // Socket listener.
  socket.on('request', (data) => {
    try {
      if (connectionsInUse[data.user] != null) {
        delete connectionsInUse[data.user];
        io.sockets.emit('vpnDisconnect', data);
      } else {
        connectionsInUse[data.user] = data.index;
        io.sockets.emit('vpnConnect', data);
      }
      console.log(connectionsInUse);
    } catch (err) {
      console.log("Failed to update");
    }
  });

  // Initial connection.
  socket.emit('init', 'test');
});

app.use(express.static(__dirname + '/client/build/'));
server.listen(3000);

