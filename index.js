var express = require('express');
var app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let dailyTimeUsed = {};
let connectionsInUse = {};

io.on('connection', (socket) => {
  // Socket listener.
  socket.on('request', (data) => {
    try {
      if (connectionsInUse[data.user] != null) {
        // Disconnect
        dailyTimeUsed[data.user] += new Date() - connectionsInUse[data.user];
        delete connectionsInUse[data.user];
        io.sockets.emit('vpnDisconnect', {
          user: data.user,
          timeUsed: dailyTimeUsed[data.user]
        });
      } else {
        // Connect
        dailyTimeUsed[data.user] = dailyTimeUsed[data.user] || 0;
        connectionsInUse[data.user] = new Date();
        io.sockets.emit('vpnConnect', {
          user: data.user,
          timeUsed: dailyTimeUsed[data.user]
        });
      }
      console.log(connectionsInUse);
      console.log(dailyTimeUsed);
    } catch (err) {
      console.log("Failed to update");
    }
  });

  // Initial connection.
  socket.emit('init', {
    users: connectionsInUse,
    timeUsed: dailyTimeUsed
  });
});

app.use(express.static(__dirname + '/client/build/'));

app.get('/api/currentUsers', (req, res, next) => {
  return res.send({
    users: connectionsInUse
  });
});

server.listen(3000);

