import React, { PureComponent } from "react";
import Switch from "react-switch";
import ms from "pretty-ms";
let value = 0;

class Toggle extends PureComponent {
  
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      checked: props.toggled,
      time: 0,
      isOn: false,
      start: 0,
      value: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.starttimer = this.starttimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
   
  }

  static getDerivedStateFromProps(nextProps) {
    console.log('---');
    console.log(nextProps);
    return {
      checked: nextProps.toggled
    };
  }
 
  handleChange(checked) {
    this.setState({ checked});
    if(this.state.checked==true && this.state.isOn==false) {
      this.starttimer();
    }
    else(
      this.resetTimer()
    )
    this.props.Handler(value);

  }
  resetTimer(checked) {
    console.log("timerend")
    if (value>0)
    {
    value = value -1;
    }
    else{
      
    }
    console.log(value)
    clearInterval(this.timer)
    this.setState({checked :false,isOn: false,value:value})
    // this.setState({checked :false , time: this.state.time,isOn: false})
    // this.timer = setInterval(() => this.setState({
    //   time: 0
    // }), 1); 
  }
  starttimer(checked){
    console.log("time Started")
    if(value==value)
     value = value+1;
     console.log(value)
      this.setState({
        checked:true,
        time: this.state.time,
        start: Date.now() - this.state.time,
        isOn: true,
        value:value
      })
      this.timer = setInterval(() => this.setState({
        time: Date.now() - this.state.start
      }), 1); 
    }
  render() {
    let value1 = 2
    return (
      
      <div>
       <Switch onChange={this.handleChange}  checked={this.state.checked} />
    <b> {ms(this.state.time)}</b>
      
      </div> 
     
    );
  }
}
export default Toggle;