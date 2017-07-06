import React from 'react'
import {connect} from 'react-redux'

const ErrorMessage = (props) => {
  return (
    <div className='error'>
      <p>{props.message}</p>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    message: state.error
  }
}

export default connect(mapStateToProps)(ErrorMessage)
