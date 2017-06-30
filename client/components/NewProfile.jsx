import React from 'react'
import {connect} from 'react-redux'

import {checkForExisting} from '../utils/api'
import {capitalize} from '../utils/functions'
import {newUser} from '../actions/registration'

class NewProfile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: capitalize(props.user.given_name),
      lastName: capitalize(props.user.family_name),
      email: props.user.email,
      userId: props.user.user_id,
      exists: ''

    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleOffFocus = this.handleOffFocus.bind(this)
  }

  handleSubmit (evt) {
    evt.preventDefault()
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
    checkForExisting(evt.target.value, result => {
      if (result) return this.setState({exists: name})
    })
  }

  render () {
    return (
      <div id="new-profile">
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Username" onChange={this.handleChange} onBlur={this.handleOffFocus} name="userName" />
          <input type="text" placeholder="First Name" onChange={this.handleChange} name="firstName" value={this.state.firstName} />
          <input type="text" placeholder="Last Name" onChange={this.handleChange} name="lastName" value={this.state.lastName} />
          <input type="email" placeholder="Email" onChange={this.handleChange} onBlur={this.handleOffFocus} name="email" value={this.state.email}/>
          <input type="tel" placeholder="Mobile" onChange={this.handleChange} name="mobile" />
          <p>Address</p>
          <input type="text" placeholder="Street Number" onChange={this.handleChange} name="streetNumber" />
          <input type="text" placeholder="Street" onChange={this.handleChange} name="street" />
          <input type="text" placeholder="Line 2" onChange={this.handleChange} name="line2" />
          <input type="text" placeholder="City" onChange={this.handleChange} name="city" />
          <input type="text" placeholder="Country" onChange={this.handleChange} name="country" />
          <input type="text" placeholder="Post Code" onChange={this.handleChange} name="postCode" />
          <p />
          <input type="text" placeholder="Date of Birth" onChange={this.handleChange} name="dob" />
          <input type="text" placeholder="Profile Picture" onChange={this.handleChange} name="profilePictureUrl" />
          <button>Sign Up</button>
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
