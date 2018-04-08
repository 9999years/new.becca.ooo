let $ = id => document.getElementById(id)

let textIn = $("in")
let textOut = $("out")
let charsOut = $("chars_out")
let charsIn = $("chars_in")
let monospaceToggle = $("monospace_toggle")
let squareToggle = $("square_toggle")
let regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g

var textFiltered = ""
var textRaw = "Hello"

function utfArray(txt) {
	var list = []
	for(var i=0;i<txt.length;i++) {
		var code = txt.charCodeAt(i)
		if(code >= 0xd800 && code <= 0xdbff) {
			var secondCode = txt.charCodeAt(i+1)
			code = ((code-0xd800)*0x400) + (secondCode-0xdc00) + 0x10000
			list.push(code)
			i++
		} else {
			list.push(code)
		}
	}
	return list
}

function utfArrayToString(input) {
	var result = ""
	for(var i = 0; i < input.length; i++) {
		result += characterFromCodePoint(input[i])
	}
	return result
}

function characterFromCodePoint(charCode) {
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

String.prototype.toMonospace = function() {
	return monospaceToggle.checked
		//ugly solution but only other way is to pass it in everywhere soo
		?
		//for ascii alpha chars (upper first range, lower second)
		this.replace(/[\u0041-\u005a]|[\u0061-\u007a]/g,
		//generate new char from current code shifted to monospace range
		//ternary operator also checks if it should be shifted for lowercase range or uppercase
		function(ch) { return characterFromCodePoint(ch.charCodeAt(0) + (ch.charCodeAt(0) > 0x5a ? 0x1d629 : 0x1d62f));})
		:
		this
}

Array.prototype.shift = function(amount) {
	//shifts array by amount units
	return this.slice(amount).concat(this.slice(0, amount))
}

function generateGrid(input) {
	//init variables as utf arrays
	var result = utfArray(input.toMonospace())
		,originalMonospaced = result
		,br = utfArray("\n")
		
	for(var i = 1; i <= originalMonospaced.length; i++) {
		//<= to dupe first at last
		//concat each (arrays)
		//shift by i per i to length
		result = result
			.concat(br)
			.concat(originalMonospaced
				.shift(i)
				.slice(0, originalMonospaced.length - (!squareToggle.checked ? 0 : i))
				)
	}
	//return as string to self-contain arrays
	return utfArrayToString(result)
}

function countSymbols(target) {
	//this function is from here https://mathiasbynens.be/notes/javascript-unicode
	//(thanks mathias)
	return target
	// replace every surrogate pair with a bmp symbol to acct for 5 or 6 byte unicode symbols
	.replace(regexAstralSymbols, '.')
	// then get the length
	.length
}

function selectAll() {
	//select text when the text boxes are clicked
	window.setTimeout(function() {
		//browsers are weird about this (it doesnt work w/o a delay)
		//can you believe there's a function containing 'exec' that isn't a huge security hole?
		document.execCommand("selectAll", false, null)
	}, 1)
}

function handleInput() {
	//refresh contents of textRaw & regex out xml tags
	textRaw = textIn.value
	//refresh textFiltered and output, and escape spaces again, or they become monospaced
	textOut.innerHTML = textFiltered = generateGrid(textRaw).replace(/ /g,"&nbsp;");//.replace(/\ufffd/g,"")
	//add character counts
	charsIn.innerHTML = countSymbols(textRaw) + " characters"
	//escape <br> as _ for counting linebreaks, take out all other tags for compatibility, and un-escape nbsp for counting
	charsOut.innerHTML = countSymbols(textFiltered.replace(/<br>/g,"_").replace(/<[^>]*>?/g,"").replace(/&nbsp;/g," ")) + " characters"
}

textIn.addEventListener("keydown", function(e) {
	//covers backspacing too
	if(e.key == "Backspace" || e.key == "Del") {
	window.setTimeout(function() {
		//a slight delay handles ctrl+a and backspace, which isn’t caught by the input event normally
		handleInput()
		}, 1)
	}
}, false)

textIn.addEventListener("input", function(e) {
	//when text is input (covers pastes as well as keys)
	handleInput()
}, false)

monospaceToggle.addEventListener("click", function(e) {
	//refresh when monospace check is toggled
	handleInput()
}, false)

squareToggle.addEventListener("click", function(e) {
	//refresh when square check is toggled
	handleInput()
}, false)

textIn.addEventListener("focus", function(e) {
	//select all text when focused
	selectAll()
}, false)

textOut.addEventListener("focus", function(e) {
	selectAll()
}, false)

window.onload = function() {
	//focus on textbox to allow quick composition/replacement
	//this also selects all
	textIn.focus()
}
