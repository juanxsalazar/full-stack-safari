import React, { Component } from 'react'

class HelloWorld extends Component {

  state = {
    animals: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/animals')
    .then(response => response.json())
    .then(response => {
      this.setState ({ animals: response}) 
    })
  }

  render() {
    return <>
    <p>Animal Species:</p>
    <ul>
     {this.state.animals.map(animal => {
       return <li key={animal.id}>{animal.species}</li>
     })}
    </ul>
    </>
  }
}

export default HelloWorld
