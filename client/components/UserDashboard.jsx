import React from 'react'
import {Link, Route} from 'react-router-dom'
import {connect} from 'react-redux'

class UserDashboard extends React.Component {
  constructor (props) {
    super (props)
  }

  goToProfile () {
    this.props.history.push('/myprofile')
  }

  render () {
    return (
      <div>
        <h3>My WeHire</h3>
        <Link to='/createlisting'> Create a listing </Link>
        <Link to='/mywehire/bookings/'>View your Bookings </Link>
        <button onClick={this.goToProfile.bind(this)}>Profile</button>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(UserDashboard)
