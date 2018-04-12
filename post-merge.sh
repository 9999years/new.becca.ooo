#!/bin/sh

# keep this in sync with dev.ps1
rm -rf static/css/*
sass --unix-newlines --sourcemap=none -E UTF-8 --update assets/css:static/css
hugo --verbose
