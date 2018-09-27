import OSS from "ali-oss"
import React, { Component } from "react"
import { Provider as ContextProvider, IContextProps } from "./context"
import * as path from "@app/path"
export interface IProviderProps {
  // 是否包含文件后缀
  ext?: boolean
  types?: string[]
  fetchOpts(): Promise<{
    opts: OSS.ClientOpts,
    // 有效期截止时间
    expire: number,
    dir: string,
    namespace: string,
  }>
}
interface IProviderState {
  opts: OSS.ClientOpts | null
  expire: number
  client: OSS | null
  dir: string
  namespace: string
  err: Error | string
}
export class Provider extends Component<IProviderProps, IProviderState> {
  public static defaultProps: Partial<IProviderProps> = {
    ext: true,
    types: [".gif", ".png", ".jpg", ".jpeg"],
  }
  private timeout: number = 0
  constructor(props: IProviderProps) {
    super(props)
    const { expire, opts } = JSON.parse(localStorage.getItem("oss") || "") || { expire: 0, opts: null }
    if (!expire || Date.now() > expire || !opts) {
      this.state = { opts: null, expire: 0, client: null, err: "", dir: "", namespace: "" }
    } else if (opts) {
      this.state = { opts, expire, client: null, err: "", dir: "", namespace: "" }
    }
  }
  public render() {
    const { client, err } = this.state
    if (err) {
      if (typeof err === "string") {
        return <div>OSS Error: {err}</div>
      } else {
        return (
          <div>
            <h2>OSS Error</h2>
            <h4>{err.name}</h4>
            <pre>{err.stack}</pre>
          </div>
        )
      }
    } else if (!client) {
      return (
        <div>
          <h2>正在加载OSS配置</h2>
        </div>
      )
    } else {
      return <ContextProvider value={{ client, upload: this.upload }} children={this.props.children} />
    }
  }
  public componentDidMount() {
    if (this.state.opts) {
      this.setState({ client: new OSS(this.state.opts) })
      if (this.state.expire) {
        this.timeout = window.setTimeout(() => this.fetchOpts, this.state.expire - Date.now())
      }
    } else {
      this.fetchOpts()
    }
  }

  public componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  private fetchOpts = () => {
    this.props.fetchOpts()
      .then(({ opts, expire, dir, namespace }) => {
        localStorage.setItem("oss", JSON.stringify({ opts, expire }))
        this.setState({ opts, expire, client: new OSS(opts), err: "", dir, namespace })
        clearTimeout(this.timeout)
        if (expire) {
          this.timeout = window.setTimeout(this.fetchOpts, this.state.expire - Date.now())
        }
      }, (err) => {
        this.setState(err)
      })
  }
  private upload: IContextProps["upload"] = async (opts) => {
    const file = opts.files![0]
    let id = opts.filename || Date.now().toString()
    if (this.props.ext) { id += "." + file.type.split("/")[1] }
    const client = this.state.client!
    const name = path.join(this.state.dir, this.state.namespace, id)
    await client.put(name, file)
    return { path: path.join(this.state.namespace, id), url: client.generateObjectUrl(id) }
  }
}
