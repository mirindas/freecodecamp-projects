import React, {Component} from 'react'
import './App.css'

const content = [
  {
    key: 'Q',
    keyCode: 81,
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  },
  {
    key: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  },
  {
    key: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  },
  {
    key: 'A',
    id: 'Heater-4_1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  },
  {
    key: 'S',
    id: 'Heater-6',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  },
  {
    key: 'D',
    id: 'Dsc_Oh',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  },
  {
    key: 'Z',
    id: 'Kick_n_Hat',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  },
  {
    key: 'X',
    id: 'RP4_KICK_1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  },
  {
    key: 'C',
    id: 'Cev_H2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  }
];

export default class App extends React.Component {

  constructor(content){
    super(content)
    this.state = {
      drumName : ''
    }

    this.playDrum = this.playDrum.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress)
    document.addEventListener("keyup", this.handleKeyRelease)
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress)    
    document.addEventListener("keyup", this.handleKeyRelease)
  }

  handleKeyPress(e) {
    try {
      const audio = document.getElementById(String.fromCharCode(e.keyCode));
      audio.currentTime = 0;
      audio.play();
      audio.parentElement.classList.add('is-pressed');
      this.setState({
        drumName: audio.parentElement.getAttribute('id')
      })
    } catch (error) {}    
  }

  handleKeyRelease(e){
    const audio = document.getElementById(String.fromCharCode(e.keyCode));
    audio.parentElement.classList.remove('is-pressed');
  }

  playDrum(e) {
    const audio = document.getElementById(e.target.getAttribute('childid'));
    console.log(audio.parentElement)
    audio.currentTime = 0;
    this.setState({
      drumName: audio.parentElement.getAttribute('id')
    })   
    audio.play();
  }

  render() {
    return(
      <div id='drum-machine' className='d-flex m-auto flex-column'>
        <div id="display" className='m-auto mb-3 d-flex justify-content-center align-items-center'>{this.state.drumName}</div>
        <div id="drums" className='d-flex flex-wrap'>
        {content.map(({key,url,id},index)=>
          React.createElement("div", {
            className: 'drum-pad rounded-4 text-center d-flex align-items-center justify-content-center',
            id: id,
            childid: key,
            onClick: this.playDrum,        
        }, React.createElement("audio", {
            className: "clip",
            id: key,
            src: url
        }), key)
        )}   
        </div>
      </div>   
    )    
}
}