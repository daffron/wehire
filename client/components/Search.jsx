import React from 'react'
import {connect} from 'react-redux'
import {search} from '../actions/search'
import {Redirect} from 'react-router-dom'
import {getCategories} from '../actions/listing'

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      term: '',
      category: 'Tools'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit (evt) {
    evt.preventDefault()
    this.props.search(this.state.term, this.state.category)
    this.props.router.history.push('/search')
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="What are you looking for?.." id="search-bar" onChange={this.handleChange} name="term" />
            <label >Categories:</label>
            <select name='category' onChange={this.handleChange}>
              {this.props.categories.map(type => {
                return (
                  <option value={type.name} key={type.name}>{type.name}</option>
                )
              })}
            </select>
        <button className="search-btn"><span className="glyphicon glyphicon-search"></span></button>
      </form>
    )
  }
}
function mapStateToProps (state) {
  return {
    categories: state.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    search: (searchTerm, searchCategory) => { dispatch(search(searchTerm, searchCategory)) },
    getCategories: dispatch(getCategories())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search)
