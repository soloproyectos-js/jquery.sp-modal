#!/bin/bash
# This script creates the distribution files. Usage:
# ./make-dist.sh

# remove dist files 
rm -rf dist/*

# compresses JavaScript files
cat \
    src/jquery.sp-modal-eventable.js \
    src/jquery.sp-modal-window.js \
    src/jquery.sp-modal-ui.js \
    src/jquery.sp-modal-dialog.js \
    src/jquery.sp-modal-loading.js \
    src/jquery.sp-modal-progress.js \
    src/jquery.sp-modal-message.js \
    src/jquery.sp-modal.js \
| uglifyjs \
    --compress \
    --mangle \
    --preamble "/*! jQuery.spModal v0.3.0 | Copyright (c) 2015 Gonzalo Chumillas | https://github.com/soloproyectos-js/jquery.sp-modal/blob/master/LICENSE */" \
    -o dist/jquery.sp-modal.min.js

# compresses CSS files
cat \
    src/jquery.sp-modal-window.css \
    src/jquery.sp-modal-ui.css \
    src/jquery.sp-modal-loading.css \
    src/jquery.sp-modal-progress.css \
    src/jquery.sp-modal-message.css \
| uglifycss > dist/jquery.sp-modal.min.css
cp -rp src/images dist/images
