import React from 'react'
import {getBookings} from '../actions/booking'
import {connect} from 'react-redux'

class Bookings extends React.Component {
    constructor (props) {
    super (props)

    }
  componentDidMount () {
    this.props.getBookings(this.props.user.sub)
  }


  render () {
    return (
    <div>
  <h1>Bookings</h1>
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
    getBookings: id => dispatch(getBookings(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookings)
