import * as React from "react"
import NotFound from "../error/NotFound"
import { Switch, Route } from "react-router"
import HomeRouter from "../home/HomeRouter"

export default () =>
  <Switch>
    <Route path="/" exact component={HomeRouter} />
    <Route component={NotFound} />
  </Switch>
