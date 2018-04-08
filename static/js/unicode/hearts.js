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

function outputHearts(length) {
	heartsDiv.innerHTML = generateHearts(length)
}
