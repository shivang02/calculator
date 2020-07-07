import React, { Component } from 'react'

const newButtons= [
    {
        id:'zero',
        value:'0',
        name: '0'
    },
    {
        id:'one',
        value: '1',
        name: '1'
    },
    {
        id: 'two',
        value: '2',
        name: '2'
    },
    {
        id: 'three',
        value: '3',
        name: '3'
    },
    {
        id: 'four',
        value: '4',
        name: '4'
    },
    {
        id: 'five',
        value: '5',
        name: '5'
    },
    {
        id: 'six',
        value: '6',
        name: '6'
    },
    {
        id: 'seven',
        value: '7',
        name: '7'
    },
    {
        id: 'eight',
        value: '8',
        name: '8'
    },
    {
        id: 'nine',
        value: '9',
        name: '9'
    },
    {
        id: 'add',
        value: '+',
        name: '+'
    }, 
    {
        id: 'subtract',
        value: '-',
        name: '-'
    }, 
    {
        id: 'multiply',
        value: '*',
        name: 'X'
    }, 
    {
        id: 'divide',
        value: '/',
        name: '/'
    }, 
    {
        id: 'clear',
        value: '',
        name: 'AC'
    }, 
    {
        id: 'decimal',
        value: '.',
        name: '.'
    },
    {
        id:'equals',
        value: '=',
        name: '='
    } 
]

class KeyPad extends Component {
    
    CreateButton= () => {
        let data=[]
       newButtons.map((button) =>{
            return (
                data.push(<button id={button.id} value={button.id} className="key-button">{button.name}</button>)
            )
        })
        return data
    }

    render() {
        return (
            <div className="key-grid">
                {this.CreateButton()}
            </div>
        )
    }
}

export default KeyPad
