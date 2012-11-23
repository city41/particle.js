#!/bin/bash

pushd r
r.js -o build.js
popd

rake jasmine:ci

