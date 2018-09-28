import * as path from "../src"
// import * as path2 from "path"
describe("path", () => {
  test("extname", () => {
    expect(path.extname(__filename)).toEqual(".ts")
  })
  test("join", () => {
    expect(path.join("ouay", "", "/", "nick")).toEqual("ouay/nick")
  })
  test("parse", () => {
    const pathObject = path.parse("http://localhost:22/oyb/n.ts")
    expect(pathObject).toEqual({
      root: "",
      dir: "http://localhost:22/oyb",
      ext: ".ts",
      name: "n",
      base: "n.ts",
    })
  })
  test("format:http", () => {
    const filename = "http://localhost:22/oyb/n.ts"
    expect(filename).toEqual(path.format(path.parse(filename)))
  })
  test("format://", () => {
    const filename = "//localhost:22/oyb/n.ts"
    expect(filename).toEqual(path.format(path.parse(filename)))
  })
  test("format:/", () => {
    const filename = "/oyb/n.ts"
    expect(filename).toEqual(path.format(path.parse(filename)))
  })
})
