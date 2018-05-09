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

let heartsDiv = document.getElementById("hearts")

function randHeart() {
	return hearts[Math.floor(Math.random() * hearts.length)]
}

function generateHearts(length) {
	ret = []
	for(i = 0; i < length; i++) {
		ret.push(randHeart())
	}
	return ret.join("")
}

function outputHearts(length=140) {
	heartsDiv.innerHTML = generateHearts(length)
}

document.addEventListener('DOMContentLoaded', e => outputHearts(), false)
let main = document.getElementsByTagName('main')[0]

let encore = document.createElement('a')
encore.innerHTML = 'encore! more love!'
encore.addEventListener('click', e => outputHearts(), false)
main.appendChild(encore)
