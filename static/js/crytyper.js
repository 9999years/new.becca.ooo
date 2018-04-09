// actual code is at crytype()
// license: mit/expat
// code makes heavy use of prototyping, specifically Array.fromString() and
// Array.toString() to avoid splitting surrogates (usually emoji). most string
// stuff is done with codepoint numbers instead of strings, and might be a
// little weird. events are at the very bottom of the code

//init variables
var textIn            = $("in")
	,textOut      = $("out")
	,redoButton   = $("redo_button")
	,cryRange     = $("crying_range")
	,textFiltered = ""
	,textRaw      = "Hello"
	,scale        = 1
	

//probabilities of different cry-typing aspects as probabilities (out of 100)
//these are per-letter
var errors = {
	swap:      0, // swap 2 letters
	add:       0, // add new letters
	duplicate: 0, // duplicate letters
	punctuate: 0, // add commas, periods, spaces
	remove:    0, // remove letters
	swapCase:  0, // swap upper/lower case
},
limits = {
	swap:      { min: -1, max: 1 },
	add:       { min:  1, max: 2 },
	duplicate: { min:  1, max: 2 },
	punctuate: { min:  1, max: 3 },
	remove:    { min:  1, max: 2 }
}

//hahaha
function $(id) { return document.getElementById(id); }

//returns true if a probability% chance happens
function yes(probability) {
	return Math.random() * 100 < probability * scale
}

//50% chance true
function half() {
	return Math.random() > 0.5
}

//returns a codepoint number in the palette
function randChar() {
	var palette = "abcdefghijklmnopqrstuvwxyz,./'[]\\`"
	return palette.charCodeAt(Math.floor(Math.random() * palette.length))
}

//returns an arr of `len` rand codepoints from randChar()
function keymash(len) {
	out = []
	for(var i = 0; i < len; i++) {
		out.push(randChar())
	}
	return out
}

//rand int (not really, js rand is broken) in [obj.min, obj.max)
function between(obj) {
	return Math.floor(Math.random() * (obj.max - obj.min)) + obj.min
}

//ascii case swapping. doesnt work with accents, etc. just used sparingly
function swapCase(num) {
	if((num > 0x40) && (num < 0x5b)) {
		//uppercase
		return num + 0x20
	} else if((num > 0x60) && (num < 0x7b)) {
		//lowercase
		return num - 0x20
	} else {
		return num
	}
}

//gives back some punctuation codepoint
function generatePunctuation() {
	switch(between({min: 1, max: 6})) {
		case 1: return 0x2c; // comma
		case 2: return 0x2c; // comma
		case 3: return 0x20; // space
		case 4: return 0x2e; // period
		case 5: return 0x3b; // semicolon
	}
}

//array of codepoints from string
Array.constructor.prototype.fromString = function(txt) {
	var out = []
	for(var i = 0; i < txt.length; i++) {
		var code = txt.charCodeAt(i)
		if(code >= 0xd800 && code <= 0xdbff) {
			var secondCode = txt.charCodeAt(i + 1)
			code = ((code - 0xd800) * 0x400)
				+ (secondCode - 0xdc00) + 0x10000
			out.push(code)
			i++
		} else {
			out.push(code)
		}
	}
	return out
}

//string from codepoint
String.constructor.prototype.fromCodePointRobust = function(charCode) {
	//takes in number, returns unicode bytes
	if(charCode >= 0x10000 && charCode <= 0x10ffff) {
		//it’s in an astral plane, generate a surrogate pair
		var firstPart = Math.floor((charCode - 0x10000) / 0x400) + 0xd800
		var lastPart = ((charCode - 0x10000) % 0x400) + 0xdc00
		return String.fromCharCode(firstPart) + String.fromCharCode(lastPart)
	} else {
		//part of the bmp, return self
		return String.fromCharCode(charCode)
	}
}

//codepoint array to string
Array.prototype.toString = function() {
	var result = ""
	for(var i = 0; i < this.length; i++) {
		result += String.fromCodePointRobust(this[i])
	}
	return result
}

//swap two values in an array
Array.prototype.swap = function(from, to) {
	if(this[from] === undefined || this[to] === undefined) { return; }
	var tmp    = this[from]
	this[from] = this[to]
	this[to]   = tmp
}

