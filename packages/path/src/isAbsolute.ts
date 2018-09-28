import {
  CHAR_FORWARD_SLASH,
  CHAR_COLON,
  CHAR_LOWERCASE_A,
  CHAR_UPPERCASE_Z,
  CHAR_LOWERCASE_Z,
  CHAR_UPPERCASE_A,
} from "./constants"
const isA2Z = (code: number) => {
  return code >= CHAR_UPPERCASE_A && code <= CHAR_UPPERCASE_Z
    || code >= CHAR_LOWERCASE_A && code <= CHAR_LOWERCASE_Z
}
/**
 * 判断是不是绝对地址  "^([a-zA-Z]+:\/\/|\/)"
 * @param path
 */
export const isAbsolute = (path: string): boolean => {
  const len = path.length
  if (len === 0) { return false }
  if (path.charCodeAt(0) === CHAR_FORWARD_SLASH) { return true }
  let matchSlash = 0
  let matchColon = 0
  for (let i = 0; i < len; i++) {
    const code = path.charCodeAt(i)
    if (code === CHAR_COLON) {
      if (matchColon) { return false }
      matchColon++
    } else if (code === CHAR_FORWARD_SLASH) {
      if (matchColon !== 1) {
        return false
      } else if (matchSlash === 1) {
        return true
      } else {
        matchSlash++
      }
    } else if (isA2Z(code)) {
      continue
    } else {
      return false
    }
  }
  return false
}
