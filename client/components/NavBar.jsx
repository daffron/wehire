import React from 'react'
import {connect} from 'react-redux'
import {Navbar, NavItem, MenuItem, NavDropdown, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import {requestLogin, login} from '../actions/loginauth0'
import {logout} from '../actions/logout'
import Search from './Search'
import UserDashboard from './UserDashboard'
import Waiting from './Waiting'

class NavBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleMyAccount = this.handleMyAccount.bind(this)
  }

  handleMyAccount () {
    if (!this.props.isAuthenticated) {
      return this.props.createLogin()
    }
    this.props.history.push('/mywehire')
  }

  render () {
    return (
      <Navbar collapseOnSelect>
    <Navbar.Header>
      {this.props.waiting && <Waiting />}
      <Navbar.Brand>
        <img src="/images/logo.png" onClick={() => this.props.history.push('/')}/>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="#">Link</NavItem>
        <NavItem eventKey={2} href="#">Link</NavItem>
        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3}>Separated link</MenuItem>
        </NavDropdown>
      </Nav>
      <Nav pullRight>
        <a onClick={this.handleMyAccount}>My WeHire</a>
        <Search router={this.props} eventKey={4}/>
        {!this.props.isAuthenticated
        ? <NavItem eventKey={2} href="#" onClick={this.props.createLogin}>Log In</NavItem>
        : <NavItem eventKey={2} href="#" onClick={this.props.logoutUser}>Log Out</NavItem>
        }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    )
  }
}

function mapStateToProps (state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    waiting: state.waiting
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createLogin: () => {
      return dispatch(requestLogin())
    },
    login: dispatch(login()),
    logoutUser: () => {
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
