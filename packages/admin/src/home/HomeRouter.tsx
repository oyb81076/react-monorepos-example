import React from "react"
import { Dashboard, MenuLink, HeaderLink } from "@app/mui"
import { RouteComponentProps, Switch, Redirect, Route } from "react-router"
import NotFound from "../error/NotFound"
import { Android } from "@material-ui/icons"
const Main: React.SFC<{ path: string }> = ({ path }) =>
  <Switch>
    <Redirect from={path} to={`${path}/`} exact />
    <Route component={NotFound} />
  </Switch>
const Menu: React.ComponentType<{ path: string }> = ({ path }) =>
  <>
    <MenuLink Icon={Android} href={`${path}/form`} text="Form" />
    <MenuLink Icon={Android} href={`${path}/date-picker-examples`} text="Date Picker Examples" />
  </>
const HeaderLeft = () =>
  <>
    <HeaderLink to="/" exact>HomePage</HeaderLink>
    <HeaderLink to="/examples">Examples</HeaderLink>
    <HeaderLink to="/material-ui">Material-UI</HeaderLink>
  </>

const HomeRouter: React.SFC<RouteComponentProps<{}>> = (props) =>
  <Dashboard
    MainComponent={Main}
    MenuComponent={Menu}
    HeaderLeftComponent={HeaderLeft}
    {...props} />
export default HomeRouter
