import React, { Component } from 'react'
import KeyPad from './KeyPad'
import Display from "./Display"

class Calculator extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
             display:'',
             miniDisplay:''
        }
    }

    DisplayFormatter =() =>{

    }

    MiniDisplayFormatter =() =>{

    }

    render() {
        return (
            <div className="calculator-box">
                <Display values={this.state} DisplayFormatter={this.DisplayFormatter} MiniDisplayFormatter={this.MiniDisplayFormatter }/>
                <KeyPad />
            </div>
        )
    }
}

export default Calculator
