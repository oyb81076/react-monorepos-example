import { CHAR_FORWARD_SLASH } from "./constants"
import { normalizeString } from "./normalizeString"
export const resolve = (...paths: string[]) => {
  let resolvedPath = '';
  let resolvedAbsolute = false;
  let cwd;

  for (let i = paths.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    let path;
    if (i >= 0) {
      path = paths[i];
    } else {
      if (cwd === undefined) {
        cwd = location.host
      }
      path = cwd;
    }
    if (path.length === 0) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);

  if (resolvedAbsolute) {
    if (resolvedPath.length > 0)
      return '/' + resolvedPath;
    else
      return '/';
  } else if (resolvedPath.length > 0) {
    return resolvedPath;
  } else {
    return '.';
  }
}
