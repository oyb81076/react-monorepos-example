import React from "react"
import classNames from "classnames"
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, Divider } from "@material-ui/core"
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon } from "@material-ui/icons"
import { styles, IDashboardStyleProps } from "./styles"
import { compose } from "recompose"
import { connect } from "react-redux"
import { openDashboard, closeDashboard } from "./reducer"
import { RouteComponentProps } from "react-router"

export interface IDashboardProps extends RouteComponentProps<{}> {
  MenuComponent?: React.ComponentType<{ path: string }>
  MainComponent?: React.ComponentType<{ path: string }>
  HeaderLeftComponent?: React.ComponentType<{ path: string }>
  HeaderRightComponent?: React.ComponentType<{ path: string }>
  brand?: React.ReactNode
}

interface IProps extends IDashboardStyleProps, IDashboardProps {
  open: boolean
  onNarrow: () => any
  onExpand: () => any
}
const enhancer = compose<IProps, IDashboardProps>(
  styles,
  connect(
    (store: any) => ({ open: store.dashboard.open }),
    { onNarrow: closeDashboard, onExpand: openDashboard },
  ),
)
class Dashboard extends React.Component<IProps> {
  public render() {
    const {
      classes,
      MenuComponent, MainComponent, HeaderLeftComponent, HeaderRightComponent,
      match: { path },
      brand,
      open, onNarrow, onExpand,
    } = this.props
    const toggle = open ? onNarrow : onExpand
    const menu = MenuComponent != null
    return (
      <div className={classes.root}>
        <AppBar position="absolute"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}>
          <Toolbar
            variant="dense"
            disableGutters={!open && menu} className={classes.appBarToolbar}>
            <IconButton
              className={classNames(classes.menuButton, { [classes.hide]: open || !menu })}
              color="inherit"
              onClick={toggle} >
              <MenuIcon />
            </IconButton>
            {brand && (
              <Typography variant="title" color="inherit" noWrap>
                {brand}
              </Typography>
            )}
            {HeaderLeftComponent && (
              <div style={{ flex: 1, marginLeft: 20 }}>
                <HeaderLeftComponent path={path} />
              </div>
            )}
            {HeaderRightComponent && (
              <div>
                <HeaderRightComponent path={path} />
              </div>
            )}
          </Toolbar>
        </AppBar>
        {MenuComponent && (
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
          >
            <Button onClick={toggle} className={classes.toolbar}>
              <div className={classes.toolbarContent}>This is Mat</div>
              <ChevronLeftIcon />
            </Button>
            <Divider />
            <MenuComponent path={path} />
          </Drawer>
        )}
        {MainComponent && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <MainComponent path={path} />
          </main>
        )}
      </div>
    )
  }
}
export default enhancer(Dashboard)
