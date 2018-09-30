import React from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import LockIcon from "@material-ui/icons/LockOutlined"
import CircularProgress from "@material-ui/core/CircularProgress"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import withStyles, { StyleRulesCallback } from "@material-ui/core/styles/withStyles"
import { Theme } from "@material-ui/core/styles"
import axios from "axios"
type ClassKey = "layout" | "paper" | "avatar" | "form" | "submit"
const styles: StyleRulesCallback<ClassKey> = (theme: Theme) => ({
  layout: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
})
interface IProps {
  classes: Record<ClassKey, string>
}
interface IState {
  username: string
  password: string
  submitting: boolean
  error: Error | null
}
class SignIn extends React.Component<IProps, IState> {
  public state: IState = {
    username: "root",
    password: "root",
    submitting: false,
    error: null,
  }
  private source = axios.CancelToken.source()
  public render() {
    const { classes } = this.props
    return (
      <>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">用户登录</Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">账号</InputLabel>
                <Input
                  id="username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={this.state.username}
                  onChange={this.handleChangeUsername}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">密码</InputLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handleChangePassword}
                />
              </FormControl>
              {this.state.error && <pre>{this.state.error.stack}</pre>}
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
                disabled={this.state.submitting}
              >
                {this.state.submitting &&
                  <CircularProgress style={{ marginRight: 10 }} size={"1em"} />
                }
                登录
              </Button>
            </form>
          </Paper>
        </main>
      </>
    )
  }
  public componentWillUnmount() {
    this.source.cancel()
  }
  private handleChangeUsername: JSX.IntrinsicElements["input"]["onChange"] = (e) => {
    this.setState({ username: e.target.value })
  }
  private handleChangePassword: JSX.IntrinsicElements["input"]["onChange"] = (e) => {
    this.setState({ password: e.target.value })
  }
  private handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const { username, password } = this.state
    this.setState({ submitting: true, error: null })
    axios
      .post<{ token: string }>(
        "/api/sign/in", { username, password },
        { cancelToken: this.source.token },
      )
      .then(({ data: { token } }) => {
        localStorage.setItem("token", token)
      }, (error) => {
        this.setState({ error, submitting: false })
      })
  }
}
export default withStyles(styles)(SignIn)
