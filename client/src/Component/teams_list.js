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
  "0": "Danielle",
  "1": "Ali",
  "2": "Zeefa",
  "3": "Leo",
  "4": "Vikas",
  "5": "Ariel",
  "6": "Matt",
  "7": "Wenbo",
  "8": "Ben",
  "9": "Pushpak",
  "10": "Amy",
  "11": "Nina",
  "12": "Krish",
  "13": "Arisha",
  "14": "Richard",
  "15": "Max",
  "16": "Andrej",
  "17": "Dhruv",
  "18": "Ron",
  "19": "Brenton",
  "20": "Jake",
  "21": "",
  "22": "",
  "23": "",
  "24": "",
};

class  Team extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      teamList: props.teamList,
      currentlyConnected: props.currentlyConnected
    };
  }

  static getDerivedStateFromProps(nextProps) {
    console.log('***');
    console.log(nextProps);
    return {
      teamList: nextProps.teamList,
      currentlyConnected: nextProps.currentlyConnected
    };
  }
    
 Handler = (name, value) => {
    console.log(`the handler funciotn invoked with ${value}`);

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
              this.state.teamList.map((userIndex) => {
                return (
                  <ListGroup.Item ><h4>{data[userIndex]} </h4> <Toggle toggled={this.state.currentlyConnected.includes(data[userIndex])} Handler={this.Handler.bind(this, userIndex)} /></ListGroup.Item>
                );
              })
            }
    {/* <ListGroup.Item > {data[0]}<Toggle/> </ListGroup.Item> */}
    
    
  </ListGroup>
  <Card.Body>
      <Button>Need VPN for Emergency </Button>
    {/* <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link> */}
   
  </Card.Body>
</Card>

       </div>
    );
  }
}
  
  export default Team;
  