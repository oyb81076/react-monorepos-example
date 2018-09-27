import { normalize } from "./normalize"
export const join = (...paths: string[]) => {
  if (paths.length === 0) {
    return '.';
  }
  let joined;
  for (const arg of paths) {
    if (arg.length > 0) {
      if (joined === undefined) {
        joined = arg;
      } else {
        joined += '/' + arg
      }
    }
  }
  if (joined === undefined) { return '.' }
  return normalize(joined)
}
