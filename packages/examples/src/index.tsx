import * as React from "react"
import { Dashboard, HeaderLink, MenuLink } from "@app/mui"
import { RouteComponentProps, Switch, Route, Redirect } from "react-router"
import ReduxForm from "./redux-form"
import DeviceHub from "@material-ui/icons/DeviceHub"
import SignIn from "./signIn/SignIn"

const Main: React.SFC<{ path: string }> = ({ path }) =>
  <Switch>
    <Redirect exact from={path} to={`${path}/redux-form`} />
    <Route path={`${path}/redux-form`} component={ReduxForm} />
    <Route path={`${path}/sign-in`} component={SignIn} />
  </Switch>
const Menu: React.SFC<{ path: string }> = ({ path }) =>
  <>
    <MenuLink Icon={DeviceHub} href={`${path}/redux-form`} text="redux-form" />
    <MenuLink Icon={DeviceHub} href={`${path}/sign-in`} text="sign-in" />
  </>
const HeaderLeft = () =>
  <>
    <HeaderLink to="/" exact>HomePage</HeaderLink>
    <HeaderLink to="/examples">Examples</HeaderLink>
    <HeaderLink to="/material-ui">Material-UI</HeaderLink>
  </>
const Example: React.SFC<RouteComponentProps<{}>> = (props) =>
  <Dashboard
    brand="Examples"
    MainComponent={Main}
    MenuComponent={Menu}
    HeaderLeftComponent={HeaderLeft}
    {...props} />
export default Example
