import React from 'react'
import {Link, Route} from 'react-router-dom'
import {connect} from 'react-redux'

class UserDashboard extends React.Component {
  constructor (props) {
    super (props)
  }

  goToProfile () {
    this.props.getUser(this.props.initialUser)
    this.props.history.push('/myprofile')
  }

  render () {
    return (
      <div>
        <h3>My WeHire</h3>
        <Link to='/hire'> Create a listing </Link>
        <button onClick={this.goToProfile.bind(this)}>Profile</button>
      </div>
    )
  }
}


export default connect()(UserDashboard)
