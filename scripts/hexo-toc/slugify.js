var { stripHTML, slugize } = require('hexo-util');
var he = require('he');

function anchorId(str, transformOption) {
	return slugize(he.escape(stripHTML(str)).trim(),
		{transform: transformOption});
}

// copied (essentially) from hexo-renderer-marked (/lib/renderer.js)
exports.func = function (modifyAnchors) {
	return function(text) {
		var id = anchorId(text, modifyAnchors)
		var headingId = {}

		// Add a number after id if repeated
		if (headingId[id]) {
			id += '-' + headingId[id]++
		} else {
			headingId[id] = 1
		}

		// add headerlink
		return id
	}
}
