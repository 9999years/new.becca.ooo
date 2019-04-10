#!/bin/sh
set -ev

# keep this in sync with dev.ps1
git lfs fetch
git lfs checkout
rm -rf static/css
mkdir static/css
sass assets/styles:static/css
hugo --verbose
