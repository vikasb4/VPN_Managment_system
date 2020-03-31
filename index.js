var express = require('express');
var app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let connectionsInUse = {
  Danielle: 0
};

io.on('connection', (socket) => {
  // Socket listener.
  socket.on('request', (data) => {
    try {
      if (connectionsInUse[data.user] != null) {
        delete connectionsInUse[data.user];
        io.sockets.emit('vpnDisconnect', data.user);
      } else {
        connectionsInUse[data.user] = data.index;
        io.sockets.emit('vpnConnect', data.user);
      }
      console.log(connectionsInUse);
    } catch (err) {
      console.log("Failed to update");
    }
  });

  // Initial connection.
  socket.emit('init', {
    users: connectionsInUse
  });
});

app.use(express.static(__dirname + '/client/build/'));

app.get('/api/currentUsers', (req, res, next) => {
  return res.send({
    users: connectionsInUse
  });
});

server.listen(3000);

