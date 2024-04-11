import React, {Component} from 'react'

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      quote: 'Well begun is half done.',
      author: 'Aristotle'
    }
    this.generateQuote = this.generateQuote.bind(this)
  }

  generateQuote() {
    fetch('https://api.quotable.io/random')
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{      
      if(data.content.length < 100){        
        this.setState({
          quote:  data.content,
          author: data.author
        })
      }else{
        this.generateQuote()
      }      
    })
  }

  render(){
    return (
      <div className='vw-100 vh-100 row p-0 m-0'>
      <div id="quote-box" className='col-10 col-sm-8 col-lg-7 col-xl-6 col-xxl-4 mx-auto p-5 rounded text-center my-auto'>
        
        <p id="text" className='py-3 px-3 px-lg-5 w-100 fs-3'>"{this.state.quote}"</p>
       
        <p id="author" className='fst-italic text-end fs-5'>{this.state.author}</p>
       
        <div className="button-box">
            <button
              id="new-quote"
              onClick={this.generateQuote}
              className="btn btn-b mx-1"
              target="_blank"
            >
              New Quote
            </button>
            <a
              href={"https://twitter.com/intent/tweet?hastags=quotes&related=freeCodeCamp&text="+this.state.quote+'&author'+this.state.author}
              id="tweet-quote"
              className="btn btn-b mx-1"
              target="_blank"
              title='Tweet Quote'
            >
              <i className="fa-brands fa-x-twitter"></i>
            </a>
          </div>
      </div>
      </div>
    )
  }
}
