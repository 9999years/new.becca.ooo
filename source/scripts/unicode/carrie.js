var replacements = [
	 [["back"],["🔙"]]
	,[["soon"],["🔜"]]
	,[["end"],["🔚"]]
	,[["and"],["➕"]]
	,[["top"],["🔝"]]
	,[["for"],[" 4️⃣"]] //4 keycap
	,[["new"],["🆕"]]
	,[["atm"],["🏧"]]
	,[[" i "],[" 👁 "]]
	,[["ng"],["🆖"]]
	,[["on"],["🔛"]]
	,[["ab"],["🆎"]]
	,[["cl"],["🆑"]]
	,[["ok"],["🆗"]]
	,[["vs"],["🆚"]]
	,[["up"],["🆙"]]
	,[["wc"],["🚾"]]
	,[["a"],["🅰"]]
	,[["b"],["🅱"]]
	,[["c"],["©"]]
	//d
	,[["e"],["📧"]]
	//f
	//g
	,[["g"],["g","⛽"]]
	,[["h"],["♓","🏨"]]
	,[["i"],["ℹ", "👁"]]
	,[["j"],["🌶"]]
	,[["k"],["🎋"]]
	,[["l"],["🕒"]]
	,[["m"],["Ⓜ️","♏"]]
	,[["n"],["♑"]]
	,[["o"],["🅾"]]
	,[["p"],["🅿"]]
	//q
	,[["r"],["®","🌱"]]
	,[["s"],["💲"]]
	,[["t"],["✝"]]
	,[["u"],["⛎"]]
	,[["v"],["♈"]]
	,[["w"],["〰"]]
	,[["x"],["❌", "✖"]]
	,[["y"],["✌"]]
	//z
	,[["\\?"],["❓"]]
	,[["\\!"],["❕"]]
]

let $ = id => document.getElementById(id)

// init variables
let textIn = $("in")
let textOut = $("out")
let textFiltered = ""
let compressionRatio = 1
let regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g

textIn.value = textIn.innerHTML
textOut.value = textOut.innerHTML

function randomVal(arr) {
	return arr[Math.floor(Math.random() * arr.length)]
}

function encode(text) {
	for(var i = 0; i < replacements.length; i++) {
		text = text.replace(
			RegExp(replacements[i][0][0], "gi"),
			randomVal(replacements[i][1])
		)
	}
	return text
}

function decode(text) {
	// strip fitzpatrick modifiers
	for(var i = 0x1f3fb; i <= 0x1f3ff; i++) {
		text = text.replace(
			RegExp(String.fromCodePoint(i), "gi"),
			""
		)
	}

	for(var i = 0; i < replacements.length; i++) {
		for(var j = 0; j < replacements[i][1].length; j++) {
			text = text.replace(
				RegExp(replacements[i][1][j], "gi"),
				replacements[i][0]
			)
		}
	}
	text = text.replace(/\ufe0f/g, "")
	return text.replace(/\s{2,}/g, " ")
}

function countSymbols(string) {
	// https://mathiasbynens.be/notes/javascript-unicode
	// (thanks mathias)
	return string
	// replace every surrogate pair with a bmp symbol to acct for 5 or 6
	// byte unicode symbols
	.replace(regexAstralSymbols, '.')
	// then get the length
	.length
}

function selectAll() {
	// function to select text when the text boxes are clicked
	window.setTimeout(function() {
		// browsers are weird about this (it doesnt work w/o a delay)
		// can you believe there's a function containing 'exec' that
		// isn't a huge security hole?
		document.execCommand("selectAll", false, null)
	}, 1)
}

textIn.oninput = textIn.onchange = e => {
	textOut.value = encode(textIn.value.trim())
}

textOut.oninput = textOut.onchange = e => {
	textIn.value = decode(textOut.value.trim())
}

textIn.onfocus = e => {
	selectAll()
}

textOut.onfocus = e => {
	selectAll()
}
