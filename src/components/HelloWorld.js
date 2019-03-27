import React, { Component } from 'react'
import Form from 'react-jsonschema-form'


class HelloWorld extends Component {

  state = {
    animals: [],
    name: ''
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
  
  onSubmit = (form) => {
    console.log (form)
  }
  render() {
    const schema = {
      title: 'Animals',
      type: 'object',
      required: ['name'],
      properties: {
        species: { type: 'string', title: 'Name', default: '' },
        last_seen_location: { type: 'string', title: 'LastLocation', default: '' },
        seen_count: { type: 'integer', title: 'SeenCount' }
      }
    }

    return <>
    <p>New Form:</p>
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
  }
}

export default HelloWorld
