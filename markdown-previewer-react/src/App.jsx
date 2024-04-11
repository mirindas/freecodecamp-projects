import React, {Component} from 'react'
import './App.css'
import ReactMarkdown from 'react-markdown'

const markdownText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... **_both!_**

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

![React Logo w/ Text](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png)

- And of course there are lists.
  - Some are bulleted.
      - With different indentation levels.
        - That look like this.
`;


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userInput : markdownText,
    }
    this.onEditorChange = this.onEditorChange.bind(this);
  }

  onEditorChange(e){
    this.setState({
      userInput: e.target.value
    })
  };

  render(){
    return(
      <div>
      <h1 className='text-center'>Markdown Previewer FCC</h1> 
        <div className="App">
        <div  className='w-100 m-auto my-4'>
            <textarea
            name="editor"
            id="editor"
            onChange={this.onEditorChange}
            value={this.state.userInput}
          >
          </textarea>
        </div>
        
        <div id="preview" className='w-100 m-auto'><ReactMarkdown>{this.state.userInput}</ReactMarkdown></div>
        </div>
      </div>
    )
  }
}
