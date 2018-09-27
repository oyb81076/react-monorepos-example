import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import { configureStore, history } from './app/createStore'
import App from './app/App'
const store = configureStore()
const MOUNT_NODE = document.getElementById('root') as HTMLElement
ReactDOM.render(React.createElement(App, { store, history }), MOUNT_NODE)
if (__DEV__ && module.hot) {
  module.hot.accept(["./app/App"], () => {
    setImmediate(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE)
      ReactDOM.render(
        React.createElement(
          require("./app/App").default,
          { store, history },
        ),
        MOUNT_NODE,
      )
    })
  })
}
