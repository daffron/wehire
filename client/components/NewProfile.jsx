import React from 'react'
import {connect} from 'react-redux'

class NewProfile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: this.splitName(props.user.name)[0],
      lastName: this.splitName(props.user.name)[1]

    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.splitName = this.splitName.bind(this)
  }

  handleSubmit (evt) {
    evt.preventDefault()
  }

  splitName (name) {
    return name.split(' ')
  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render () {
    return (
      <div id="new-profile">
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Username" onChange={this.handleChange} name="userName" />
          <input type="text" placeholder="First Name" onChange={this.handleChange} name="firstName" value={this.state.firstName} />
          <input type="text" placeholder="Last Name" onChange={this.handleChange} name="lastName" value={this.state.lastName} />
          <input type="email" placeholder="Email" onChange={this.handleChange} name="email" />
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
        </form>
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

}

export default connect(mapStateToProps)(NewProfile)
