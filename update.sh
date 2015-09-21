#!/usr/bin/env bash

# Shell script for updating Jasmine and other dependencies (client-only)

# Set up based on current directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Update / get packages from NPM
cd $DIR && bower install

# Copy files
JASMINE_ROOT="$DIR/bower_components/jasmine-core/lib/jasmine-core"
cp $JASMINE_ROOT/jasmine.js $DIR/
cp $JASMINE_ROOT/jasmine.css $DIR/
cp $JASMINE_ROOT/jasmine-html.js $DIR/