//add `amt` of keys of value `val` at `inx` in the array
Array.prototype.addKeys = function(inx, amt, val) {
	for(var i = 0; i < amt; i++) {
		this.splice(inx, 0, val)
	}
}

//add keys from `arr` into the array at `inx`
Array.prototype.mergeInto = function(inx, arr) {
	for(var i = 0; i < arr.length; i++) {
		this.splice(i + inx, 0, arr[i])
	}
}

//glitch the text. skip ahead if we add codepoints, otherwise add errors as
//chance dictates
function crytype(input) {
	var codepoints = Array.fromString(input)
	var skip = 0
	for(var i = 0; i < codepoints.length; i++) {
		if(yes(errors.swap)) {
			codepoints.swap(i, i + between(limits.swap))
		}
		if(yes(errors.add)) {
			skip = between(limits.add)
			codepoints.mergeInto(i, keymash(skip))
			i += skip
		}
		if(yes(errors.swapCase)) {
			codepoints[i] = swapCase(codepoints[i])
		}
		if(yes(errors.duplicate)) {
			skip = between(limits.duplicate)
			codepoints.addKeys(i, skip, codepoints[i])
			i += skip
		}
		if(yes(errors.punctuate)) {
			skip = between(limits.punctuate)
			codepoints.addKeys(i, skip, generatePunctuation())
			i += skip
		}
		if(yes(errors.remove)) {
			codepoints.splice(i, 1)
			i -= 1
		}
	}
	return codepoints.toString()
}

function selectAll() {
	//select text when the text boxes are clicked
	window.setTimeout(function() {
		//browsers are weird about this (it doesnt work w/o a delay)
		//can you believe there's a function containing 'exec' that
		//isn't a huge security hole?
		document.execCommand("selectAll", false, null)
	}, 1)
}

function handleInput() {
	textRaw = textIn.value.replace(/sorry/g, "so sorry")
		.replace(/im/g, "im just")
	textOut.value = crytype(textRaw)
}

function refreshProbabilities() {
	errors.swap       = +$("swap_range").value
	errors.add        = +$("add_range").value
	errors.duplicate  = +$("duplicate_range").value
	errors.punctuate  = +$("punctuate_range").value
	errors.remove     = +$("remove_range").value
	errors.swapCase   = +$("swapcase_range").value
}

$("adv_button").onclick = e => {
	var el = $("adv_options")
	if(el.style.display === "block") {
		el.style.display = "none"
	} else {
		el.style.display = "block"
	}
}

$("swap_range").oninput      = e => { refreshProbabilities(); handleInput(); }
$("add_range").oninput       = e => { refreshProbabilities(); handleInput(); }
$("duplicate_range").oninput = e => { refreshProbabilities(); handleInput(); }
$("punctuate_range").oninput = e => { refreshProbabilities(); handleInput(); }
$("remove_range").oninput    = e => { refreshProbabilities(); handleInput(); }
$("swapcase_range").oninput  = e => { refreshProbabilities(); handleInput(); }

$("zero_button").onclick = e => {
	errors.swap      = $("swap_range").value      = 0
	errors.add       = $("add_range").value       = 0
	errors.duplicate = $("duplicate_range").value = 0
	errors.punctuate = $("punctuate_range").value = 0
	errors.remove    = $("remove_range").value    = 0
	errors.swapCase  = $("swapcase_range").value  = 0
	handleInput()
}

textIn.onkeydown = e => {
	//covers backspacing too
	if(e.key == "Backspace" || e.key == "Del") {
	window.setTimeout(function() {
		//a slight delay handles ctrl+a and backspace, which isn’t caught by the input event normally
		handleInput()
		}, 1)
	}
}

cryRange.oninput = e => {
	//if the slider's been nudged, adjust scale
	scale = +cryRange.value / +cryRange.max * 5
	handleInput()
}

textIn.oninput = redoButton.onclick = e => {
	//when text is input (covers pastes as well as keys)
	handleInput()
}

textIn.onfocus = e => {
	//select all text when focused
	selectAll()
}

textOut.onfocus = e => {
	//you probably want to copy it into a tweet
	selectAll()
}

window.onload = function() {
	//focus on textbox to allow quick composition/replacement
	//this also selects all
	refreshProbabilities()
	textIn.focus()
	handleInput()
}
