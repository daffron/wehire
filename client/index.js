import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import thunkMiddleware from 'redux-thunk'

import reducers from './reducers'
import App from './components/App'

let store = createStore(reducers, compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <Router>
        <Route path='*' component={App} />
      </Router>
    </Provider>,
    document.getElementById('app')
  )
})
