import React from 'react'
import {connect} from 'react-redux'

import {getListing} from '../actions/listing'

class Listing extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      listingId: props.match.params.id,
      image: 0
    }
    this.cycleImages = this.cycleImages.bind(this)
  }

  componentDidMount () {
    this.props.getListing(this.state.listingId)
  }

  cycleImages () {
    switch (this.state.image) {
      case 0:
        this.setState({image: 1})
        break
      case 1:
        this.setState({image: 2})
        break
      case 2:
        this.setState({image: 0})
    }
  }
  render () {
    return (
      <div className='listing'>
        <div className='row'>
          <div className='col-sm-8'>
            {this.props.listing.images && <img src={this.props.listing.images[this.state.image]} />}
            <button onClick={this.cycleImages}>Next</button>
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
