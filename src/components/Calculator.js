import React, { Component } from 'react'
import KeyPad from './KeyPad'
import Display from "./Display"
import * as math from 'mathjs'

class Calculator extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
             display:'0',
             miniDisplay:'0',
             canOperator: false,
             canDecimal:true,
             newEvent:false
        }
    }

    DisplayFormatter =(val) =>{
        let currentDisplay = this.state.display
        let prevDisplay = this.state.miniDisplay
        let canOperator=this.state.canOperator
        let canDecimal= this.state.canDecimal
        if(this.state.newEvent==true) {
            this.setState({
                display: '0',
                miniDisplay: '0',
                canOperator: false,
                canDecimal: true,
                newEvent: false
            })
            currentDisplay = '0'
            prevDisplay = '0'
        }
        console.log(this.state.newEvent)
        
        console.log(val)
        switch(true) {
            case /\d/.test(val) :
                if (currentDisplay !== '0' && (/\d/.test(currentDisplay))){
                    prevDisplay+=val
                    currentDisplay+=val
                   this.setState({canOperator:true})
                }
                else if ((/[\+\-\*\/]/.test(currentDisplay))) {
                    currentDisplay=val
                    prevDisplay += currentDisplay
                    this.setState({ canOperator: true })
                }
                else {
                    currentDisplay=val
                    prevDisplay = currentDisplay
                    this.setState({canOperator:true})
                }
            break
            case /[\+\-\*\/]/.test(val) :
                if (canOperator&&!(/[\+\-\*\/]/.test(currentDisplay))) {      //meaning the penultimate character was not an operator
                    currentDisplay=val
                    prevDisplay+=val
                    this.setState({
                        canOperator:true,
                        canDecimal:true
                    })
                }
                else if (canOperator && (/[\+\-\*\/]/.test(currentDisplay))) {
                    currentDisplay=val
                    prevDisplay=prevDisplay.slice(0,prevDisplay.length-1)+val
                    this.setState({
                        canOperator: true,
                        canDecimal: true
                    })
                }
            break
            case'.'===val :
                if(canDecimal){
                    currentDisplay += val
                    prevDisplay+=val
                    this.setState({canDecimal:false})
                }
            break
            case " " ===val :
                currentDisplay='0'
                prevDisplay='0'
                this.setState({display:currentDisplay})
            break
            case "=" ===val :
                if (!(/[\+\-\*\/]/.test(prevDisplay[prevDisplay.length - 1]))) {
                    prevDisplay=math.evaluate(prevDisplay)
                    currentDisplay = math.evaluate(prevDisplay)
                    this.setState({
                        newEvent:true
                    })
                }
        }
        this.setState({
            display:currentDisplay,
            miniDisplay:prevDisplay
        })

    }

    render() {
        return (
            <div className="calculator-box">
                <Display display={this.state.display} miniDisplay={this.state.miniDisplay}/>
                <KeyPad handleKeyPress={(val) =>this.DisplayFormatter(val)}/>
            </div>
        )
    }
}


export default Calculator
