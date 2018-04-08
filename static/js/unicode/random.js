let randChar = () => String.fromCodePoint(Math.floor(Math.random() * 0x2c00))

function randChars(len) {
	ret = []
	for(i = 0; i < len; i++) {
		ret.push(randChar())
	}
	return ret.join('')
}

let outputChars = len =>
	document.getElementById("chars").innerHTML = randChars(len)
