
function $(id) { return document.getElementById(id); }

//globals
let cvs = $('main-canvas')
let pixelScale = window.devicePixelRatio
let scene = Object()
let step = 2

let lerp = (a, b, f) => (a * (1 - f) + b * f) / 2
let sinterp = (a, b, f) => (b - a) * (1 - Math.cos(Math.PI * f)) / 2 + a
let pyramid = (slope, x, y, pos) => slope * Math.abs(pos - x) + y
let colorToRgba = color => "rgba(" + color.join(", ") + ")"
let randf = (min, max) => Math.random() * (max - min) + min

function drawLine(x, y, endx, endy, color) {
	ctx.beginPath()
	ctx.moveTo(x, y)
	ctx.lineTo(endx, endy)
	ctx.strokeStyle = colorToRgba(color)
	ctx.stroke()
	return
}

function drawSharpLine(x, y, endx, endy, color) {
	drawLine(
		Math.floor(x) + 0.5,
		Math.floor(y) + 0.5,
		Math.floor(endx) + 0.5,
		Math.floor(endy) + 0.5,
		color
	)
	return
}

// i in [0, 1]
function getY(x) {
	//return pyramid(2, ctx.x/2, ctx.y/2, i * ctx.x)
	//return sinterp(0, 0, ctx.y, ctx.x, i)
	var dex = 0
	for(var i = 0; i < scene.mountains.length - 1; i++) {
		if(
			(x > scene.mountains[i].x) &&
			(x < scene.mountains[i + 1].x)
		) {
			return lerp(
				scene.mountains[i].y,
				scene.mountains[i + 1].y,
				(x - scene.mountains[i].x) /
				(scene.mountains[i + 1].x
				- scene.mountains[i].x)
			)
		}
	}
}

function render(time) {
	//gen scene
	//rough jags
	//very bad technique do not use in real life
	scene.mountains = []
	var mountains_count = 15
	for(var i = 0; i < mountains_count; i++) {
		scene.mountains.push({
			x: randf(0, ctx.x),
			y: 0
		})
	}
	scene.mountains.push({ x: 0, y: 0 })
	scene.mountains.push({ x: ctx.x, y: 0 })
	mountains_count += 2
	scene.mountains =
		scene.mountains.sort((k, l) => {return k.x < l.x ? -1 : 1})
	var yprev = ctx.y / 2
	for(var i = 0; i < mountains_count; i++) {
		yprev = randf(yprev - ctx.y / 6, yprev + ctx.y / 6)
		scene.mountains[i].y = yprev
	}

	var x, y, ofs = 0
	ctx.clearRect(0, 0, ctx.x, ctx.y)
	//graph
	ctx.beginPath()
	ctx.moveTo(0, getY(0))
	for(var i = step; i < ctx.x + step; i += step) {
		//ofs += randf(-4, 4)
		y = getY(i)
		//console.log("(" + i + ", " + y + ")")
		ctx.lineTo(i, y + ofs)
	}
	ctx.stroke()
	//window.requestAnimationFrame(render)
	return
}

function init() {
	let frameWidth = cvs.parentElement.clientWidth * pixelScale
	let frameHeight = frameWidth

	cvs.setAttribute("height", frameHeight + "px")
	cvs.setAttribute("width",  frameWidth  + "px")
	ctx = cvs.getContext("2d")
	ctx.width  = frameWidth
	ctx.height = frameWidth
	ctx.x = frameWidth
	ctx.y = frameHeight
	cvs.style.height = frameHeight / pixelScale + "px"
	cvs.style.width =  frameWidth  / pixelScale + "px"
	ctx.lineWidth = pixelScale

	ctx.strokeStyle = '#aff'
	ctx.lineWidth = pixelScale * 2

	window.requestAnimationFrame(render)
	cvs.onclick = e => {
		window.requestAnimationFrame(render)
	}
}
