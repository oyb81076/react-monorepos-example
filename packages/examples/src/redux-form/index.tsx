import * as React from "react"
import { Switch, Route, RouteComponentProps, Redirect } from "react-router-dom"
import ReduxFormSample from "./ReduxFormSample"
const ReduxForm: React.SFC<RouteComponentProps<{}>> = ({ match }) =>
    <Switch>
        <Redirect exact={true} from={match.path} to={`${match.path}/ReduxFormSample`} />
        <Route path={`${match.path}/ReduxFormSample`} component={ReduxFormSample} />
    </Switch>

export default ReduxForm
