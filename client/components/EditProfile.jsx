import React from 'react'
import {connect} from 'react-redux'

import {checkForExisting} from '../utils/api'
import {capitalize} from '../utils/functions'
import {updateProfile} from '../actions/user'

class EditProfile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: capitalize(props.profile.first_name) || '',
      lastName: capitalize(props.profile.last_name) || '',
      email: props.user.email,
      userId: props.user.user_id,
      exists: '',
      mobile: props.profile.mobile,
      streetNumber: props.profile.address_number,
      streetAddress: props.profile.address_street,
      suburb: props.profile.address_line2,
      city: props.profile.address_city,
      country: props.profile.address_country,
      postCode: props.profile.address_postcode,
      dob: props.profile.dob,
      profilePictureUrl: props.profile.profilePictureUrl
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleOffFocus = this.handleOffFocus.bind(this)
  }

  handleSubmit (evt) {
    evt.preventDefault()
    this.props.history.push('/myprofile')
    if (this.state.exists) {
      return // make the submit button unclickable
    }
    const state = this.state
    const editedUser = {
      auth_id: state.userId,
      first_name: state.firstName,
      last_name: state.lastName,
      email: state.email,
      phone_mobile: state.mobile,
      address_number: state.streetNumber,
      address_street: state.street,
      address_line2: state.line2,
      address_city: state.city,
      address_country: state.country,
      address_postcode: state.postCode,
      date_of_birth: state.dob,
      profile_image_url: state.profilePictureUrl,
      user_name: state.userName
    }
    this.props.updateProfile(editedUser, this.state.userId)
  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleOffFocus (evt) {
    const name = evt.target.name
    this.setState({showExisting: false, exists: false})
    if (this.props.user.email === evt.target.value) {
      return
    }
    checkForExisting(evt.target.value, result => {
      if (result) return this.setState({exists: name})
    })
  }

  render () {
    return (
      <div id="new-profile" className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className="col-xs-3">UserName:</label>
            <input type="text" placeholder="Username" onChange={this.handleChange} onBlur={this.handleOffFocus} name="userName" />
          </div>
          <div className="form-group row">
            <label className="col-xs-3">First Name:</label>
            <input type="text" placeholder="First Name" onChange={this.handleChange} name="firstName" value={this.state.firstName} />
          </div>
          <div className="form-group row">
            <label className="col-xs-3">Last Name:</label>
            <input type="text" placeholder="Last Name" onChange={this.handleChange} name="lastName" value={this.state.lastName} />
          </div>
          <div className="form-group row">
            <label className="col-xs-3">Email:</label>
            <input type="email" placeholder="Email" onChange={this.handleChange} onBlur={this.handleOffFocus} name="email" value={this.state.email}/>
          </div>
          <div className="form-group row">
            <label className="col-xs-3">Mobile:</label>
            <input type="tel" placeholder="Mobile" onChange={this.handleChange} value={this.state.mobile}name="mobile" />
          </div>
          <div className="form-group row">
            <p>Address</p>
          </div>
          <div className="form-group row">
            <label className="col-xs-3">Street Number:</label>
            <input type="text" placeholder="Street Number" onChange={this.handleChange} value={this.state.streetNumber} name="streetNumber" />
          </div>
          <div className="form-group row">
            <label className="col-xs-3">Street:</label>
            <input type="text" placeholder="Street" onChange={this.handleChange} value={this.state.streetAddress} name="street" />
          </div>
          <div className="form-group row">
            <label className="col-xs-3">Suburb:</label>
            <input type="text" placeholder="Line 2" onChange={this.handleChange} value={this.state.suburb} name="line2" />
          </div>
          <div className="form-group row">
            <label className="col-xs-3">City:</label>
            <input type="text" placeholder="City" onChange={this.handleChange} value={this.state.city} name="city" />
          </div>
          <div className="form-group row">
            <label className="col-xs-3">Country:</label>
            <input type="text" placeholder="Country" onChange={this.handleChange} value={this.state.country} name="country" />
          </div>
          <div className="form-group row">
            <label className="col-xs-3">Post Code:</label>
            <input type="text" placeholder="Post Code" onChange={this.handleChange} value={this.state.postCode} name="postCode" />
          </div>
          <div className="form-group row">
            <label className="col-xs-3">Date of Birth:</label>
            <input type="text" placeholder="Date of Birth" onChange={this.handleChange} value={this.state.dob} name="dob" />
          </div>
          <div className="form-group row">
            <label className="col-xs-3">Profile Picture:</label>
            <input type="text" placeholder="Profile Picture" onChange={this.handleChange} name="profilePictureUrl" />
          </div>
          <div className="form-group row">
            <button>Update</button>
          </div>
        </form>
        {this.state.exists && <h1>{this.state.exists.toLowerCase()} already exists</h1>}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.auth.user,
    profile: state.getProfile
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateProfile: (user, id) => { dispatch(updateProfile(user, id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
