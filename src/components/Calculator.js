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
            newEvent: false
        };
    }

    DisplayFormatter = (val) => {
        let currentDisplay = this.state.display;
        let prevDisplay = this.state.miniDisplay;
        let canOperator = this.state.canOperator;
        let canDecimal = this.state.canDecimal;
        if (this.state.newEvent == true) {
            this.setState({
                display: 0,
                miniDisplay: 0,
                canOperator: false,
                canDecimal: true,
                newEvent: false
            });
            currentDisplay = 0;
            prevDisplay = 0;
        }
        console.log(this.state.newEvent);

        console.log(val);
        switch (true) {
            case /\d/.test(val):
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
                if (canOperator && !/[\+\-\*\/]/.test(currentDisplay)) {

                    currentDisplay = val;
                    prevDisplay += val;
                    this.setState({
                        canOperator: true,
                        canDecimal: true
                    });
                } else if (canOperator && /[\+\-\*\/]/.test(currentDisplay)) {
                    if (val == '-') {
                        currentDisplay += val;
                        prevDisplay += val;
                        this.setState({
                            canOperator: true,
                            canDecimal: true
                        });
                    }
                    else {
                        currentDisplay = val;
                        prevDisplay = prevDisplay.slice(0, prevDisplay.length - 1) + val;
                        this.setState({
                            canOperator: true,
                            canDecimal: true
                        });
                    }
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
                    newEvent: false
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
            miniDisplay: prevDisplay
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
