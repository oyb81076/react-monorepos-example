import { createStore, applyMiddleware, compose, combineReducers, ReducersMapObject, Store } from "redux"
import { createBrowserHistory } from "history"
import { routerMiddleware, routerReducer } from "react-router-redux"
import { reducer as formReducer } from "redux-form"
import { dashboardReducer } from "@app/mui"
export const history = createBrowserHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(
  applyMiddleware(routerMiddleware(history)),
)
const reducers: ReducersMapObject = {
  form: formReducer,
  router: routerReducer,
  dashboard: dashboardReducer,
}

let store: Store | null = null
/**
 * 为了hot reload写的函数, 采用注入的方式, 这样方hot reload的时候替换
 * @param obj
 */
export const registerReducer = (obj: any) => {
  Object.assign(reducers, obj)
  if (store) {
    store.replaceReducer(combineReducers(reducers))
  }
}

export const configureStore = () => {
  return store = createStore(combineReducers(reducers), enhancer)
}
