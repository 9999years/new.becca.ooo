#!/bin/sh

sass --unix-newlines --sourcemap=none --update assets/css:static/css
hugo --verbose
