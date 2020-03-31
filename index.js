var express = require('express');
var app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let dailyTimeUsed = {};
let connectionsInUse = {};

let resetPromise;

function scheduleReset() {
  if (!resetPromise) {
    resetPromise = new Promise((resolve) => {
      const now = new Date();
      // Reset at midnight
      let resetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0) - now;
      if (resetDate < 0) {
        resetDate += 24 * 60 * 60 * 1000;
      }
      setTimeout(() => {
        console.log('Resetting daily values');
        resetPromise = null;
        for (let user in connectionsInUse) {
          connectionsInUse[user] = new Date();
        }
        dailyTimeUsed = {};
        resolve();
        scheduleReset();
      }, resetDate);
    });
  }
  return resetPromise;
}
scheduleReset();

function handleScheduledReset(socket) {
  return scheduleReset().then(() => {
    if (socket && socket.connected) {
      // Re-init on server reset
      socket.emit('init', {
        users: connectionsInUse,
        timeUsed: dailyTimeUsed
      });
      return handleScheduledReset(socket);
    }
  });
}

io.on('connection', (socket) => {
  handleScheduledReset(socket);

  // Socket listener.
  socket.on('request', (data) => {
    try {
      if (connectionsInUse[data.user] != null) {
        // Disconnect
        dailyTimeUsed[data.user] = dailyTimeUsed[data.user] != null ? dailyTimeUsed[data.user] + (new Date() - connectionsInUse[data.user]) : new Date() - connectionsInUse[data.user];
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
          timeUsed: dailyTimeUsed[data.user],
          start: connectionsInUse[data.user]
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

server.listen(process.env.PORT || 3000);

