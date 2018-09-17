import { withStyles, Theme } from "@material-ui/core/styles";

const drawerWidth = 240
type DashboardStyleClassKey =
  "root"
  | "appBar" | "appBarShift" | "appBarToolbar"
  | "menuButton" | "hide"
  | "drawerPaper" | "drawerPaperClose"
  | "toolbar" | "toolbarContent"
  | "content"
  | "headerLink" | "headerLinkActive"
  | "menuLink" | "menuLinkActive" | "menuLinkColorPrimary"
export interface IDashboardStyleProps { classes: Record<DashboardStyleClassKey, string> }
export type DashboardStyleComponent<P> = React.ComponentType<IDashboardStyleProps & P>
export const styles = withStyles<DashboardStyleClassKey>((theme: Theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    minHeight: "100vh",
    overflow: "hidden",
    position: "relative",
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarToolbar: {
    paddingRight: 24,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    height: 48,
  },
  toolbarContent: {
    flex: 1,
    paddingLeft: theme.spacing.unit * 7,
    cursor: "default",
    textAlign: "left",
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  headerLink: {
    color: theme.palette.common.white,
    height: 48,
  },
  headerLinkActive: {
    backgroundColor: theme.palette.primary.dark,
  },

  menuLink: { textDecoration: "none" },
  menuLinkActive: {
    "&, &:hover": {
      backgroundColor: theme.palette.primary.main,
    },
    "& $menuLinkColorPrimary": {
      color: theme.palette.common.white,
    },
  },
  menuLinkColorPrimary: {
  },
}))
