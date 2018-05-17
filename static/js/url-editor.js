// url_in.value is the input url, url_out is where the stuff is put

// a URL with an added .pathList, a list of strings with one per path-segment;
// corresponds to .pathname. when you edit .pathList, call .updatePath as well
// to keep everything in sync
//
// similar to .searchParams, url has .hashParams; call .updateHash to keep it
// in sync after mutating .hashParams
var url

let $ = id => document.getElementById(id)

let input_change_fn = fn => {
	return e => {
		fn(e)
		display_url()
	}
}

// opts:
// edit: bool (is editable)
// change: fn (callback for edit)
// class: str (element class)
function make_field(value, opts={}) {
	var key
	if(opts.edit) {
		key = document.createElement('input')
		key.value = value
		if(opts.change) {
			let handler = input_change_fn(opts.change)
			key.addEventListener('change', handler, false)
			key.addEventListener('input', handler, false)
		}
		if(opts.placeholder) {
			key.setAttribute('placeholder', opts.placeholder)
		}
	} else {
		key = document.createElement('span')
		key.innerText = value
	}
	if(opts.class) {
		key.className = opts.class
	}
	return key
}

let delete_func = fn => {
	return e => {
		fn(e.target.parentElement)
		display_url()
	}
}

function make_link(click, txt='×', link_class='del') {
	let delete_link = document.createElement('a')
	delete_link.addEventListener('click', click)
	delete_link.innerHTML = txt
	delete_link.className = link_class
	return delete_link
}

function make_add_link(click, txt='+', link_class='add') {
	return make_link(click, txt, link_class)
}

// accepted keys in opts:
// delim: delimiter b/w key and val
// delete: bool (if row is deletable)
// ondelete: fn
// order: bool (if row is reorderable)
// onreorder: fn
// class: the returned div's class name
// key:
//     edit: bool (if key is editable)
//     change: fn
//     placeholder: str
// val:
//     (same as key)
function make_row(key, val, opts={}) {
	let new_row = document.createElement('div')
	new_row.className = opts.class || 'row'
	if(key !== undefined) {
		if(opts.key === undefined) {
			opts.key = {}
		}
		if(opts.key) {
			opts.key.class = 'key'
		}
		new_row.append(make_field(key, opts.key))
		new_row.append(opts.delim || ': ')
	}

	if(val !== undefined) {
		if(opts.val === undefined) {
			opts.val = {}
		}
		if(opts.val) {
			opts.val.class = 'val'
		}
		new_row.append(make_field(val, opts.val))
	}
	if(opts.delete) {
		// TODO icon?
		new_row.append(make_link(delete_func(opts.delete)))
	}
	// TODO reordering code
	return new_row
}

// opts: see make_row, and
// target: Element or Node to append to
function add_row(key, val, opts={}) {
	(opts.target || url_out).append(make_row(key, val, opts))
}

// strip trailing :
let display_protocol = prot => prot.substring(0, prot.indexOf(':'))
let set_protocol = newprot => newprot + ':'
// strip leading /
let display_path = path => path.substring(1)
let set_path = newpath => '/' + newpath
// strip leading #
let display_hash = hash => hash.length === 0 ? '' : hash.substring(1)
let set_hash = hash => hash.length === 0 ? '' : '#' + hash

// hash is '' or '#...' (i.e. a URL.hash)
// lmfao? everything on stack overflow was worse than this
let hash_to_params = hash => new URL('http://a.a/?' + display_hash(hash)).searchParams

// adds a new row with a static, i.e. uneditable, key field IFF val is defined
// and non-empty
//
// opts: an add_row opts dict with the following keys
// val: fn: applied to val if val is defined and non-empty
function maybe_mutable_row(key, val, opts={}) {
	if(val !== undefined && val !== "") {
		if(opts.val !== undefined && opts.val.fn != undefined) {
			val = opts.val.fn(val)
		}

		if(opts.key === undefined) {
			opts.key = {}
		}
		if(opts.key.edit === undefined) {
			opts.key.edit = true
		}

		if(opts.val === undefined) {
			opts.val = {}
		}
		if(opts.val.edit === undefined) {
			opts.val.edit = true
		}

		add_row(key, val, opts)
	}
}

let get_section = sec => document.getElementById('section-' + sec)

function make_section(title) {
	let ret = document.createElement('div')
	ret.className = 'section'
	ret.setAttribute('id', 'section-' + title.replace(/ /g, '-'))
	if(title) {
		let header = document.createElement('h2')
		header.innerHTML = title
		ret.append(header)
	}
	return ret
}

let get_key = row => row.getElementsByClassName('key')[0]
let get_val = row => row.getElementsByClassName('val')[0]

let reparse = () => {
	display_url()
	parse_url_in()
}

let delete_param_abstract = (row, params) => params.delete(get_key(row).value)

let delete_param = row => {
	delete_param_abstract(row, url.searchParams)
	row.remove()
}

let delete_all_params = e => {
	url.search = ''
	reparse()
}

function set_param_abstract(e, params) {
	let row = e.target.parentElement
	if(e.target.className == "key") {
		let new_key = e.target.value
		params.delete(e.target.getAttribute('data-old'))
		// update the attribute for future renames
		e.target.setAttribute('data-old', new_key)
		params.set(new_key, get_val(row).value)
	} else if(e.target.className = "val") {
		params.set(get_key(row).value, e.target.value)
	}
}

let set_param = e => set_param_abstract(e, url.searchParams)

let set_hash_param = e => {
	set_param_abstract(e, url.hashParams)
	url.updateHash()
}

let delete_hash_param = row => {
	delete_param_abstract(row, url.hashParams)
	url.updateHash()
	row.remove()
}

