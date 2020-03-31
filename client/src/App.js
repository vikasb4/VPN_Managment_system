import React from 'react';
import logo from './logo.svg';
import './App.css';
import Team from './Component/teams_list'
import Countdown from 'react-countdown-now';
import Toggle from './Component/Toggle';
import io from 'socket.io-client';

let count = 0
var socket;

class App extends React.Component { 
  constructor(props) {
   
    super(props);
    this.state = {
      count:0,
      currentConnections: [],
      timeUsed: []
    };
  }

  componentDidMount() {
    socket = io();
    socket.on('init', (data) => {
      // console.log('init');
      // console.log(data);
      const connectedUsers = [];
      for (let user in data.users) {
        connectedUsers.push({
          name: user,
          connectedSince: data.users[user]
        });
      }
      const timeUsed = [];
      for (let user in data.timeUsed) {
        timeUsed.push({
          name: user,
          time: data.timeUsed[user]
        });
      }
      this.setState({
        currentConnections: connectedUsers,
        timeUsed: timeUsed
      });
      // console.log(this.state);
    });
    socket.on('vpnConnect', (data) => {
      // console.log('Connected');
      // console.log(data);
      const connections = this.state.currentConnections.concat([{
        name: data.user,
        connectedSince: data.start
      }]);
      const timeUsed = this.state.timeUsed.find(_ => _.name === data.user) != null ? this.state.timeUsed.map((tu) => {
        if (tu.name === data.user) {
          return {
            name: data.user,
            time: data.timeUsed
          };
        } else {
          return tu;
        }
      }) : this.state.timeUsed.concat([{
        name: data.user,
        time: data.timeUsed
      }]);
      this.setState({
        currentConnections: connections,
        timeUsed: timeUsed
      });
      // console.log(this.state);
    });
    socket.on('vpnDisconnect', (data) => {
      // console.log('Diconnected');
      // console.log(data);
      const connections = this.state.currentConnections.filter(_ => _.name != data.user);
      const timeUsed = this.state.timeUsed.find(_ => _.name === data.user) != null ? this.state.timeUsed.map((tu) => {
        if (tu.name === data.user) {
          return {
            name: data.user,
            time: data.timeUsed
          };
        } else {
          return tu;
        }
      }) : this.state.timeUsed.concat([{
        name: data.user,
        time: data.timeUsed
      }]);
      this.setState({
        currentConnections: connections,
        timeUsed: timeUsed
      });
      // console.log(this.state);
    });
  }

  using = (number, name, index) => {
    // console.log(`the number ${number}`);
    if (socket) {
      socket.emit('request', { user: name, index: index });
    }
    count = `${number}`
      this.setState({
        count:count
      })
    };
    handleKeyPress(event){
      event.preventDefault();
    }
    
    render(){
     
      
      return (




        <div className="App" >
          <h1>VPN MANAGMENT SYSTEM </h1>

          <h1>Total no.of vpns in use {this.state.currentConnections.length} </h1>

          <h1>available vpns:{58 - this.state.currentConnections.length}</h1>


          <div className="row" align="center">
            {/* <div className="column"><Team name="Priority 1" teamList={[0, 1]} currentlyConnected={this.state.currentConnections} timeUsed={this.state.timeUsed} using={this.using} /></div> */}

            <div className="column"><Team name="Priority 1" teamList={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} currentlyConnected={this.state.currentConnections} timeUsed={this.state.timeUsed} using={this.using} /></div>

            <div className="column">  <Team name="Priority 2" teamList={[100, 101, 102, 103, 104]} currentlyConnected={this.state.currentConnections} timeUsed={this.state.timeUsed} using={this.using} /></div>

            <div className="column">  <Team name="Priority 3" teamList={[200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221]} currentlyConnected={this.state.currentConnections} timeUsed={this.state.timeUsed} using = {this.using} /></div>

          </div>
        </div>
      );
    }
}


export default App;
