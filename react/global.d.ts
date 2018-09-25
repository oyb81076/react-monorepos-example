declare var __PRO__: boolean
declare var __DEV__: boolean

interface Window {
  __REDUX_DEVTOOLS_EXTENSION__?: Function
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function
}
interface NodeModule {
  hot?: {
    accept(paths: string[] | string, callback: () => void): void
    accept(callback: () => void): void
  }
}

type Omit<T, K extends keyof T> = Pick<T, ({ [P in keyof T]: P } & { [P in K]: never } & { [x: string]: never })[keyof T]>;
