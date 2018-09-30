import * as React from "react"
import NotFound from "../error/NotFound"
import { Switch, Route } from "react-router"
import HomeRouter from "../home/HomeRouter"
import Example from "@app/examples/src"

export default () =>
  <Switch>
    <Route path="/" exact component={HomeRouter} />
    <Route path="/examples" component={Example} />
    <Route component={NotFound} />
  </Switch>
