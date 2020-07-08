import React, { Component } from 'react'
import KeyPad from './KeyPad'
import Display from "./Display"
import * as math from 'mathjs'





class Calculator extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
            display: 0,
            miniDisplay: 0,
            canOperator: false,
            canDecimal: true,
            newEvent: false,
            operatorBag: ''
        };
    }

    DisplayFormatter = (val) => {
        let currentDisplay = this.state.display;
        let prevDisplay = this.state.miniDisplay;
        let canOperator = this.state.canOperator;
        let canDecimal = this.state.canDecimal;
        let operatorBag = this.state.operatorBag


        switch (true) {
            case /\d/.test(val):
                if (this.state.newEvent == true) {
                    this.setState({
                        display: 0,
                        miniDisplay: 0,
                        canOperator: false,
                        canDecimal: true,
                        newEvent: false,
                        operatorBag: ''
                    });
                    currentDisplay = 0;
                    prevDisplay = 0;
                }
                if (/^[\+\-\*\/]$|^[\*\/]\-$/.test(operatorBag)) {
                    prevDisplay += operatorBag
                    operatorBag = ''
                }
                else if (/^[\*\/\-\+]{2,}$/.test(operatorBag)) {
                    prevDisplay += operatorBag[operatorBag.length - 1]
                    operatorBag = ''
                }
                if (currentDisplay !== 0 && /\d/.test(currentDisplay)) {
                    if (currentDisplay[0] != 0) {
                        currentDisplay += val;
                        prevDisplay += val;
                    }

                    this.setState({ canOperator: true });
                } else if (/[\+\-\*\/]/.test(currentDisplay)) {
                    currentDisplay = val
                    prevDisplay += currentDisplay;
                    this.setState({ canOperator: true });
                } else {
                    currentDisplay = val != 0 ? val : 0;

                    prevDisplay = currentDisplay;
                    this.setState({ canOperator: true });
                }
                break;
            case /[\+\-\*\/]/.test(val):
                if (this.state.newEvent == true) {
                    this.setState({
                        newEvent: false,
                        operatorBag: ''
                    });
                    prevDisplay = currentDisplay;
                    currentDisplay = 0;
                }
                if (canOperator && !/[\+\-\*\/]/.test(currentDisplay)) {

                    currentDisplay = val;
                    operatorBag += val
                    this.setState({
                        canOperator: true,
                        canDecimal: true
                    });
                } else if (canOperator && /[\+\-\*\/]/.test(currentDisplay)) {

                    currentDisplay += val;
                    operatorBag += val
                    this.setState({
                        canOperator: true,
                        canDecimal: true
                    });

                }
                break;
            case "." === val:
                if (canDecimal) {
                    currentDisplay += val;
                    prevDisplay += val;
                    this.setState({ canDecimal: false });
                }
                break;
            case " " === val:
                currentDisplay = 0;
                prevDisplay = 0
                this.setState({
                    display: 0,
                    miniDisplay: 0,
                    canOperator: false,
                    canDecimal: true,
                    newEvent: false,
                });
                break;
            case "=" === val:
                if (!/[\+\-\*\/]/.test(prevDisplay[prevDisplay.length - 1])) {
                    let answer = math.evaluate(prevDisplay);
                    prevDisplay = prevDisplay.concat("=").concat(answer.toString());
                    currentDisplay = answer;
                    this.setState({
                        newEvent: true
                    });
                }
        }
        this.setState({
            display: currentDisplay,
            miniDisplay: prevDisplay,
            operatorBag: operatorBag
        });
    };

    render() {
        return (
            <div className="calculator-box">
                <Display
                    display={this.state.display}
                    miniDisplay={this.state.miniDisplay}
                />
                <KeyPad handleKeyPress={(val) => this.DisplayFormatter(val)} />
            </div>
        );
    }
}
export default Calculator
