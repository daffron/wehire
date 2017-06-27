import React from 'react'
import {connect} from 'react-redux'

import {logout} from '../actions/logout'

class Logout extends React.Component {
  handleClick (e) {
    this.props.logoutUser()
  }

  render () {
    return (
      <button onClick={e => this.handleClick(e)}>
      Logout
    </button>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => {
      dispatch(logout())
    }
  }
}

export default connect(null, mapDispatchToProps)(Logout)