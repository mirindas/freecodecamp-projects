import React from 'react';
import './App.css'

export default class AppV3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      break: 5,
      session: 25,
      timer: 1500,
      timerLabel: 'Session',
      timesRun: 1,
      isPaused: true
    };
  }

  componentDidMount() {
    if (!this.state.isPaused) {
      this.startInterval();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleBreak(e) {
    if(this.state.isPaused){
      if (e.target.value === "+" && this.state.break < 60) {
        this.setState({
          break: this.state.break + 1,
        });
      }
      if (e.target.value === "-" && this.state.break > 1) {
        this.setState({
          break: this.state.break - 1,
        });
      }
    }    
  }

  handleSession(e) {
    if(this.state.isPaused) {
      if (e.target.value === "+" && this.state.session < 60) {
        this.setState({
          session: this.state.session + 1,
          timer: (this.state.session + 1) * 60
        });
      }
      if (e.target.value === "-" && this.state.session > 1) {
        this.setState({
          session: this.state.session - 1,
          timer: (this.state.session - 1) * 60
        });
      }
   }
  }

  format(time) {
    let mins = ~~((time % 3600) / 60);
    let secs = ~~time % 60;
    let ret = "";
    ret += "" + ( time >= 3600 ? 60 : String(mins).padStart(2, '0') ) + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }

  startInterval() {
    this.interval = setInterval(this.timerCallback.bind(this), 1000);
  }

  timerCallback() {

    this.setState(prevState => ({
      timer: prevState.timer > 0 ? prevState.timer - 1 : 0,
    }));

    const { timer, timesRun } = this.state;

    // if timer reaches 0 move from session to break and vise versa
    if (timer === 0 ) {
      const beep = document.getElementById('beep');
      beep.currentTime = 0;
      beep.play();
      this.setState({
        timer: this.state.break * 60,
        timesRun: this.state.timesRun + 1,
        timerLabel: this.state.timesRun % 2 === 0 ? 'Session' : 'Break',
      });
    }
  }

  toggleTimer() {
    if (this.state.isPaused) {
      this.startInterval();
    } else {
      clearInterval(this.interval);
    }
    
    this.setState(prevState => ({
      isPaused: !prevState.isPaused
    }));
  }

  reset() {
    clearInterval(this.interval);
    const beep = document.getElementById('beep');
    beep.pause();
    beep.currentTime = 0;    
    this.setState({
      break: 5,
      session: 25,
      timer: 1500,
      timerLabel: 'Session',
      timesRun: 1,
      isPaused: true
    });
  }

  render() {
    return (
      <>
      <div id="container">
        <h1 className="text-center my-4">Fcc Pomodoro</h1>
        <div id="settings" className='d-flex flex-column flex-sm-row'>
          <div id="break-container" className='col-12 col-sm-6'>
            <div id="break-label" className='text-center fs-4'>Break Length</div>
            <div id="break" className='d-flex column justify-content-evenly align-items-center my-2'>
              <button id="break-decrement" className='btn btn-outline-light rounded-circle' onClick={this.handleBreak.bind(this)} value="-"><i className="fa-solid fa-minus" onClick={(e) => e.stopPropagation()}></i></button>
              <div id="break-length" className='fs-3'>{this.state.break}</div>          
              <button id="break-increment" className='btn btn-outline-light rounded-circle' onClick={this.handleBreak.bind(this)} value="+"><i className="fa-solid fa-plus"></i></button>
            </div>
          </div>
          
          <div id="session-container" className='col-12 col-sm-6'>
            <div id="session-label" className='text-center fs-4'>Session Length</div>
            <div id="session" className='d-flex column justify-content-evenly align-items-center my-2'>
              <button id="session-decrement" className='btn btn-outline-light rounded-circle' onClick={this.handleSession.bind(this)} value="-"><i className="fa-solid fa-minus"></i></button>
              <div id="session-length" className='fs-3'>{this.state.session}</div>
              <button id="session-increment" className='btn btn-outline-light rounded-circle' onClick={this.handleSession.bind(this)} value="+"><i className="fa-solid fa-plus"></i></button>
            </div>
          </div>
          </div>
          
          

          <div id="timer" className='d-flex flex-column align-items-center border border-2 rounded p-5 mt-4'>
            <div id="timer-label" className='fs-1 '>{this.state.timerLabel}</div>
            <div id="time-left" className='my-3'>{this.format(this.state.timer)}</div>
            
            <div className="buttons d-flex w-50 justify-content-center ">
              <button id="start_stop" className='btn btn-outline-light me-3' onClick={this.toggleTimer.bind(this)}>{this.state.isPaused ? <i className="fa-solid fa-play"></i> : <i className="fa-solid fa-pause"></i>}</button>
              <button id="reset" className='btn btn-outline-light' onClick={this.reset.bind(this)}><i className="fa-solid fa-rotate"></i></button>
            </div>
            
          </div>

          <div id="audio-file" className='d-none'>
            <audio id="beep" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
          </div>

        </div>
      </>
    );
  }
}