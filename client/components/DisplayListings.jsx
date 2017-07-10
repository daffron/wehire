import React from 'react'
import {connect} from 'react-redux'

class DisplayListings extends React.Component {
  constructor (props) {
    super(props)
    this.state = { 
    }
  }
  render () {

    return (
      <div>
      {this.props.listingResults.map((listing, key) => {
        return (
          <div key={key}>
            <h4>{listing.error}</h4>
            <strong>{listing.title}</strong>
            <p>{listing.description}</p>
            <img src={listing.images[0]} />
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
