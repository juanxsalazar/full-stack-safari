import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import axios from 'axios'
import Button from './components/Button'
// import HelloWorld from './components/HelloWorld'

class App extends Component {
  state = {
    animals: [],
    name: ''
  }

  getAllTheAnimal = () => {
    axios.get('http://localhost:3000/animals').then(response => {
      this.setState ({ animals: response.data}) 
      })
  }

  componentDidMount() {
    this.getAllTheAnimal()
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
      this.getAllTheAnimal()
  })
}
  


  render() {
    const schema = {
      title: 'Animal',
      type: 'object',
      properties: {
      species: { type: 'string', title: 'Species Name', default: '' },
      last_seen_location: { type: 'string', title: 'Location', default: '' },
      seen_count: { type: 'integer', title: 'Seen Count' }
      }
    }

    return (
    <>
    <p>Safari, New Animals!</p>
    <Form schema={schema} onSubmit={this.submit} />

    <p>Animal Species, Search by Location:</p>
<input 
value={this.state.name} 
onChange={this.SearchChange}
type="text" 
placeholder="search..." />
    <ul>
     {this.state.animals.map(animal => {
       return (
       <Button key={animal.id} animal={animal} getAllTheAnimal={this.getAllTheAnimal} />
      // <li key={animal.id}>A {animal.species} can be seen at {animal.last_seen_location} <p>It has been seen {animal.seen_count} times</p></li>
       )
    })}
    </ul>
    </>
    )
  }
}


export default App


