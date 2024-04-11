import React, {Component} from 'react'
import './App.css'

const endsWithOperator = /[*+-/]$/;
const endsWithNotMinus = /[*+/]$/;
const endsWithMinus = /-$/;
let isDisabled = false;

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      input: '0',
      prevInput: '',
      evaluation: true,
      operator: '',
      calculation: '',
    }

    this.manageNumber = this.manageNumber.bind(this);
    this.mananageOperator = this.mananageOperator.bind(this);
    this.manageDecimals = this.manageDecimals.bind(this);
    this.reset = this.reset.bind(this);
    this.calculateResult = this.calculateResult.bind(this);
    this.stateChecker = this.stateChecker.bind(this);
  }

  stateChecker(){
    console.log(this.state)
    console.log(this.state.input.split(/-=*\//))
  }
  
  manageNumber(e){
    const number = e.target.value;
    if(this.state.input.length < 21){
      this.setState({
        evaluation: false,
        input: this.state.input === '0' ? number : this.state.input.concat(number),
        calculation: this.state.input === '0' ? number : this.state.input.concat(number)
      })
    }
    if(this.state.evaluation){
      this.setState({
        evaluation: false,
        input: number
      })
    }
  }

  mananageOperator(e){    
    isDisabled = false;
    let lastChar = this.state.input.length > 0 ? this.state.input[this.state.input.length -1] : '';

    if(this.state.input.length > 0 && this.state.input !== 0 && this.state.input !== '0' && !endsWithOperator.test(this.state.input)  ){
      this.setState({
        evaluation: false,
        operator: e.target.value,
        prevInput: this.state.input,
        input: this.state.input + e.target.value,
        calculation: this.state.input + e.target.value,
      })
      lastChar = this.state.input && this.state.input[this.state.input.length -1];            
    }else if(endsWithOperator.test(lastChar)){  
      if (lastChar !== e.target.value) {
        this.setState({
          input: endsWithNotMinus.test(this.state.input) && e.target.value === '-' ? this.state.input + e.target.value : endsWithMinus.test(this.state.input) && e.target.value !== '-' ? this.state.input.slice(0, -2) + e.target.value : this.state.input.slice(0, -1) + e.target.value,
          calculation: this.state.input.slice(0, -1) + e.target.value,
          operator: e.target.value
        }) 
      }else{
        this.setState({
        input: this.state.input.slice(0, -1) + e.target.value,
        calculation: this.state.input.slice(0, -1) + e.target.value,
        operator: e.target.value
      }) 
      }       
    }
  } 

  manageDecimals(e){
    isDisabled = true;

    if(isDisabled){
      this.setState({
      input: this.state.input + e.target.value,
      evaluation: false
    })
    }
  }

  reset(){
    this.setState({
      input: '0',
      prevInput: '',
      evaluation: true,
      operator: '',
      calculation: '',
    })

    isDisabled = false;
  }

  calculateResult(){
    let lastChar = this.state.input && this.state.input[this.state.input.length -1];
    if( endsWithOperator.test(lastChar) ){
      this.setState({
        input: this.state.input.slice(0, -1).toString()
      })
    }
    this.setState({
      input: eval(this.state.input).toString(),
      evaluation: true,
      operator: ''
    })
  }

  render(){
    return (
      <>
      <div id="calculator" className='align-items-center'>
        <div id="display" className='rounded-1 p-2 mb-3 fs-2'>{this.state.input}</div>
        <div id="buttons" className='m-1'>
            <button id="clear" className='btn m-1' value='clear' onClick={this.reset}>AC</button>          
            <button id="subtract" className='btn btn-secondary custom-btn m-1' value='-' onClick={this.mananageOperator}>-</button>
            <button id="multiply" className='btn btn-secondary custom-btn m-1' value='*' onClick={this.mananageOperator}>*</button>
            <button id="divide" className='btn btn-secondary custom-btn m-1' value='/' onClick={this.mananageOperator}>/</button>
            <button id="seven" className='btn btn-secondary number custom-btn m-1' value='7' onClick={this.manageNumber}>7</button>
            <button id="eight" className='btn btn-secondary number custom-btn m-1' value='8' onClick={this.manageNumber}>8</button>
            <button id="nine" className='btn btn-secondary number custom-btn m-1' value='9' onClick={this.manageNumber}>9</button>
            <button id="four" className='btn btn-secondary number custom-btn m-1' value='4' onClick={this.manageNumber}>4</button>
            <button id="five" className='btn btn-secondary number custom-btn m-1' value='5' onClick={this.manageNumber}>5</button>
            <button id="six" className='btn btn-secondary number custom-btn m-1' value='6' onClick={this.manageNumber}>6</button>           
            <button id="one" className='btn btn-secondary number custom-btn m-1' value='1' onClick={this.manageNumber}>1</button>
            <button id="two" className='btn btn-secondary number custom-btn m-1' value='2' onClick={this.manageNumber}>2</button>
            <button id="three" className='btn btn-secondary number custom-btn m-1' value='3' onClick={this.manageNumber}>3</button>
            <button id="zero" className='btn btn-secondary number  zero m-1' value='0' onClick={this.manageNumber}>0</button>
            <button id="add" className='btn btn-secondary custom-btn m-1' value='+' onClick={this.mananageOperator}>+</button>            
            <button id="decimal" className='btn btn-secondary custom-btn m-1' value='.' disabled={isDisabled} onClick={this.manageDecimals} >.</button>            
            <button id="equals" className='btn btn-secondary custom-btn m-1' value='=' onClick={this.calculateResult}>=</button>
        </div>
      </div>

      <button onClick={this.stateChecker} className='d-none'>CHECK</button>
      </>
    )
  }  
}

