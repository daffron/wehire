import React from 'react'
import {connect} from 'react-redux'

import {getCategories, createListing} from '../actions/listing'
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
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSelect (evt) {
    this.setState({perHour: false, perDay: true})
  }

  handleSubmit (evt) {
    evt.preventDefault()
    this.props.createListing(this.state)
  }

  render () {
    return (
      <div className="container">
        <h2>Create Listing</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className='col-xs-3'>Title:</label>
            <input type='text' name='title' onChange={this.handleChange} />
          </div>
          <div className="form-group row">
            <label className='col-xs-3'>Description:</label>
            <input type='text' name='description' onChange={this.handleChange} />
          </div>
          <div className="form-group row">
            <label className='col-xs-3'>Price:</label>
            <input name='price' onChange={this.handleChange} />
            <select onChange={this.handleSelect}>
              <option value='false'>Per Hour </option>
              <option value='true'> Per Day </option>
            </select>
          </div>
          <div className="form-group row">
            <label className='col-xs-3'>Unavailable Dates:</label>
            <input name='unavailableDates' onChange={this.handleChange} value={['15/7/17']} /><br />
          </div>
          <div className="form-group row">
            <label className="col-xs-3">Images:</label>
            <input name='images' onChange={this.handleChange} /><br />
          </div>
          <div className="form-group row">
            <label className="col-xs-3"> Region:</label>
            <select name='region' onChange={this.handleChange}>
              {this.props.locations.map((region, i) => {
                return (
                  <option value={region.location} key={i}>{region.location}</option>
                )
              })}
            </select>
          </div>
          <div className="form-group row">
            <label className="col-xs-3">Suburb:</label>
            <select name='suburb' onChange={this.handleChange}>
              {this.props.locations.filter(region => {
                return this.state.region === region.location
              }).map(region => {
                return region.sublocation.map(suburb => {
                  return (
                    <option value={suburb} key={suburb}> {suburb} </option>
                  )
                })
              })}
            </select>
          </div>
          <div className="form-group row">
            <label className="col-xs-3">Categories:</label>
            <select name='category' onChange={this.handleChange}>
              {this.props.categories.map(type => {
                return (
                  <option value={type.name} key={type.name}>{type.name}</option>
                )
              })}
            </select>
          </div>
          <div className="form-group row">
            <label className="col-xs-3">Sub Category:</label>
            <select name='subCategory' onChange={this.handleChange}>
              {this.props.categories.filter(type => {
                return this.state.category === type.name
              }).map(category => {
                return category.sub.map(subcat => {
                  return (
                    <option value={subcat} key={subcat}> {subcat} </option>
                  )
                })
              })}
            </select>
          </div>
           <div className="form-group row">
            <button>Create</button>
          </div>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: dispatch(getCategories()),
    getLocations: dispatch(getLocations()),
    createListing: listing => {
      dispatch(createListing(listing))
    }
  }
}

function mapStateToProps (state) {
  return {
    categories: state.categories,
    locations: state.locations
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateListing)
