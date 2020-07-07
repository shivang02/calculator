import React, { Component } from 'react';
import './App.css';
import Calculator from './components/Calculator';

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    document.addEventListener("click",this.handleKeyPress)
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
