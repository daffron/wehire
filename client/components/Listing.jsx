import React from 'react'
import {connect} from 'react-redux'

class Listing extends React.Component {
  constructor (props) {
    console.log(props)
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='listing'>
        <div className='row'>
          <div className='col-sm-8'>
            <img src={this.props.lisiting.image[0]} />
          </div>
        </div>
      </div>
    )
  }
}

// function mapStateToProps (state) {
//   return {
//     listing
//   }
// }

export default connect()(Listing)
