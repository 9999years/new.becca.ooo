#!/bin/sh

sass --sourcemap=none --update assets/css:static/css
hugo
