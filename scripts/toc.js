/* globals hexo: true */

var assign = require('object-assign');
var TocFilter = require('./hexo-toc/filter');
var slugify = require('./hexo-toc/slugify');

var config = hexo.config.toc || {};
hexo.config.toc = assign({}, config, { slugify: slugify.func(hexo.config.marked.modifyAnchors) });

const filt = new TocFilter(hexo.config.toc)

hexo.extend.filter.register('before_post_render', d => filt.insert(d));
hexo.extend.filter.register('after_post_render', d => filt.heading(d));

/*
 * the plugin should be after_post_render
 * should replace the comment token with the toc
 * user-configurable prepending and appended material
 *
 * generate toc by scraping html for h* tags
 * let user determine how tags are chosen?
 * use cheerio for the vdom?
 */
