// 至今不知道这个函数有啥用处
export const format = (pathObject: { root: string, dir: string, base: string, ext: string, name?: string }) => {
  const sep = "/"
  const dir = pathObject.dir || pathObject.root
  const base = pathObject.base ||
    ((pathObject.name || "") + (pathObject.ext || ""))
  if (!dir) {
    return base
  }
  if (dir === pathObject.root) {
    return dir + base
  }
  return dir + sep + base
}
