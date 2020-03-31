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
      currentConnections: []
    };
  }

  componentDidMount() {
    socket = io();
    socket.on('init', (data) => {
      console.log('init');
      const connectedUsers = [];
      for (let user in data.users) {
        connectedUsers.push(user);
      }
      this.setState({
        currentConnections: connectedUsers
      });
      console.log(this.state);
    });
    socket.on('vpnConnect', (data) => {
      console.log('Connected');
      console.log(data);
      const connections = this.state.currentConnections.concat([data]);
      this.setState({
        currentConnections: connections
      });
    });
    socket.on('vpnDisconnect', (data) => {
      console.log('Diconnected');
      console.log(data);
      const connections = this.state.currentConnections.filter(_ => _ != data);
      this.setState({
        currentConnections: connections
      });
    });
  }

  using = (number, name, index) => {
    console.log(`the number ${number}`);
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

  <h1>Total no.of vpns in use {this.state.count} </h1>

  <h1>available vpns:{this.state.count - 53 }</h1>


  <div className="row" align = "center">
    
  <div className="column"><Team name ="Pirates of KDC" teamList={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]} currentlyConnected={this.state.currentConnections} using = {this.using}/></div>
  
        {/* <div className="column">  <Team name="Pest CTRL" time="12 AM" teamList={[10, 11, 12, 13, 14, 15, 16, 17, 18, 19]} currentlyConnected={this.state.currentConnections} using = {this.using}/></div> */}
  
  {/* <div className="column">  <Team name ="TAP" time = "1 PM" using = {this.using} /></div> */}
  
  {/* <div className="column">  <Team name ="Dinosty" time = "3 PM" using = {this.using}/></div> */}
  </div>

  </div>
      
    
  );
}
}


export default App;
