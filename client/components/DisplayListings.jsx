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
          <div key={key} className='search-result-item'>
            <h4>{listing.error}</h4>
            <strong>{listing.title}</strong>
            <p>{listing.description}</p>
            <img className='search-image' src={listing.images[0]} onClick={() => this.goToListing(listing._id)}/>
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
