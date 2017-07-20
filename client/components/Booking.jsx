import React from 'react'
import {connect} from 'react-redux'

import {getBooking} from '../actions/booking'

class Booking extends React.Component {
    constructor (props) {
    super (props)

  }

  componentDidMount () {
    this.props.getBooking(this.props.match.params.id)
  }
  render () {
    return (
      <div>
        <h1>test</h1>
        </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getBooking: id => dispatch(getBooking(id))
  }
}

export default connect(null, mapDispatchToProps)(Booking)

