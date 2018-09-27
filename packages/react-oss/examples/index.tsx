import React from "react"
import { Provider, IProviderProps } from "../src/Provider"
import { Consumer } from "../src/context"
const fetchOpts: IProviderProps["fetchOpts"] = async () => ({
  expire: 3600,
  opts: {
    accessKeyId: "",
    accessKeySecret: "",
    stsToken: "",
  },
  // 项目文件夹目录
  dir: "",
  // 项目
  namespace: "",
})
export const Example = () =>
  <Provider fetchOpts={fetchOpts}>
    <Consumer>
      {({ upload }) =>
        <div>
          <input type="file" onChange={(e) => {
            upload({ files: e.target.files })
              .then((props) => {
                // tslint:disable-next-line:no-console
                console.log(props.path)
              })
          }} />
        </div>
      }
    </Consumer>
  </Provider>
