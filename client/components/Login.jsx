import React from 'react'
import {connect} from 'react-redux'

import {requestLogin, login} from '../actions/loginauth0'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin () {
    this.props.createLogin()
  }

  render () {
    return (
      <div className='nav-link'>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createLogin: () => {
      return dispatch(requestLogin())
    },
    login: dispatch(login())
  }
}

export default connect(null, mapDispatchToProps)(Login)