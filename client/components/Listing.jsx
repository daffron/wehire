import React from 'react'
import {connect} from 'react-redux'

import {getListing} from '../actions/listing'

class Listing extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      listingId: props.match.params.id
    }
  }

  componentDidMount () {
    this.props.getListing(this.state.listingId)
  }

  render () {
    return (
      <div className='listing'>
        <div className='row'>
          <div className='col-sm-8'>
            {this.props.listing.images && <img src={this.props.listing.images[0]} />}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    listing: state.listing || {}
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getListing: id => dispatch(getListing(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Listing)
