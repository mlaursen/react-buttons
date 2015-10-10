import gulp from 'gulp';
import gutil from 'gulp-util';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';
import sass from 'gulp-ruby-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
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
const EXAMPLE_DIST = './distExample';
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
    .pipe(isProd ? rename({ suffix: '.min' }) : gutil.noop())
    .pipe(isServer ? sourcemaps.init({ loadMaps: true }) : gutil.noop())
    .pipe(isServer ? sourcemaps.write('./') : gutil.noop())
    .pipe(gulp.dest(dist))
    .pipe(isServer ? browserSync.stream() : gutil.noop());
}

function bundle(isDist, isProd) {
  const src = isDist ? SRC : EXAMPLE_SRC;
  const dist = isDist ? DIST : EXAMPLE_DIST;
  const filename = isDist ? 'index.js' : 'bundle.js';

  const config = isProd ? PROD_CONFIG : DEV_CONFIG;
  const bundle = browserify(config.browserify);
  bundle.add(`${src}${JS}/index.js`);
  bundle.transform(babelify);

  if(isDist) {
    const { peerDependencies } = require('./package.json');

    const libs = Object.keys(peerDependencies).forEach(dep => {
      bundle.external(dep);
    });
  }

  return bundle.bundle()
    .on('error', function(err) {
      gutil.log(gutil.colors.red('ERROR'), err.message);
      this.emit('end');
    })
    .pipe(source(filename))
    .pipe(buffer())
    .pipe(!isDist ? sourcemaps.init({ loadMaps: true }) : gutil.noop())
    .pipe(!isDist ? sourcemaps.write('./') : gutil.noop())
    .pipe(isProd ? uglify() : gutil.noop())
    .pipe(isProd ? rename({ suffix: '.min' }) : gutil.noop())
    .pipe(gulp.dest(dist));
}


gulp.task('clean', (callback) => {
  return del([DIST, EXAMPLE_DIST], callback);
});


gulp.task('styles', () => {
  const source = `${SRC}${SCSS}/react-buttons.scss`;

  styles(source, DIST, false, false);
  return styles(source, DIST, true, false);
});

gulp.task('scripts', () => {
  bundle(true, false);
  return bundle(true, true);
});

gulp.task('dist', ['clean', 'styles', 'scripts']);

gulp.task('default', ['dist']);



gulp.task('statics:example', () => {
  gulp.src(`${EXAMPLE_SRC}/index.html`).pipe(gulp.dest(EXAMPLE_DIST));
});

gulp.task('styles:example', () => {
  return styles(`${EXAMPLE_SRC}${SCSS}/main.scss`, EXAMPLE_DIST, false, true);
});
gulp.task('styles-watch:example', ['styles:example']);


gulp.task('scripts:example', () => {
  return bundle(false, false);
});
gulp.task('scripts-watch:example', ['scripts:example'], browserSync.reload);

gulp.task('dist:example', ['styles:example', 'scripts:example', 'statics:example']);
gulp.task('serve', ['dist:example'], () => {
  browserSync({
    server: {
      baseDir: EXAMPLE_DIST
    }
  });

  gulp.watch(['./src/**/*.js', './example/**/*.js'], ['scripts-watch:example']);
  gulp.watch(['./src/**/*.scss', './example/**/*.scss'], ['styles-watch:example']);
});
