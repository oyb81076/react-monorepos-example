import { CHAR_FORWARD_SLASH } from "./constants"
import { isAbsolute } from "./isAbsolute"
import { normalizeString } from "./normalizeString"

export const normalize = (path: string) => {
  if (path.length === 0) {
    return "."
  }
  const absolute = isAbsolute(path)
  const trailingSeparator = path.charCodeAt(path.length - 1) === CHAR_FORWARD_SLASH
  // Normalize the path
  path = normalizeString(path, !absolute)
  if (path.length === 0 && !absolute) { path = "." }
  if (path.length > 0 && trailingSeparator) { path += "/" }
  if (absolute) { return "/" + path }
  return path
}
