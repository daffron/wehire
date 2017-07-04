import React from 'react'
import {Link} from 'react-router-dom'

class UserDashboard extends React.Component {
  constructor (props) {
    super (props)
  }

  render () {
    return (
      <div>
        <h3>My WeHire</h3>
        <Link to='/hire'> Create a listing </Link>
      </div>
    )
  }
}

export default UserDashboard
