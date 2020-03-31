import React, { PureComponent } from "react";
import Switch from "react-switch";
import ms from "pretty-ms";
let value = 0;

class Toggle extends PureComponent {
  
  constructor(props) {
    // console.log(props);
    super(props);
    this.state = {
      checked: props.toggled,
      time: props.time,
      isOn: false,
      start: props.toggled ? Date.now() : 0,
      value: 0,
      timerValue: props.time,
      timer: null,
      dummy: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.starttimer = this.starttimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.getTimePassed = this.getTimePassed.bind(this)
   
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('---');
    // console.log(nextProps);
    // console.log(prevState);
    if (nextProps.toggled && !prevState.checked) {
      return {
        checked: nextProps.toggled,
        time: nextProps.time,
        start: Date.now()
      };
    } else {
      return {
        checked: nextProps.toggled,
        time: nextProps.time
      };
    }
  }
 
  handleChange(checked) {
    // console.log(this.state);
    this.setState({ checked});
    this.props.Handler(value);

  }
  resetTimer(checked) {
    // console.log("timerend")
    if (value>0)
    {
    value = value -1;
    }
    else{
      
    }
    // console.log(value)
    clearInterval(this.timer)
    this.timer = null;
    // this.setState({checked :false,isOn: false,value:value})
    // this.setState({checked :false , time: this.state.time,isOn: false})
    // this.timer = setInterval(() => this.setState({
    //   time: 0
    // }), 1); 
  }
  starttimer(checked) {
    // console.log("time Started")
    value = value + 1;
    // console.log(value);
    this.setState({
      start: Date.now(),
      value: value
    });
    this.timer = setInterval(() => {
      // console.log(this.state.timerValue);
      this.setState({
        timerValue: Date.now() - this.state.start + this.state.time
      });
    }, 1);
  }

  getTimePassed() {
    // console.log('getTimePassed running');
    setTimeout(() => {
      this.setState({
        dummy: this.state.dummy + 1
      });
    }, 1);
    return Date.now() - this.state.start;
  }

  render() {
    return (
      
      <div>
       <Switch onChange={this.handleChange}  checked={this.state.checked} />
    <b> {ms(this.state.checked ? this.getTimePassed() + this.state.time : this.state.time)}</b>
      
      </div> 
     
    );
  }
}
export default Toggle;