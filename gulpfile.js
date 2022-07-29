const gulp = require("gulp");
const gulpless = require("gulp-less");
const debug = require("gulp-debug");
var csso = require("gulp-csso");
const NpmImportPlugin = require("less-plugin-npm-import");

gulp.task("less", async function () {
  return gulp
    .src("src/styles/antd/*-theme.less")
    .pipe(debug({ title: "Less files:" }))
    .pipe(
      gulpless({
        javascriptEnabled: true,
        plugins: [new NpmImportPlugin({ prefix: "~" })],
      })
    )
    .pipe(
      csso({
        debug: true,
      })
    )
    .pipe(gulp.dest("public/css"));
});
