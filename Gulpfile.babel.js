import gulp from 'gulp';
import del from 'del';
import sass from 'gulp-ruby-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';


const SRC = './src';
const EXAMPLE_SRC = './example';
const DIST = './dist';
const DIST_EXAMPLE = './distExample';
const SCSS = '/scss';
const JS   = '/js';

const PROD_CONFIG = {
  sass: { style: 'compressed' },
  browserify: {},
};

const DEV_CONFIG = {
  sass: { style: 'expanded', sourcemap: true },
  browserify: { debug: true },
};


function styles(source, dist, isProd, isServer) {
  const config = isProd ? PROD_CONFIG : DEV_CONFIG;

  return sass(source, config.sass)
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 version'],
      })
    ]))
    .pipe(gulpif(isProd, rename({ suffix: '.min' })))
    .pipe(gulp.dest(dist))
    .pipe(gulpif(isServer, browserSync.stream()));
}

function scripts(isProd) {
  return gulp.src(`${SRC}${JS}/index.js`)
    .pipe(babel())
    .pipe(gulpif(isProd, uglify()))
    .pipe(gulpif(isProd, rename({ suffix: '.min' })))
    .pipe(gulp.dest(DIST));
}



gulp.task('clean', (callback) => {
  return del([DIST], callback);
});


gulp.task('styles', () => {
  const source = `${SRC}${SCSS}/react-buttons.scss`;

  styles(source, DIST, false, false);
  return styles(source, DIST, true, false);
});

gulp.task('scripts', () => {
  scripts(false);
  return scripts(true);
});

gulp.task('dist', ['clean', 'styles', 'scripts']);

gulp.task('default', ['dist']);



gulp.task('statics:example', () => {
  gulp.src(`${EXAMPLE_SRC}/index.html`).pipe(gulp.dest(DIST_EXAMPLE));
});

gulp.task('styles:example', () => {
  return styles(`${EXAMPLE_SRC}${SCSS}/main.scss`, DIST_EXAMPLE, false, true);
});
gulp.task('styles-watch:example', ['styles:example']);


gulp.task('scripts:example', () => {
  const bundle = browserify(DEV_CONFIG.browserify);
  bundle.add(`${EXAMPLE_SRC}${JS}/index.js`);
  bundle.transform(babelify);

  return bundle.bundle()
    .on('error', (err) => {
      console.error(`[SCRIPTS ERROR]`, err.message);
      this.emit('end');
    }.bind(this))
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulp.dest(DIST_EXAMPLE));
});
gulp.task('scripts-watch:example', ['scripts:example'], browserSync.reload);

gulp.task('dist:example', ['styles:example', 'scripts:example', 'statics:example']);
gulp.task('serve', ['dist:example'], () => {
  browserSync({
    server: {
      baseDir: DIST_EXAMPLE
    }
  });

  gulp.watch(['./src/**/*.js', './example/**/*.js'], ['scripts-watch:example']);
  gulp.watch(['./src/**/*.scss', './example/**/*.scss'], ['styles-watch:example']);
});
