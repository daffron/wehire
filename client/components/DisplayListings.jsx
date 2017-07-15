import React from 'react'
import {connect} from 'react-redux'

class DisplayListings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  goToListing (id) {
    this.props.history.push(`/listing/${id}`)
  }

  render () {
    return (
      <div className='search-results'>
      {this.props.listingResults.map((listing, key) => {
        return (
          <div key={key} className='search-result-item row'>
            <img className='search-image' src={listing.images[0]} onClick={() => this.goToListing(listing._id)}/>
             <h4>{listing.error}</h4>
            <strong>{listing.title}</strong>
            <h5>{listing.price}{listing.per_hour && <p>per Hour</p>}{listing.per_day && <p>per Day</p>}</h5>
          </div>
        )
      })}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    listingResults: state.listingResults
  }
}
export default connect(mapStateToProps)(DisplayListings)
