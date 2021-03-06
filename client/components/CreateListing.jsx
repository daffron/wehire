import React from 'react'
import {connect} from 'react-redux'
import Dropzone from 'react-dropzone'
import {getCategories, createListing} from '../actions/listing'
import {getLocations} from '../actions/locations'
import {uploadImage} from '../utils/tokenApi'
import {getDepositValue} from '../utils/functions'
import TakenDates from './TakenDates'

class CreateListing extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      price: 0,
      perHour: true,
      perDay: false,
      unavailableDates: [],
      images: [],
      depositAmount: 0,
      region: 'Auckland',
      suburb: '',
      category: 'Tools',
      subCategory: '',
      whatsIncluded: [],
      displayUpload: true,
      imageUploading: false,
      modal: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImageDrop = this.handleImageDrop.bind(this)
    this.setDates = this.setDates.bind(this)
  }

  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSelect (evt) {
    this.setState({perHour: false, perDay: true})
  }

  setDates (dates) {
    const takenDates = this.state.unavailableDates.concat(dates)
    this.setState({unavailableDates: takenDates})
  }

  handleSubmit (evt) {
    this.props.history.push('/mywehire')
    evt.preventDefault()
    const state = this.state
    const newListing = {
      title: state.title,
      description: state.description,
      price: state.price,
      per_hour: state.perHour,
      per_day: state.perDay,
      unavailable_dates: state.unavailableDates,
      images: state.images,
      deposit_amount: state.depositAmount,
      region: state.region,
      suburb: state.suburb,
      category: state.category,
      sub_category: state.subCategory,
      whats_included: state.whatsIncluded,
      user_id: this.props.user.user_id
    }
    this.props.createListing(newListing)
  }

  handleImageDrop (file) {
    uploadImage(file[0], (err, res) => {
      if (err) return err.message
      this.setState({
        imageUploading: false
      })
      const imagesArr = this.state.images.concat(res)
      this.setState({images: imagesArr})
      if (this.state.images.length === 3) {
        this.setState({displayUpload: false})
      }
    })
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
            <select name='depositAmount' onBlur={this.handleChange}>
             {getDepositValue(this.state.price, this.state.perHour)}
            </select>
          </div>
          <div className="form-group row">
            <label className='col-xs-3'>Unavailable Dates:</label>
            <TakenDates setDates={this.setDates} takenDates={this.state.unavailableDates}/><br />
          </div>
          <div className="form-group row">
          <label className='col-xs-3'>Upload Images:</label>
          <div className='col-md-6 image-upload'>
              <div className='image-upload-single'>
                 {this.state.images[0] ? <img src={this.state.images[0]} className='listing-photo' /> : <Dropzone
                    accept='image/*'
                    onDrop={this.handleImageDrop}>
                    <p>Drop an image or click to select a file to upload. Max you can upload is 3!</p>
                  </Dropzone>}
                </div>
                <div className='image-upload-single'>
                  {this.state.images[1] ? <img src={this.state.images[1]} className='listing-photo' /> : <Dropzone
                    accept='image/*'
                    onDrop={this.handleImageDrop}>
                    <p>Drop an image or click to select a file to upload. Max you can upload is 3!</p>
                  </Dropzone>}
                </div>
                <div className='image-upload-single'>
                  {this.state.images[2] ? <img src={this.state.images[2]} className='listing-photo' /> : <Dropzone
                    accept='image/*'
                    onDrop={this.handleImageDrop}>
                    <p>Drop an image or click to select a file to upload. Max you can upload is 3!</p>
                  </Dropzone>}
                </div>
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
    locations: state.locations,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateListing)
