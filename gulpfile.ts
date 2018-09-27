// copy packages
// copy
import gulp from "gulp"
import jeditor from "gulp-json-editor"
import ts from "gulp-typescript"
import del from "del"

const tsProject = ts.createProject("tsconfig.prod.json")
// task for typescript
gulp.task("ts", () => {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("build/packages"))
})
const editPackageJson = jeditor((pkg: any) => {
  delete pkg.devDependencies
  delete pkg.scripts
  return pkg
})
// packages/*/package.json
gulp.task("packages-package.json", () => {
  return gulp.src("packages/*/package.json")
    .pipe(editPackageJson)
    .pipe(gulp.dest("./build/packages"))
})

// package.json
gulp.task("package.json", () => {
  return gulp.src("package.json")
    .pipe(editPackageJson)
    .pipe(gulp.dest("build"))
})
gulp.task("clean", () => del("build"))
const build = gulp.series(
  "clean",
  gulp.parallel("package.json", "packages-package.json", "ts"),
)
gulp.task("default", build)
