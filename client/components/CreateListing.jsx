import React from 'react'
import {connect} from 'react-redux'

import locations from './locations.json'
import {getCategories} from '../actions/listing'
import {getLocations} from '../actions/locations'

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
      region: 'Auckland',
      suburb: '',
      category: 'Tools',
      subCategory: '',
      whatsIncludes: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
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
        Region:<select name='region' onChange={this.handleChange}>
          {this.props.locations.map((region, i) => {
            return (
              <option value={region.location} key={i}>{region.location}</option>
            )
          })}
        </select>
        Suburb:
        <select name='suburb' onChange={this.handleChange}>
          {this.props.locations.filter(region => {
            return this.state.region === region.location
          }).map((region) => {
            return region.sublocation.map(suburb => {
              return (
                <option value={suburb} key={suburb}> {suburb} </option>
              )
            })
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
    getCategories: dispatch(getCategories()),
    getLocations: dispatch(getLocations())
  }
}

function mapStateToProps (state) {
  return {
    categories: state.categories,
    locations: state.locations
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateListing)
