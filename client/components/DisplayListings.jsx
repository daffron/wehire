import React from 'react'
import {connect} from 'react-redux'

class DisplayListings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      listingResults: props.listingResults || []
    }
  }
  render () {
    return (
      <div>
      {this.state.listingResults.map((listing, key) => {
        return (
          <div>{listing.title}</div>
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
