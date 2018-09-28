import * as React from "react"
import { Dashboard, HeaderLink } from "@app/mui"
import { RouteComponentProps, Switch, Route } from "react-router"
import HomePage from "./HomePage"
const Main: React.SFC<{ path: string }> = () =>
  <Switch>
    <Route component={HomePage} />
  </Switch>
const HeaderLeft = () =>
  <>
    <HeaderLink to="/" exact>HomePage</HeaderLink>
    <HeaderLink to="/examples">Examples</HeaderLink>
    <HeaderLink to="/material-ui">Material-UI</HeaderLink>
  </>
const HomeRouter: React.SFC<RouteComponentProps<{}>> = (props) =>
  <Dashboard
    brand="Brand"
    MainComponent={Main}
    HeaderLeftComponent={HeaderLeft}
    {...props} />
export default HomeRouter
