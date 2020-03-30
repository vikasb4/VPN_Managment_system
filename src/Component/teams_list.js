import React, { PureComponent } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from "react-bootstrap";
import {ListGroup} from "react-bootstrap";
import {ListGroupItem} from "react-bootstrap";
import {Button} from "react-bootstrap";
import data from "./data";
import Toggle from './Toggle';
import font from '../App.css'



let number = 0 

class  Team extends PureComponent{
    
 Handler = value => {
    console.log(`the handler funciotn invoked with ${value}`);

    number = `${value}`
    this.props.using(number)
    
    };



    render(){  

      
      

        const data = [
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
              "9":"Pushpak",
              "10":"Amy",
              "11":"Nina",
              "12":"Krish",
              "13":"Arisha",
              "14":"Richard",
              "15":"Max",
              "16":"Andrej",
              "17":"Dhruv",
              "18":"Ron",
              "19":"Brenton",
              "20":"Jake",
              "21":"",
              "22":"",
              "23":"",
              "24":"",
            },
          ];
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
    {data.map(item => { return <ListGroup.Item ><h4>{item [this.props.one]} </h4> <Toggle Handler = {this.Handler}/></ListGroup.Item>})}
    {data.map(item => { return <ListGroup.Item ><h4>{item [this.props.two]}</h4><Toggle Handler = {this.Handler}/> </ListGroup.Item>})}
    {data.map(item => { return <ListGroup.Item ><h4>{item [this.props.three]}</h4><Toggle Handler = {this.Handler}/> </ListGroup.Item>})}
    {data.map(item => { return <ListGroup.Item ><h4>{item [this.props.four]}</h4><Toggle Handler = {this.Handler}/> </ListGroup.Item>})}
    {data.map(item => { return <ListGroup.Item ><h4>{item [this.props.five]}</h4><Toggle Handler = {this.Handler}/> </ListGroup.Item>})}
    {data.map(item => { return <ListGroup.Item ><h4>{item [this.props.six]}</h4><Toggle Handler = {this.Handler}/> </ListGroup.Item>})}
    {data.map(item => { return <ListGroup.Item ><h4>{item [this.props.seven]}</h4><Toggle Handler = {this.Handler}/> </ListGroup.Item>})}
    {data.map(item => { return <ListGroup.Item ><h4>{item [this.props.eight]}</h4><Toggle Handler = {this.Handler}/></ListGroup.Item>})}
    {data.map(item => { return <ListGroup.Item ><h4>{item [this.props.nine]}</h4><Toggle Handler = {this.Handler}/> </ListGroup.Item>})}

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
  