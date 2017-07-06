import React from 'react'
import {connect} from 'react-redux'
import Dropzone from 'react-dropzone'
import {getCategories, createListing} from '../actions/listing'
import {getLocations} from '../actions/locations'
import {uploadImage} from '../utils/tokenApi'

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
      images: null,
      despositAmount: 0,
      region: 'Auckland',
      suburb: '',
      category: 'Tools',
      subCategory: '',
      whatsIncluded: [],
      displayUpload: true,
      imageUploading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImageDrop = this.handleImageDrop.bind(this)
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

  handleImageDrop (files) {
    if (files.length <= 3) {
      this.setState({images: files})
      files.map(file => {
        uploadImage(file, (err, res) => {
          if (err) return err.message
          this.setState({
            displayUpload: false,
            imageUploading: false
          })
        })
      })
    } else if (files.length > 3) {
      return console.error('error')
    }
  }

  render () {
    return (
      <div className="container">
        <h2>Create Listing</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className='col-xs-3'>Title:</label>
            <input type='text' placeholder='Title' name='title' onChange={this.handleChange} />
          </div>
          <div className="form-group row">
            <label className='col-xs-3'>Description:</label>
            <input type='text' placeholder='Description'name='description' onChange={this.handleChange} />
          </div>
          <div className="form-group row">
            <label className='col-xs-3'>Whats Included:</label>
            <input type='text' placeholder='Whats Included'name='whatsIncluded' onChange={this.handleChange} />
          </div>
          <div className="form-group row">
            <label className='col-xs-3'>Hire Price:</label>
            <input type='number' name='price' placeholder='$' onChange={this.handleChange} />
            <select onChange={this.handleSelect}>
              <option value='false'>Per Hour </option>
              <option value='true'> Per Day </option>
            </select>
          </div>
          <div className="form-group row">
            <label className='col-xs-3'>Deposit Price:</label>
            <select name='despositAmount' onChange={this.handleChange}>
              <option value={this.state.price * 2}>2x ${this.state.price * 2} </option>
              <option value={this.state.price * 3}>3x ${this.state.price * 3} </option>
              <option value={this.state.price * 4}>4x ${this.state.price * 4} </option>
              <option value={this.state.price * 5}>5x ${this.state.price * 5} </option>
            </select>
          </div>
          <div className="form-group row">
            <label className='col-xs-3'>Unavailable Dates:</label>
            <input name='unavailableDates' onChange={this.handleChange} value={['15/7/17']} /><br />
          </div>
          <div className="form-group row">
          <label className='col-xs-3'>Upload Images:</label>
          <div className='col-md-6'>
                 {this.state.displayUpload && <Dropzone
                    multiple={true}
                    accept='image/*'
                    onDrop={this.handleImageDrop}>
                    <p>Drop an image or click to select a file to upload. Max you can upload is 3!</p>
                  </Dropzone>}
                  {this.state.images &&
                    <div className='photo-size'>
                      <h5>Upload Successful</h5>
                      <img src={this.state.images[0].preview } className='listing-photo'/>
                      <img src={this.state.images[1].preview } className='listing-photo'/>
                      <img src={this.state.images[2].preview } className='listing-photo'/>                                                                                
                    </div>}
                </div>
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