let delete_all_hash_params = e => {
	url.hash = ''
	reparse()
}

function make_param(k, v, set_fn=set_param, delete_fn=delete_param) {
	let row = make_row(k, v, {
		delete: delete_fn,
		delim: '=',
		key: { edit: true, change: set_fn },
		val: { edit: true, change: set_fn }
	})
	// store the key in an attribute so we know which key to edit in
	// url.searchParams when we rename it
	get_key(row).setAttribute('data-old', k)
	return row
}

function add_param(e, section='parameters',
		set_fn=set_param, delete_fn=delete_param) {
	get_section(section).insertBefore(
		make_param('', '', set_fn=set_fn, delete_fn=delete_fn),
		e.target.parentElement)
}

let add_hash_param = e => add_param(e, '#', set_hash_param, delete_hash_param)

// sets up the params portion of the page
function parse_params(searchParams, title_txt='parameters',
		add_fn=add_param, set_fn=set_param, delete_fn=delete_param,
		delete_all_fn=delete_all_params) {
	let container = make_section(title_txt)
	let title = container.firstElementChild
	title.append(make_link(delete_all_fn))

	for(param of searchParams) {
		container.append(make_param(param[0], param[1], set_fn, delete_fn))
	}

	let add_link = document.createElement('div')
	add_link.className = 'row'
	add_link.append(make_add_link(add_fn))
	container.append(add_link)

	url_out.append(container)
}

let get_index = row => +row.getAttribute('data-index')
let set_index = (row, inx) => row.setAttribute('data-index', inx)

let decrement_path_indicies_after = i => {
	let rows = get_section('path').getElementsByClassName('row')
	var inx = -1
	for(row of rows) {
		inx = get_index(row)
		if(inx > i) {
			set_index(row, inx - 1)
		}
	}
}

let delete_path = row => {
	inx = get_index(row)
	url.pathList.splice(inx, 1)
	url.updatePath()
	decrement_path_indicies_after(inx)
	row.parentElement.remove()
}

let change_path = e => {
	row = e.target.parentElement
	url.pathList[get_index(row)] = e.target.value
	url.updatePath()
}

function make_path_li(dir, index) {
	let li = document.createElement('li')
	li.append(make_row(undefined, dir, {
		delete: delete_path,
		val: {
			edit: true,
			change: change_path,
		}
	}))
	// first child is the div.row
	li.firstElementChild.setAttribute('data-index', index)
	return li
}

let add_path_part = e => {
	li = e.target.parentElement
	li.parentElement.insertBefore(make_path_li('', url.pathList.length), li)
	// hack to make indexes work right when you add multiple empty path
	// segments at once, bc blank segments are truncated causing
	// pathList.length to misalign with the length of this list
	url.pathList.push('')
}

// sets up the path portion of the page
function parse_path(pathname) {
	let container = make_section('path')
	let list = document.createElement('ul')
	if(pathname !== '/') {
		let dirs = display_path(pathname).split('/')
		var i = 0
		for(dir of dirs) {
			list.append(make_path_li(dir, i))
			i++
		}
	}

	// add link
	let li = document.createElement('li')
	li.append(make_add_link(add_path_part))
	list.append(li)

	container.append(list)
	url_out.append(container)
}

// true if string is probably a query string
// maybe false positives, no false negatives
function probably_query_string(str) {
	if(str.indexOf('&') !== -1) {
		return true
	} else if(str.indexOf('=') !== -1) {
		return true
	} else {
		return false
	}
}

// given a url, sets up everything
function parse(newurl) {
	url = new URL(newurl)
	url.pathList = display_path(url.pathname).split('/')
	url.updatePath = url_update_path
	url.updateHash = url_update_hash
	url_out.innerHTML = ''
	maybe_mutable_row('protocol', url.protocol, {
		key: { edit: false },
		val: {
			fn: display_protocol,
			change: e => url.protocol = set_protocol(e.target.value)
		}
	})
	// hostname: composed of host:port
	// origin: scheme, domain, and port
	maybe_mutable_row('user', url.username, {
		key: { edit: false },
		val: { change: e => url.username = e.target.value }
	})
	maybe_mutable_row('password', url.password, {
		key: { edit: false },
		val: { change: e => url.password = e.target.value }
	})
	maybe_mutable_row('host', url.hostname, {
		key: { edit: false },
		val: { change: e => url.hostname = e.target.value }
	})
	maybe_mutable_row('port', url.port, {
		key: { edit: false },
		val: { change: e => url.port = e.target.value }
	})
	parse_path(url.pathname)
	parse_params(url.searchParams)
	if(probably_query_string(url.hash)) {
		url.hashParams = hash_to_params(url.hash)
		parse_params(url.hashParams, title_text='#',
			add_hash_param, set_hash_param, delete_hash_param,
			delete_all_hash_params)
	} else {
		maybe_mutable_row('#', url.hash, {
			key: { edit: false },
			val: {
				fn: display_hash,
				change: e => url.hash = set_hash(e.target.value)
			}
		})
	}
}

let parse_url_in = e => parse(url_in.value)
let display_url = () => url_in.value = url.href
let url_update_path = () => url.pathname = set_path(url.pathList.join('/'))
let url_update_hash = () => url.hash = set_hash(url.hashParams.toString())
let set_url_part = (part, val) => url[part] = val

function init() {
	if(window.location.hash) {
		url_in.value = display_hash(window.location.hash)
	}
	parse_url_in()
	url_in.addEventListener('change', parse_url_in, false)
	url_in.addEventListener('input', parse_url_in, false)
}

document.addEventListener('DOMContentLoaded', init, false)
