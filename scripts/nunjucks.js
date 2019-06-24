/* global hexo */
"use strict"

const nunjucks = require("nunjucks")
const path = require("path")
const fs = require('fs')

function ExtLoader(ext, searchPaths, opts) {
	this.ext = ext
	this._loader = new nunjucks.FileSystemLoader(searchPaths, opts)
	return this
}

ExtLoader.prototype.getSource = function (name) {
	return this._loader.getSource(name + this.ext)
}

function njkCompile(data) {
	const templateDir = path.dirname(data["path"])
	const config = Object.assign({"autoescape": false}, hexo.config.nunjucks)
	const env = new nunjucks.Environment([
		new nunjucks.FileSystemLoader([templateDir], config),
		new ExtLoader('.njk', [templateDir], config),
	], config)
	for (const name in hexo.extend.helper.list()) {
		env.addFilter(name, hexo.extend.helper.get(name))
	}
	return nunjucks.compile(data["text"], env, data["path"])
}

let njkRenderer = (data, locals, callback) =>
	njkCompile(data).render(locals, callback)

// Return a compiled renderer.
njkRenderer.compile = (data) =>
	// Need a closure to keep the compiled template.
	(locals, callback) => njkRenderer(data, locals, callback)

hexo.extend.renderer.register("njk", "html", njkRenderer);
hexo.extend.renderer.register("nunjucks", "html", njkRenderer);
hexo.extend.renderer.register("j2", "html", njkRenderer);
