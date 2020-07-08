import React, { Component } from 'react'

class Display extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div className="display-container">
                <input readOnly className="mini-display" value={this.props.miniDisplay} />
                <input id="display" readOnly className="display" value={this.props.display} />
            </div>
        )
    }
}


export default Display
