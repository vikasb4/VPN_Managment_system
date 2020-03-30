import React from 'react';
import logo from './logo.svg';
import './App.css';
import Team from './Component/teams_list'
import Countdown from 'react-countdown-now';
import Toggle from './Component/Toggle'

let count = 0

class App extends React.Component { 
  constructor(props) {
   
    super(props);
    this.state = { count:0
    };
  }

  using = number => {
    console.log(`the number ${number}`);
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
    
  <div className="column"><Team  name ="Pirates of KDC" time = "10 AM"  one = "0" two ="1" three ="2" four ="3" five ="4" six ="5" seven ="6" eight ="7" nine ="8" using = {this.using}/></div>
  
  <div className="column">  <Team name ="Pest CTRL" time = "12 AM" one = "9" two ="10" three ="11" four ="12" five ="13" six ="14" seven ="15" eight ="16" nine ="17" using = {this.using}/></div>
  
  <div className="column">  <Team name ="TAP" time = "1 PM" using = {this.using} /></div>
  
  <div className="column">  <Team name ="Dinosty" time = "3 PM" using = {this.using}/></div>
  </div>

  </div>
      
    
  );
}
}


export default App;
