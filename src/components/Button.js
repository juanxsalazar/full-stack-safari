import React, { Component } from 'react';
import axios from 'axios'
class Button extends Component {

    delete = () => {
axios.delete(`http://localhost:3000/animals/${this.props.animal.id}`)
.then(response => {
this.props.getAllTheAnimal()
 })
}

    render() {
        return (
        
                <li>A {this.props.animal.species} can be seen at {this.props.animal.last_seen_location} 
                <button onClick={this.delete}>Delete Animal</button>
                 <p>It has been seen {this.props.animal.seen_count} times</p>
                 </li>

                
        )
    }
}

export default Button;