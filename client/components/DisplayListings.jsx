import React from 'react'
import {connect} from 'react-redux'

class DisplayListings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
<<<<<<< HEAD

  goToListing (id) {
    this.props.history.push(`/listing/${id}`)
  }

=======
>>>>>>> 5645b7c77dd2b82dd8aa0769167a958c2432b8c9
  render () {
    return (
      <div>
      {this.props.listingResults.map((listing, key) => {
        return (
          <div key={key}>
            <h4>{listing.error}</h4>
            <strong>{listing.title}</strong>
            <p>{listing.description}</p>
            <img src={listing.images[0]} onClick={() => this.goToListing(listing._id)}/>
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
