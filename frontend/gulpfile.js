const gulp = require("gulp");
const concat = require("gulp-concat");
const jsoncombine = require("gulp-jsoncombine");
const jsonConcat = require("gulp-json-concat");
const jsonMerge = require("gulp-merge-json");

const translations = ["en"];
gulp.task("merge", function (done) {
  for (let translation of translations) {
    gulp
      .src(`./src/app/**/*.${translation}.json`)
      .pipe(
        jsonMerge({
          fileName: `${translation}.json`,
        })
      )
      .pipe(gulp.dest("./dist/iNutrix/assets/i18n"));
  }
  done();
});

gulp.task("mergeDev", function (done) {
  for (let translation of translations) {
    gulp
      .src(`./src/app/**/*.${translation}.json`)
      .pipe(
        jsonMerge({
          fileName: `${translation}.json`,
        })
      )
      .pipe(gulp.dest("./src/assets/i18n"));
  }
  done();
});
