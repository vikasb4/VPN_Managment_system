var express = require('express');
var app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const xoauth2 = require('xoauth2');
var nodemailer = require('nodemailer');
require('dotenv').config();

let dailyTimeUsed = {};
let connectionsInUse = {};


let resetPromise;



function scheduleReset() {
  if (!resetPromise) {
    resetPromise = new Promise((resolve) => {
      const now = new Date();
      // Reset at midnight
      const resetHour = Number(process.env.RESET_HOUR) || 0;
      const resetMinute = Number(process.env.RESET_MINUTE) || 0;
      const resetSecond = Number(process.env.RESET_SECOND) || 0;
      let resetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), resetHour, resetMinute, resetSecond, 0);
      let h = resetDate.getHours() < 10 ? '0' + resetDate.getHours() : resetDate.getHours();
      let m = resetDate.getMinutes() < 10 ? '0' + resetDate.getMinutes() : resetDate.getMinutes();
      let s = resetDate.getSeconds() < 10 ? '0' + resetDate.getSeconds(): resetDate.getSeconds();
      console.log('Scheduling reset for ' + h + ':' + m + ':' + s);
      resetInMs = resetDate - now;
      if (resetInMs < 0) {
        resetInMs += 24 * 60 * 60 * 1000;
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
      }, resetInMs);
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
function sendEmail(email,status){

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
      port: 465,
      secure: true,
    auth: {
      
        user: process.env.EMAIL,
        pass:process.env.PASSWORD
      
      
    }
  });
  
  let mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'VPN Management Tool',
    text: status
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
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
        sendEmail( data.email,'You have been marked as disconnected from the VPN.Click on the link: https://vpn-management.azurewebsites.net/')
      } 
      else {

        
        // Connect
        dailyTimeUsed[data.user] = dailyTimeUsed[data.user] || 0;
        connectionsInUse[data.user] = new Date();
        io.sockets.emit('vpnConnect', {
          user: data.user,
          timeUsed: dailyTimeUsed[data.user],
          start: connectionsInUse[data.user]
          
        });
        console.log(data)
        sendEmail( data.email,'You have been marked as connected to the VPN.Click on the link: https://vpn-management.azurewebsites.net/')
      }
      console.log(connectionsInUse);
      console.log(dailyTimeUsed)
     
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

