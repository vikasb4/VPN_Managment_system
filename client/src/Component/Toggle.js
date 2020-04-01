import React, { PureComponent } from "react";
import Switch from "react-switch";
import ms from "pretty-ms";
let value = 0;

class Toggle extends PureComponent {
  
  constructor(props) {
    // console.log('$$$');
    // console.log(props);
    super(props);
    this.state = {
      checked: props.toggled,
      time: props.time,
      isOn: false,
      start: props.start,
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
    return {
      checked: nextProps.toggled,
      time: nextProps.time,
      start: nextProps.start,
    };
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

  formatTime(timeInMilis) {
    const seconds = Math.floor(timeInMilis / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
      return hours + 'h ' + (minutes % 60) + 'm';
    } else if (minutes > 0) {
      return minutes + 'm';
    } else if (seconds > 0) {
      return seconds + 's';
    } else {
      return '0s';
    }
  }

  getTimePassed() {
    // console.log('getTimePassed running');
    setTimeout(() => {
      this.setState({
        dummy: (this.state.dummy + 1) % 100
      });
    }, 1000);
    return new Date() - new Date(this.state.start);
  }

  render() {
    return (

      <div className = "Team " style={{ display: 'contents' }}>
        <Switch  onChange={this.handleChange} checked={this.state.checked} />
        <div><b> {this.formatTime(this.state.checked ? this.getTimePassed() + this.state.time : this.state.time)}</b></div>
       </div>
       

    );
  }
}
export default Toggle;