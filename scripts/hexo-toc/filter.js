var toc = require('markdown-toc');
var assign = require('object-assign');
const { stripHTML } = require('hexo-util');

function TocFilter(opts) {
  this.opts = opts
}

TocFilter.prototype.insert = function (data) {
  data.content = toc.insert(data.content, this.opts)
  return data
}

TocFilter.prototype.heading = function (data) {
  data.content = data.content.replace(
    "<!-- toc -->", this.opts.before || ""
    ).replace(
    "<!-- tocstop -->", this.opts.after || ""
    )

  return data
}

module.exports = TocFilter
