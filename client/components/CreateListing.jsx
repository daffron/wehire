import React from 'react'
import {connect} from 'react-redux'

import locations from './locations.json'
import {getCategories} from '../actions/listing'

class CreateListing extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      price: 0,
      perHour: true,
      perDay: false,
      unavailableDates: ['15/7/17'],
      images: '',
      despositAmount: 0,
      location: '',
      category: 'Tools',
      subCategory: '',
      whatsIncludes: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleCategories = this.handleCategories.bind(this)
  }

  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSelect (evt) {
    this.setState({perHour: false, perDay: true})
  }

  render () {
    return (
      <div>
        <h2>Create Listing</h2>
        Title:<input name='title' onChange={this.handleChange} /><br />
        Description:<input name='description' onChange={this.handleChange} /><br />
        Price:<input name='price' onChange={this.handleChange} />
        <select onChange={this.handleSelect}>
          <option value='false'>Per Hour </option>
          <option value='true'> Per Day </option>
        </select>
        Unavailable Dates:<input name='unavailableDates' onChange={this.handleChange} value={['15/7/17']} /><br />
        Images:<input name='images' onChange={this.handleChange} /><br />
        Location:<select name='location' onChange={this.handleChange}>
          {locations.locations.map((name, i) => {
            return (
              <option value={name.regions} key={i}>{name.regions}</option>
            )
          })}
        </select>
        Categories:
        <select name='category' onChange={this.handleChange}>
          {this.props.categories.map(type => {
            return (
              <option value={type.name} key={type.name}>{type.name}</option>
            )
          })}
        </select>
         Sub Category:
        <select name='subCategory' onChange={this.handleChange}>
          {this.props.categories.filter(type => {
            return this.state.category === type.name
          }).map((category) => {
            return category.sub.map(subcat => {
              return (
                <option value={subcat} key={subcat}> {subcat} </option>
              )
            })
          })}
        </select>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: dispatch(getCategories())
  }
}

function mapStateToProps (state) {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateListing)
