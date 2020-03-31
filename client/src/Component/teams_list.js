import React, { PureComponent } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from "react-bootstrap";
import {ListGroup} from "react-bootstrap";
import {ListGroupItem} from "react-bootstrap";
import {Button} from "react-bootstrap";
// import data from "./data";
import Toggle from './Toggle';
import font from '../App.css'



let number = 0;
const data =
{
  "0": "Rob D",
  "1": "John T",
  "2": "Balan S",
  "3": "Andrew F",
  "4": "Jon D",
  "5": "Richard H",
  "6": "Gary D",
  "7": "Mike S",
  "8": "Nikolas P",
  "9": "Morgenne B",
  "10": "Jeevan J",
  "100": "Leo H",
  "101": "Zeefa K",
  "102": "Vikas V",
  "103": "Pushpak K",
  "104": "Reenee H",
  "200": "Ron M",
  "201": "Kreishanth R",
  "202": "Yifei Z",
  "203": "Richard F",
  "204": "Alex W",
  "205": "Abdisalan A",
  "206": "Mathhew G",
  "207": "Brenton F",
  "208": "Wenbo H",
  "209": "Amy B",
  "210": "Francis S",
  "211": "Arshia M",
  "212": "Ben F",
  "213": "Nina Y",
  "214": "Ariel S",
  "215": "Yilun B",
  "216": "Max B",
  "217": "Dhruv J",
  "218": "Ali S",
  "219": "Jake V",
  "220": "Andrzej S",
  "221": "Danielle K"
};

class  Team extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      teamList: props.teamList,
      currentlyConnected: props.currentlyConnected,
      timeUsed: props.timeUsed
    };

    this.getTimerValue = this.getTimerValue.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    // console.log('***');
    // console.log(nextProps);
    return {
      teamList: nextProps.teamList,
      currentlyConnected: nextProps.currentlyConnected,
      timeUsed: nextProps.timeUsed
    };
  }

  getTimerValue(userId) {
    let currentTimeUsed = this.state.timeUsed.find(_ => _.name === data[userId]);
    if (currentTimeUsed) {
      return currentTimeUsed.time;
    } else {
      return 0;
    }
  }
    
 Handler = (name, value) => {
    // console.log(`the handler funciotn invoked with ${value}`);

    number = `${value}`
    this.props.using(number, data[name], name)
    
    };

    render(){  
    //  const teamMemebers = this.props.team.map(function (value ,i){
    //      return (
    //         <p>value</p>
    //      );
    //  });
    return (
      <div className = "Team "  >
       

        <Card style={{ width: '25rem' }}>
  {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
  <Card.Body>
 
    <Card.Title><h2>{this.props.name}</h2></Card.Title>
    <Card.Text>
  Total no.of hours used by team: 
    </Card.Text>
      
  </Card.Body>
  <ListGroup className="list-group-flush" >
            {
              this.state.teamList.sort((a, b) => {
                if (data[a] < data[b]) {
                  return -1;
                } else {
                  return 1;
                }
              }).map((userId) => {
                return (
                  <ListGroup.Item ><h4>{data[userId]} </h4> <Toggle toggled={this.state.currentlyConnected.find(_ => _.name === data[userId]) != null} time={this.getTimerValue(userId)} start={this.state.currentlyConnected.find(_ => _.name === data[userId]) != null ? this.state.currentlyConnected.find(_ => _.name === data[userId]).connectedSince : 0} Handler={this.Handler.bind(this, userId)} /></ListGroup.Item>
                );
              })
            }
    {/* <ListGroup.Item > {data[0]}<Toggle/> </ListGroup.Item> */}
    
    
  </ListGroup>
</Card>

       </div>
    );
  }
}
  
  export default Team;
  