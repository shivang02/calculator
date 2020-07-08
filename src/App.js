import React, { Component } from 'react';
import './App.css';
import Calculator from './components/Calculator';

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let [...h]= document.getElementsByClassName("key-button")
    h.map((eachButton)=> {
      eachButton.addEventListener("click",this.handleKeyPress);
    })
  }

  handleKeyPress =(e) =>{
    
  }
  render() {
    return (
      <div className="App">
        <Calculator />
      </div>
    );
    }
}

export default App;
