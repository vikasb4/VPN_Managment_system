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
  "8": "Sue T",
  "9": "Allen Z",
  "10": "Vrao P",
  "11": "Shekin K",
  "12": "Irene S",
  "13": "Renee H",
  "14": "Owen L",
  "15": "Gary H",
  "16": "Michelle L",
  "17": "Rob M",
  "18": "Ian R",
  "19": "Linda N",
  "20": "Souvik D",
  "21": "Sudhakar K ",
  "22": "Nelson F",
  "23": "Walter V",
  "24": "Nashid F",
  "25": "Paula R",
  "26": "Anthony R",
  "27": "Azim S",
  "28": "Marinela B",

  "100": "Ben F",
  "101": "Nikolas P",
  "102": "Morgenne B",
  "103": "Jeevan J",
  "104": "Leo H",
  "105": "Zeefa K",
  "106": "Vikas V",
  "107": "Pushpak K",
  "108": "Steve K",
  "109": "Leila J",
  "110": "Niki V",
  "111": "Katrena M",
  "112": "Ariel S",
  "113": "Michelle C",
  "114": "Yeri K",
  "115": "Craig S",
  "116": "Corey G",
  "117": "Pranav T",
  "118": "Luisa L",
  "119": "Katherine M",
  "120": "May M",
  "121": "Adriana B",
  "122": "Tatiana S",
  "123": "Nikunj P",
  "124": "Harkirat G",
  "125": "Gagandeep K",
  "126": "Charlie T",
  "127": "Paul H",
  "128": "Jeff G",
  "129": "Danielle K",
  "130": "Ali S",
  "131": "Paula R",
  "132": "Alan J",
  "133": "Tyler C",
  "134": "Michael A",
  "135": "Patrick T",
  "136": "Usman A",
  "137": "Venkata V",
  "138": "Ramandeep S ",
  "139": "Monica T",
  "140": "Shwinky S",
  "141": "John Q",
  "142": "Jared S",
  "143": "Jordan F",
  "144": "Andrew W",
  "145": "Jakob B",
  "146": "Jake J ",
  "147": "",

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
  
  "213": "Nina Y",
  "214": "Tim G",
  "215": "Yilun B",
  "216": "Max B",
  "217": "Dhruv J",
  "218": "Imran A",
  "219": "Jake V",
  "220": "Andrzej S",
  "221": "Jeremy W",
  "222": "Martin F",
  "223": "Ashleigh B",
  "224": "Trisha B",
  "225": "Suresh O",
  "226": "Aruanva M",
  "227": "Shibin P",
  "228": "Cheng X",
  "229": "Guy L",
  "230": "Cindy R",
  "231": "Suyog J",
  "232": "Smitha P",
  "233": "Guru I",
  "234": "Denise B",
  "235": "Lesley F",
  "236": "Cheri D",
  "237": "Amandeep P",
  "238": "Ashraf H",
  "239": "Steve M",
  "240": "James W",
  "241": "Paul H",
  "242": "Heather M",
  "243": "Shaheel A",
  "244": "Zankhana B",
  "245": "Nicole M",
  "246": "Mariya C",
  "247": "Martin F",
  "248": "Mahavir S",
  "249": "Gundeep V",
  "250": "Kanwardeep G",
  "251": "Srikanth T",
  "252": "Naga P",
  "253": "Raja B",
  "254": "Jagjit G",
  "255": "Subra S",
  "256": "Stephanie C"

  
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
       

        <Card border="dark"  style={{ width: '25rem' }}>
  <Card.Body>
 
    <Card.Title ><b><h2>{this.props.name}</h2></b></Card.Title>
      
  <div >
  <ListGroup  >
            {
              this.state.teamList.sort((a, b) => {
                if (data[a] < data[b]) {
                  return -1;
                } else {
                  return 1;
                }
              }).map((userId) => {
                return (
                  <ListGroup.Item style={{height: '5rem', padding: '0px'}}><label style={{fontSize: '2rem', marginBottom: '0px'}}>{data[userId]}</label> <Toggle toggled={this.state.currentlyConnected.find(_ => _.name === data[userId]) != null} time={this.getTimerValue(userId)} start={this.state.currentlyConnected.find(_ => _.name === data[userId]) != null ? this.state.currentlyConnected.find(_ => _.name === data[userId]).connectedSince : 0} Handler={this.Handler.bind(this, userId)} /></ListGroup.Item>
                );
              })
            }
    {/* <ListGroup.Item > {data[0]}<Toggle/> </ListGroup.Item> */}
    
    
  </ListGroup>
  </div>
  </Card.Body>
</Card>

       </div>
    );
  }
}
  
  export default Team;
  