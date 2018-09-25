import * as React from "react"
import { Store } from "redux"
import { History } from "history"
import { Provider } from "react-redux"
import { ConnectedRouter } from "react-router-redux"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { theme } from "./theme";
import Routes from "./Routes"
interface IProps {
  store: Store
  history: History
}
export default class App extends React.Component<IProps> {
  public shouldComponentUpdate() { return false }
  public render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <MuiThemeProvider theme={theme}>
            <Routes />
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    )
  }
}
