import { $ } from "../fake"

let randChar = () => String.fromCodePoint(Math.floor(Math.random() * 0x2c00))

function randChars(len) {
	const ret = []
	for(var i = 0; i < len; i++) {
		ret.push(randChar())
	}
	return ret.join('')
}

let outputChars = (el, len=140) => el.innerHTML = randChars(len)

document.addEventListener('DOMContentLoaded', function() {
    const regenerate = $('regenerate')
    const output = $('chars')
    regenerate.addEventListener('click', e => outputChars(output), false)
    outputChars(output)
}, false)
