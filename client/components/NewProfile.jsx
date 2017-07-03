import React from 'react'
import {connect} from 'react-redux'

import {checkForExisting} from '../utils/api'
import {capitalize} from '../utils/functions'
import {newUser} from '../actions/registration'

class NewProfile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: capitalize(props.user.given_name) || '',
      lastName: capitalize(props.user.family_name) || '',
      email: props.user.email,
      userId: props.user.user_id,
      exists: ''

    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleOffFocus = this.handleOffFocus.bind(this)
  }

  componentDidMount () {
    console.log(this.props)
    this.props.isComplete()
  }

  handleSubmit (evt) {
    evt.preventDefault()
    if (this.state.exists) {
      return // make the submit button unclickable
    }
    const state = this.state
    const newUser = {
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
    this.props.newUser(newUser)
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
            <input type="tel" placeholder="Mobile" onChange={this.handleChange} name="mobile" />
          </div>
          <div className="form-group row">
            <p>Address</p>
          </div>
          <div className="form-group row">
            <label className="col-xs-3">Street Number:</label>
            <input type="text" placeholder="Street Number" onChange={this.handleChange} name="streetNumber" />
          </div>
          <div className="form-group row">
            <label className="col-xs-3">Street:</label>
            <input type="text" placeholder="Street" onChange={this.handleChange} name="street" />
          </div>
          <div className="form-group row">
            <label className="col-xs-3">Suburb:</label>
            <input type="text" placeholder="Line 2" onChange={this.handleChange} name="line2" />
          </div>
          <div className="form-group row">
            <label className="col-xs-3">City:</label>
            <input type="text" placeholder="City" onChange={this.handleChange} name="city" />
          </div>
          <div className="form-group row">
            <label className="col-xs-3">Country:</label>
            <input type="text" placeholder="Country" onChange={this.handleChange} name="country" />
          </div>
          <div className="form-group row">
            <label className="col-xs-3">Post Code:</label>
            <input type="text" placeholder="Post Code" onChange={this.handleChange} name="postCode" />
          </div>
          <div className="form-group row">
            <label className="col-xs-3">Date of Birth:</label>
            <input type="text" placeholder="Date of Birth" onChange={this.handleChange} name="dob" />
          </div>
          <div className="form-group row">
            <label className="col-xs-3">Profile Picture:</label>
            <input type="text" placeholder="Profile Picture" onChange={this.handleChange} name="profilePictureUrl" />
          </div>
          <div className="form-group row">
            <button>Sign Up</button>
          </div>
        </form>
        {this.state.exists && <h1>{this.state.exists.toLowerCase()} already exists</h1>}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.auth.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    newUser: user => { dispatch(newUser(user)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProfile)
