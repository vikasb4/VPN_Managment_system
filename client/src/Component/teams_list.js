import React, { PureComponent } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from "react-bootstrap";
import {ListGroup} from "react-bootstrap";
import {ListGroupItem} from "react-bootstrap";
// import data from "./data";
import Toggle from './Toggle';




let number = 0;
const data =
{
  "0": {name:"Rob D", email:"Rob_Dunollie@cooperators.ca "},
  "1": {name:"John T",email:"John_Tessaro@cooperators.ca"},
  "2": {name:"Balan S",email:"Balan_Sivanadian@cooperators.ca"},
  "3": {name:"Andrew F",email:"Andrew_Faires@cooperators.ca"},
  "4": {name:"Jon D",email:"Jon_Dearden@cooperators.ca"},
  "5": {name:"Richard H",email:"Richard_Hayes@cooperators.ca"},
  "6": {name:"Gary D",email:"Gary_Dhillon@cooperators.ca"},
  "7": {name:"Mike S",email:"Mike_Stronach@cooperators.ca"},
  "8": {name:"Sue T",email:"Sue_Try@cooperators.ca"},
 

  "10": {name:"Vrao P",email:"Vrao_Polavarapu@cooperators.ca"},
  "11": {name:"Shekin K",email:"Shekin_Kandathil@cooperators.ca"},
  
  "13": {name:"Renee H",email:"Renee_Hadenko@cooperators.ca"},
  "14": {name:"Owen L",email:"Owen_Li@cooperators.ca"},
  "15": {name:"Gary H",email:"Gary_Hemstock@cooperators.ca"},
  "16": {name:"Michelle L",email:"Michelle_Luu@cooperators.ca"},
  "17": {name:"Rob M",email:"Rob_Morrison@cooperators.ca"},
  "18": {name:"Ian R",email:"Ian_Richards@cooperators.ca"},
  "19": {name:"Linda N",email:"Linda_Ngo@cooperators.ca"},
  "20": {name:"Souvik D",email:"Souvik_Dutta@cooperators.ca"},
  "21": {name:"Sudhakar K ",email:"Sudhakar_Kakileti@cooperators.ca "},
  "22": {name:"Nelson F",email:"Nelson_Ferreira@cooperators.ca"},
  "23": {name:"Walter V",email:"Walter_Vereecken@cooperators.ca"},
  "24": {name:"Nashid F",email:"Nashid_Forbes@cooperators.ca"},
  "25": {name:"Paula R",email:"Paula_Randall_Perkins@cooperators.ca"},
  "26": {name:"Anthony R",email:"Anthony_Runstedler@cooperators.ca"},
  "27": {name:"Azim S",email:"Azim_Saiyed@cooperators.ca"},
  "28": {name:"Marinela B",email:"Marinela_Balazs@cooperators.ca"},
  "29": {name:"Rakesh B",email:"Rakesh_Bandlamudi@cooperators.ca"},
  "30": {name:"Eva S",email:"Eva_Skupiencooperators.ca"},
  "31": {name:"Aaron C",email:"Aaron_C@cooperators.ca"},
  "32": {name:"John P",email:"John_Peart@cooperators.ca"},


  "100": {name:"Ben F",email:"Ben_Finch@cooperators.ca"},
  "101": {name:"Nikolas P",email:"Nikolas_Pursiainen@cooperators.ca"},
  "102": {name:"Morgenne B",email:"Morgenne_Besenschek@cooperators.ca"},
  "103": {name:"Jeevan J",email:"Jeevan_Jassal@cooperators.ca"},
  "104": {name:"Leo H",email:"Leo_Heath@cooperators.ca"},
  "105": {name:"Zeefa K",email:"Zeefa_Karim@cooperators.ca"},
  "106": {name:"Vikas V",email:"Vikas_Vattikonda@cooperators.ca"},
  "107": {name:"Pushpak K",email:"Pushpak_Kurella@cooperators.ca"},
  "108": {name:"Steve K",email:"Steve_Kacheff@cooperators.ca"},
  "109": {name:"Leila J",email:"Leila_Joshua@cooperators.ca"},
  "110": {name:"Niki V",email:"Niki_Vegapaludi@cooperators.ca"},
  "111": {name:"Katrena M",email:"Katrena_Macke@cooperators.ca"},
  "112": {name:"Ariel S",email:"Ariel_Schwartz@cooperators.ca"},
  "113": {name:"Michelle C",email:"Michelle_Caravaggio@cooperators.ca"},
  "114": {name:"Yeri K",email:"Yeri_Kim@cooperators.ca"},
  "115": {name:"Craig S",email:"Craig_Smith@cooperators.ca"},
  "116": {name:"Corey G",email:"Corey_Guest@cooperators.ca"},
  "117": {name:"Pranav T",email:"Pranav_Tyagi@cooperators.ca"},
  "118": {name:"Luisa L",email:"Luisa_Lago@cooperators.ca"},
  "119": {name:"Katherine M",email:"Katherine_Meyer@cooperators.ca"},
  "120": {name:"May M",email:"May_May_So@cooperators.ca"},
  "121": {name:"Adriana B",email:"Adriana_Banica@cooperators.ca"},
  "122": {name:"Tatiana S",email:"Tatiana_Serguienko@cooperators.ca"},
  "123": {name:"Nikunj P",email:"Nikunj_Patel@cooperators.ca"},
  "124": {name:"Harkirat G",email:"Harkirat_Ghotra@cooperators.ca"},
  "125": {name:"Gagandeep K",email:"Gagandeep_Kaur@cooperators.ca"},
  "126": {name:"Charlie T",email:"Charlie_Teece@cooperators.ca"},
  "127": {name:"Paul H",email:"Paul_Hoy@cooperators.ca"},
  "128": {name:"Jeff G",email:"Jeff_Grimes@cooperators.ca"},
  "129": {name:"Danielle K",email:"Danielle_Kacheff@cooperators.ca"},
  "130": {name:"Ali S",email:"Ali_Sadri@cooperators.ca"},
  "131": {name:"Dimitri F",email:"Dimitri_Frederick@cooperators.ca"},
  
  "132": {name:"Alan J",email:"Alan_Judi@cooperators.ca"},
  "133": {name:"Tyler C",email:"Tyler_Cote@cooperators.ca"},
  "134": {name:"Michael A",email:"Michael_Aushana@cooperators.ca"},
  "135": {name:"Patrick T",email:"Patrick_Telfer@cooperators.ca"},
  "136": {name:"Usman A",email:"Usman_Arshad@cooperators.ca"},
  "137": {name:"Venkata V",email:"Venkata_Vinjamuri@cooperators.ca"},
  "138": {name:"Ramandeep S ",email:"Ramandeep_Singh@cooperators.ca"},
  "139": {name:"Monica T",email:"Monica_Turrill@cooperators.ca"},
  "140": {name:"Shwinky S",email:"Shwinky_Sood@cooperators.ca"},
  "141": {name:"John Q",email:"John_Quinsay@cooperators.ca"},
  "142": {name:"Jared S",email:"Jared_Saunders@cooperators.ca"},
  "143": {name:"Jordan F",email:"Jordan_Forsyth@cooperators.ca"},
  "144": {name:"Andrew W",email:"Andrew_Wighton@cooperators.ca"},
  "145": {name:"Jakob B",email:"Jakob_Braga@cooperators.ca"},
  "146": {name:"Jake J ",email:"Jake_Janzen@cooperators.ca"},
  "147": {name:"Sheri A",email:"Sheri_Arndt@cooperators.ca"},
  "148": {name:"Varghese E",email:"Varghese_Easo@cooperators.ca"},
  "149": {name:"Marcus K",email:"Marcus_Kruger@cooperators.ca"},
  "150": {name:"Helene A",email:"Helene_Arbour@cooperators.ca"},
  "151": {name:"Kishan S",email:"Kishan_Sirivolu@cooperators.ca"},
  "152": {name:"Tri M",email:"Tri_Magpali@cooperators.ca"},
  "153": {name:"Brenton F",email:"Brenton_Fairless@cooperators.ca"},

  "200": {name:"Ron M",email:"Ron_Mooibroek@cooperators.ca"},
  "201": {name:"Kreishanth R",email:"Kreishanth_Raveindiraseelan@cooperators.ca"},
  "202": {name:"Yifei Z",email:"Yifei_Zhang@cooperators.ca"},
  "203":{name: "Richard F",email:"Richard_Fu@cooperators.ca"},
  "204": {name:"Alex W",email:"Alex_Wong@cooperators.ca"},
  "205": {name:"Abdisalan A",email:"Abdisalan_Abdi@cooperators.ca"},
  "206": {name:"Mathhew G",email:"Matthew_Gottwald@cooperators.ca"},
  "207": {name:"",email:""},
  "208": {name:"Wenbo H",email:"Wenbo_Han@cooperators.ca"},
  "209": {name:"Amy B",email:"Amy_Barrett@cooperators.ca"},
  "210":{name:"Francis S",email:"Francis_Sun@cooperators.ca"},
  "211": {name:"Arshia M",email:"Arshia_Mathur@cooperators.ca"},
  
  "213": {name:"Nina Y",email:"Nina_Yang@cooperators.ca"},
  "214": {name:"Tim G",email:"Tim_Gapakov@cooperators.ca"},
  "215": {name:"Yilun B",email:"Yilun_Bai@cooperators.ca"},
  "216": {name:"Max B",email:"Max_Barltrop@cooperators.ca"},
  "217": {name:"Dhruv J",email:"Dhruv_Jain@cooperators.ca"},
  "219": {name:"Jake V",email:"Jake_Verslype@cooperators.ca"},
  "220": {name:"Andrzej S",email:"Andrzej_Sienkiewicz@cooperators.ca"},
  "221": {name:"Jeremy W",email:"Jeremy_Weber@cooperators.ca"},
  
  
  "224": {name:"Trisha B",email:"Trisha_Balkissoon@cooperators.ca"},
  "225": {name:"Suresh O",email:"Suresh_Ommi@cooperators.ca"},
  "226": {name:"Aruanva M",email:"Aruanva_Mandal@cooperators.ca"},
  "227": {name:"Shibin P",email:"Shibin_Paravetty@cooperators.ca"},
  "228": {name:"Cheng X",email:"Cheng_Xi@cooperators.ca"},
  "229": {name:"Guy L",email:"Guy_Lauren@cooperators.ca"},
  "230": {name:"Cindy R",email:"Cindy_Ramackers@cooperators.ca"},
  "231": {name:"Suyog J",email:"Suyog_Joshi@cooperators.ca"},
  "232": {name:"Smitha P",email:"Smitha_Prasad@cooperators.ca"},
  "233": {name:"Guru I",email:"Guru_Inamdar@cooperators.ca"},
  "234": {name:"Denise B",email:"Denise_Balkissoon@cooperators.ca"},
  "235": {name:"Lesley F",email:"Lesley_Fairbairn@cooperators.ca"},
  "236": {name:"Cheri D",email:"Cheri_Davidson@cooperators.ca"},
  "237": {name:"Amandeep P",email:"Amandeep_Paul@cooperators.ca"},
  "238": {name:"Ashraf H",email:"Ashraf_Haddad@cooperators.ca"},
  "239": {name:"Steve M",email:"Steve_McPhee@cooperators.ca"},
  "240": {name:"James W",email:"James_Wu@cooperators.ca"},
  
  "242": {name:"Heather M",email:"Heather_McKean@cooperators.ca"},
  "243": {name:"Shaheel A",email:"Shaheel_Ali@cooperators.ca"},
  "244": {name:"Zankhana B",email:"Zankhana_Bavishi@cooperators.ca"},
  "245": {name:"Nicole M",email:"Nicole_MacLean@cooperators.ca"},
  "246": {name:"Mariya C",email:"Mariya_Calcuttawala@cooperators.ca"},
  "247": {name:"Martin F",email:"Martin_Fielding@cooperators.ca"},
  "248": {name:"Mahavir S",email:"Mahavir_Sogarwal@cooperators.ca"},
  "249": {name:"Gundeep V",email:"Gundeep_Vohra@cooperators.ca"},
  "250": {name:"Kanwardeep G",email:"Kanwardeep_Gill@cooperators.ca"},
  "251": {name:"Srikanth T",email:"Srikanth_Thota@cooperators.ca"},
  "252": {name:"Naga P",email:"Naga_Penneru@cooperators.ca"},
  "253": {name:"Raja B",email:"Raja_Boppana@cooperators.ca"},
  "254": {name:"Jagjit G",email:"Jagjit_Gill@cooperators.ca"},
  "255": {name:"Subra S",email:"Subra_Swarnan@cooperators.ca"},
  "256": {name:"Stephanie C",email:"Stephanie_Crumb@cooperators.ca"},
  "257": {name:"Nick P",email:"Nick_Petropoulos@cooperators.ca"},
  "258": {name:"Adriana H",email:"Adriana_Horne@cooperators.ca"},
  "259": {name:"Dianna C",email:"Dianna_Chan@cooperators.ca"},
  "260": {name:"Imran A",email:"Imran_Arshid@cooperators.ca"},
  "261": {name:"Devaraj B",email:"Devaraj_Bojan@cooperators.ca"},
  "262": {name:"Kiran K",email:"Kiran_Kumar@cooperators.ca"},
  "264": {name:"Ravi K",email:"Ravi_Kambo@cooperators.ca"},
  "265": {name:"Ashleigh B",email:"Ashleigh_Bogart@cooperators.ca"},
  "266": {name:"Sue T",email:"Sue_Try@cooperators.ca"},
  "267": {name:"Allen Z",email:"Allen_Zhang@cooperators.ca"},
  "268": {name:"Vrao P",email:"Vrao_Polavarapu@cooperators.ca"},
  "269": {name:"Irene S",email:"Irene_Scutcher@cooperators.ca"},
  "270": {name:"Sue T",email:"Sue_Try@cooperators.ca"},

  
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
    let currentTimeUsed = this.state.timeUsed.find(_ => _.name === data[userId].name);
    if (currentTimeUsed) {
      return currentTimeUsed.time;
    } else {
      return 0;
    }
  }
    
 Handler = (Userid, value) => {
    // console.log(`the handler funciotn invoked with ${value}`);

    number = `${value}`
    this.props.using(number, data[Userid].name, data[Userid].email)
    
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
    <Card.Title ><b><h3>Connected Users:{
      this.state.teamList.map ((userId) => {
        return this.state.currentlyConnected.find(_ => _.name === data[userId].name) != null ? 1 : 0 ;
      }).reduce((a,b) => {

        return a+b ;

      })
      }</h3></b></Card.Title>
    
  
      
  <div >
  <ListGroup  >
            {
              this.state.teamList.sort((a, b) => {
                if (data[a].name  < data[b].name) {
                  return -1;
                } else {
                  return 1;
                }
              }).map((userId) => {
                return (
                  <ListGroup.Item style={{height: '5rem', padding: '0px'}}><label style={{fontSize: '2rem', marginBottom: '0px'}}>{data[userId].name}</label> <Toggle toggled={this.state.currentlyConnected.find(_ => _.name === data[userId].name) != null} time={this.getTimerValue(userId)} start={this.state.currentlyConnected.find(_ => _.name === data[userId].name) != null ? this.state.currentlyConnected.find(_ => _.name === data[userId].name).connectedSince : 0} Handler={this.Handler.bind(this, userId)} /></ListGroup.Item>
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
  