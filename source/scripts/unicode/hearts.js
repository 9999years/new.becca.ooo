import { $ } from "../fake"

let hearts = [
	"💘",
	"❤",
	"💓",
	"💕",
	"💖",
	"💗",
	"💙",
	"💚",
	"💛",
	"🧡",
	"💜",
	"🖤",
	"💝",
	"💞",
	"💟",
	"❣" ]

function randHeart() {
	return hearts[Math.floor(Math.random() * hearts.length)]
}

function generateHearts(length) {
	const ret = []
	for(var i = 0; i < length; i++) {
		ret.push(randHeart())
	}
	return ret.join("")
}

function outputHearts(el, length=140) {
	el.innerHTML = generateHearts(length)
}

document.addEventListener('DOMContentLoaded', function() {
    let hearts = $("hearts")
    $('encore').addEventListener('click', e => outputHearts(hearts), false)
    outputHearts(hearts)
}, false)

