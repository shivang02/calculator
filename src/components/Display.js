import React, { Component } from 'react'

class Display extends Component {
    constructor(props) {
        super(props)
    
    }
    
    render() {
        return (
            <div className="display-container">
                <input readOnly className="mini-display" value={this.props.values.miniDisplay} />
                <input readOnly className="display" value={this.props.values.Display} />
            </div>
        )
    }
}

export default Display
