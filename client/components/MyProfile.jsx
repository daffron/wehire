import React from 'react'
import {connect} from 'react-redux'
import {getProfileById} from '../actions/user'

class MyProfile extends React.Component {
  constructor (props) {
    super (props)
    this.state = {}
  }
  componentDidMount () {
    this.props.getUser(this.props.initialUser)
  }
  render () {
    const user = this.props.user
    return (
      <div>
        <strong>First Name:</strong>{user.first_name}<br />
        <strong>Last Name: </strong>{user.last_name}<br />
        <strong>Email: </strong>{user.email}<br />
        <strong>Address: </strong>{user.address_number}<br/>
        {user.address_street}<br/>
        {user.address_line2}<br/>
        {user.address_city}<br/>
        {user.address_country}<br/>
        {user.address_postcode}<br/>
        <br />
        <button>Edit</button>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    initialUser: state.auth.user.user_id,
    user: state.getProfile || {}
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getUser: id => dispatch(getProfileById(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile)
