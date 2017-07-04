import React from 'react'

class CreateListing extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      price: 0,
      perHour: false,                                                                                                                                                                                                                                                                                                                                                                                                                                  
      perDay: false,
      unavailableDates: [],
      images: '',
      despositAmount: 0,
      location: '',
      categoryId: 1,
      whatsIncludes: []
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  render () {
    console.log(this.state)
    return (
      <div>
        <h2>Create Listing</h2>
        Title:<input name='title' onChange={this.handleChange} />
      </div>
    )
  }
}

export default CreateListing
