// url_in, url_out
//
// URLSearchParams: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

// a URL with an added .pathList, a list of strings with one per path-segment;
// corresponds to .pathname. when you edit .pathList, call .updatePath as well
// to keep everything in sync
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

function make_delete_link(fn, txt='×') {
	let delete_link = document.createElement('a')
	delete_link.addEventListener('click', fn)
	delete_link.innerHTML = txt
	return delete_link
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
//     onchange: fn
// val:
//     (same as key)
function make_row(key, val, opts={}) {
	let new_row = document.createElement('div')
	new_row.className = opts.class || 'row'
	if(key) {
		if(opts.key === undefined) {
			opts.key = {}
		}
		if(opts.key) {
			opts.key.class = 'key'
		}
		new_row.append(make_field(key, opts.key))
		new_row.append(opts.delim || ': ')
	}

	if(val) {
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
		new_row.append(make_delete_link(delete_func(opts.delete)))
	}
	// TODO reordering code
	return new_row
}

// opts: see make_row, and
// target: Element or Node to append to
function add_row(key, val, opts={}) {
	(opts.target || url_out).append(make_row(key, val, opts))
}

/*
 * for(param of url.searchParams) {
 * 	// param is ['key', 'value']
 * 	// with value decoded
 * }
 */

// strip trailing :
let display_protocol = prot => prot.substring(0, prot.indexOf(':'))
let set_protocol = newprot => newprot + ':'
// strip leading /
let display_path = path => path.substring(1)
let set_path = newpath => '/' + newpath

// adds a new row with a static, i.e. uneditable, key field IFF val is defined
// and non-empty
//
// opts: an add_row opts dict with the following keys
// val: fn: applied to val if val is defined and non-empty
function maybe_static_row(key, val, opts={}) {
	if(val !== undefined && val !== "") {
		if(opts.val && opts.val.fn) {
			val = opts.val_fn(val)
		}
		if(opts.key === undefined) {
			opts.key = {}
		}
		opts.key.edit = false
		if(opts.val === undefined) {
			opts.val = {}
		}
		opts.val.edit = true
		add_row(key, val, opts)
	}
}

// see maybe_static_row, but with mutable keys and values
function maybe_mutable_row(key, val, opts={}) {
	if(val !== undefined && val !== "") {
		if(opts.val_fn) {
			val = opts.val_fn(val)
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

let delete_param = row => {
	url.searchParams.delete(get_key(row).value)
	row.remove()
	if(url.search.length <= 1) {
		// delete the whole section
		get_section('parameters').remove()
	}
}

let delete_all_params = e => {
	url.search = ''
	get_section('parameters').remove()
	display_url()
}

// sets up the params portion of the page
function parse_params(searchParams) {
	let container = make_section('parameters')
	let title = container.firstElementChild
	title.append(make_delete_link(delete_all_params))

	for(param of searchParams) {
		add_row(param[0], param[1], {
			delete: delete_param,
			target: container,
			key: { edit: true },
			val: { edit: true }
		})
	}
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

// sets up the path portion of the page
function parse_path(pathname) {
	let container = make_section('path')
	let dirs = display_path(pathname).split('/')
	let list = document.createElement('ul')
	var i = 0
	for(dir of dirs) {
		let li = document.createElement('li')
		li.append(make_row(undefined, dir, {
			delete: delete_path,
			val: {
				edit: true,
				change: change_path,
			}
		}))
		// first child is the div.row
		li.firstElementChild.setAttribute('data-index', i)
		list.append(li)
		i++
	}
	container.append(list)
	url_out.append(container)
}

// given a url, sets up everything
function parse(newurl) {
	url = new URL(newurl)
	url.pathList = display_path(url.pathname).split('/')
	url.updatePath = url_update_path
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
	maybe_mutable_row('#', url.hash, {
		key: { edit: false },
		val: { change: e => url.hash = e.target.value }
	})
	parse_params(url.searchParams)
}

let parse_event = e => parse(e.target.value)
let display_url = () => url_in.value = url.href
let url_update_path = () => url.pathname = '/' + url.pathList.join('/')
let set_url_part = (part, val) => url[part] = val

function init() {
	parse(url_in.value)
	url_in.addEventListener('change', parse_event, false)
	url_in.addEventListener('input', parse_event, false)
}

document.addEventListener('DOMContentLoaded', init, false)
