import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import axios from 'axios'

class HelloWorld extends Component {

  state = {
    animals: [],
    name: ''
  }

  getAllTheAnimal = () => {

  }
  componentDidMount() {
    fetch('http://localhost:3000/animals')
    .then(response => response.json())
    .then(response => {
      this.setState ({ animals: response}) 
    })
  }

  SearchChange = event => {
    const name = event.target.value

    this.setState({ name: name }, () => {
      fetch(`http://localhost:3000/animals?location=${this.state.name}`)
      .then(response => response.json())
      .then(response => {
        this.setState({ animals: response }) 
      })
    })
  }
  
  Submit = form => {
    axios
    .post('http://localhost:3000/animals', {animal: form.formData})
    .then(response => {
    axios.get('http://localhost:3000/animals').then(response => {
    this.setState ({ animals: response}) 
    })
  })
}
  


  render() {
    const schema = {
      title: 'Animals',
      type: 'object',
      properties: {
      species: { type: 'string', title: 'Name', default: '' },
      last_seen_location: { type: 'string', title: 'Location', default: '' },
      seen_count: { type: 'integer', title: 'Seen Count' }
      }
    }

    return (
    <>
    <p>Safari, New Animals!</p>
    <Form schema={schema} onSubmit={this.submit} />
    <p>Animal Species Search by Location:</p>
<input 
value={this.state.name} 
onChange={this.SearchChange}
type="text" 
placeholder="search..." />
    <ul>
     {this.state.animals.map(animal => {
       return <li key={animal.id}>A {animal.species} can be seen at {animal.last_seen_location} <p>It has been seen {animal.seen_count} times</p></li>
     })}
    </ul>
    </>
    )
  }
}

export default HelloWorld
