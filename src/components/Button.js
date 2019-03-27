import React, { Component } from 'react';

class Button extends Component {
    render() {
        return (
        
                <li>A {this.props.animal.species} can be seen at {this.props.animal.last_seen_location} 
                <button>Delete Animal</button>
                 <p>It has been seen {this.props.animal.seen_count} times</p>
                 </li>

                
        )
    }
}

export default Button;