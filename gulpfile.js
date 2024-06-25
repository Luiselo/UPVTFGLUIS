const { src, dest, watch , series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss    = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin'); // Minificar imagenes 
const notify = require('gulp-notify');
const cache = require('gulp-cache');
const clean = require('gulp-clean');
const pdfjsLib = require('pdfjs-dist');
const webpack = require('webpack-stream');


const webp = require('gulp-webp');
const paths = {
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    imagenes: 'src/img/**/*',
    pdfjs: 'node_modules/pdfjs-dist/build/pdf.min.js', // Ruta al archivo pdf.min.js
}

function css() {
    return src(paths.scss)

        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        // .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe( dest('public/build/css') );
}


function javascript() {
    return src(paths.js) // Agrega paths.pdfjs al arreglo de archivos a procesar
        .pipe(terser())
        .pipe(sourcemaps.write('.'))    
        .pipe(dest('public/build/js'));
}

function dev(done) {
    watch( paths.scss, css );
    watch( paths.js, javascript );
    watch( paths.imagenes, imagenes)
    watch( paths.imagenes, versionWebp)
    watch( paths.imagenes, versionAvif)
    done()
}

function imagenes() {
    return src(paths.imagenes)
        .pipe(cache(imagemin({ optimizationLevel: 3})))
        .pipe(dest('public/build/img'))
        .pipe(notify({ message: 'Imagen Completada'}));
}

function versionWebp() {
    return src(paths.imagenes)
        .pipe( webp() )
        .pipe(dest('public/build/img'))
        .pipe(notify({ message: 'Imagen Completada'}));
}

function pdfjs() {
    return src(paths.pdfjs)
        .pipe(dest('public/build/js'))
        ;
}

function watchArchivos() {
    watch( paths.scss, css );
    watch( paths.js, javascript );
    watch( paths.imagenes, imagenes );
    watch( paths.imagenes, versionWebp );
}
  
exports.css = css;
exports.watchArchivos = watchArchivos;
exports.pdfjs = pdfjs; // Agregar la tarea pdfjs
exports.default = parallel(css, javascript, imagenes, versionWebp, pdfjs, watchArchivos);
