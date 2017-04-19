import React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import App from './containers/App'
import reducer from './reducers'
import 'todomvc-app-css/index.css'

const store = createStore(reducer, applyMiddleware(logger))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
