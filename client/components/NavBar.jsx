import React from 'react'
import {connect} from 'react-redux'
import {Navbar, NavItem, MenuItem, NavDropdown, Nav} from 'react-bootstrap'

import {requestLogin, login} from '../actions/loginauth0'
import {logout} from '../actions/logout'
import Search from './Search'

class NavBar extends React.Component {

  render () {
    return (
      <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <img src="/images/logo.png" />
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
        <Search />
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
    isAuthenticated: state.auth.isAuthenticated
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
