import React from 'react'
import {connect} from 'react-redux'

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <form>
        <input type="text" placeholder="What are you looking for?.." width="200" />
        <button className="search-btn"><i/></button>
      </form>
    )
  }
}

export default connect()(Search)
