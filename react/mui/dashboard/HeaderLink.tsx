import React from "react"
import { withRouter, RouteComponentProps } from "react-router"
import { Button } from "@material-ui/core"
import classNames from "classnames";
import { IDashboardStyleProps, styles } from "./styles";
import { compose } from "recompose"
interface IHeaderLinkProps {
  to: string,
  exact?: boolean
}
type IProps = IHeaderLinkProps & IDashboardStyleProps & RouteComponentProps<{}>
interface IState {
  active: boolean
}
const enhancer = compose<IProps, IHeaderLinkProps>(
  styles,
  withRouter,
)
class HeaderLink extends React.Component<IProps, IState> {
  public state = {
    active: this.props.exact
      ? this.props.location.pathname === this.props.to
      : this.props.location.pathname.startsWith(this.props.to),
  }
  public componentWillReceiveProps({ location: { pathname }, to, exact }: IProps) {
    if (exact !== this.props.exact || to !== this.props.to || pathname !== this.props.location.pathname) {
      const active = exact ? pathname === to : pathname.startsWith(to)
      this.setState({ active })
    }
  }
  public render() {
    const { to, children, classes: { headerLink, headerLinkActive } } = this.props
    const className = classNames(headerLink, { [headerLinkActive]: this.state.active })
    return (
      <Button
        className={className}
        href={to} onClick={this.handleClick} children={children} />
    )
  }
  private handleClick: React.MouseEventHandler<any> = (e) => {
    e.preventDefault()
    if (this.state.active) { return }
    this.props.history.push(this.props.to)
  }
}
export default enhancer(HeaderLink)
