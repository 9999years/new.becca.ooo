let $ = id => document.getElementById(id)

let css = prop => window
	.getComputedStyle(document.body, null)
	.getPropertyValue(prop)

let rand = (min, max) => Math.floor(Math.random() * (max - min)) + min

let colorToRgba = color => "rgba(" + color.join(", ") + ")"

//globals
let bg = [0, 17, 34, 0xff]
let pixelScale = window.devicePixelRatio
var frame = 0
var screen
var ctx

//plot a pixel on arbitrary image data
//image = ctx.createImageData...
//color = rgba byte array
function plot(image, x, y, color) {
	if(
		x < 0 ||
		x > image.width ||
		y < 0 ||
		y > image.height
	) { return }
	var inx = (y * image.width * 4) + (x * 4)
	image.data[inx]   = color[0]
	image.data[++inx] = color[1]
	image.data[++inx] = color[2]
	image.data[++inx] = color[3]
}

function getColor(image, x, y) {
	x = (x + image.width) % image.width
	y = (y + image.height) % image.height
	var color = []
	var inx = (y * image.width * 4) + (x * 4)
	color[0] = image.data[inx]
	color[1] = image.data[++inx]
	color[2] = image.data[++inx]
	color[3] = image.data[++inx]
	return color
}

function getNeighbors(image, x, y) {
	var color = []
	var u = getColor(image, x, y - 1)
	var d = getColor(image, x, y + 1)
	var l = getColor(image, x - 1, y)
	var r = getColor(image, x + 1, y)
	color[0] = (u[0] + d[0] + l[0] + r[0]) / 4
	color[1] = (u[1] + d[1] + l[1] + r[1]) / 4
	color[2] = (u[2] + d[2] + l[2] + r[2]) / 4
	color[3] = (u[3] + d[3] + l[3] + r[3]) / 4
	return color
}

function plotGray(image, x, y, gray) {
	plot(image, x, y, [gray, gray, gray, 0xff])
}

function lerpColor(a, b, f) {
	var inv = 1 - f
	a = a.map(k => { return k * inv; })
	b = b.map(k => { return k * f; })
	return [
		(a[0] + b[0]) / 2,
		(a[1] + b[1]) / 2,
		(a[2] + b[2]) / 2,
		(a[3] + b[3]) / 2
	]
}

function avgColor(a, b) {
	return lerpColor(a, b, 0.1)
}

function drawLine(x, y, endx, endy, color) {
	ctx.beginPath()
	ctx.moveTo(x, y)
	ctx.lineTo(endx, endy)
	ctx.strokeStyle = colorToRgba(color)
	ctx.stroke()
}

function drawSharpLine(x, y, endx, endy, color) {
	drawLine(
		Math.floor(x) + 0.5,
		Math.floor(y) + 0.5,
		Math.floor(endx) + 0.5,
		Math.floor(endy) + 0.5,
		color
	)
}

function drawCircle(cx, cy, r, color) {
	//negative radius = error
	if(r <= 0) { return; }

	ctx.beginPath()
	ctx.arc(cx, cy, r, 0, 2 * Math.PI, false)
	ctx.strokeStyle = color
	ctx.stroke()
}

function scaleImageData(imageData, scale) {
	//got bless SO user rodarmor
	//http://stackoverflow.com/a/9138593/5719760
	var scaled = ctx.createImageData(
		imageData.width * scale,
		imageData.height * scale
	)

	for(var row = 0; row < imageData.height; row++) {
	for(var col = 0; col < imageData.width; col++) {
		var sourcePixel = [
			imageData.data[(row * imageData.width + col) * 4],
			imageData.data[(row * imageData.width + col) * 4 + 1],
			imageData.data[(row * imageData.width + col) * 4 + 2],
			imageData.data[(row * imageData.width + col) * 4 + 3]
		]
		for(var y = 0; y < scale; y++) {
		var destRow = row * scale + y
		for(var x = 0; x < scale; x++) {
			var destCol = col * scale + x
			scaled.data[(destRow * scaled.width + destCol) * 4] = sourcePixel[0]
			scaled.data[(destRow * scaled.width + destCol) * 4 + 1] = sourcePixel[1]
			scaled.data[(destRow * scaled.width + destCol) * 4 + 2] = sourcePixel[2]
			scaled.data[(destRow * scaled.width + destCol) * 4 + 3] = sourcePixel[3]
		}
		}
	}
	}

	return scaled
}

function render(time) {
	//ctx.fillStyle = colorToRgba(bg)
	//ctx.fillStyle = colorToRgba([0, 0, 255, 1])
	//ctx.fillRect(0, 0, ctx.width, ctx.height)
	var sparks = 100
	var color
	for(var i = 0; i < screen.data.length; i++) {
		//color = getNeighbors(screen, (i / 4) % screen.width, Math.floor(i / screen.height / 4))
		screen.data[i] = Math.max(screen.data[i] - 5, bg[0])
		i++
		screen.data[i] = Math.max(screen.data[i] - 5, bg[1])
		i++
		screen.data[i] = Math.max(screen.data[i] - 5, bg[2])
		i++
	}
	for(var i = 0; i < sparks; i++) {
		plot(
			screen,
			rand(0, screen.width),
			rand(0, screen.height),
			[
				rand(0, 0xff),
				rand(0, 0xff),
				rand(0, 0xff),
				0xff
			]
		)
	}
	//for(var i = 3; i < screen.data.length; i += 4) {
		//screen.data[i] = 0xff
	//}
	//push array to canvas
	//update time, push a frame, call render() again
	//screen = scaleImageData(screen, res)
	ctx.putImageData(screen, 0, 0)
	frame++
	window.requestAnimationFrame(render)
}

function init() {
	//initialize cvs, ctx, etc
	const cvs = $("main-canvas")
	var maxWidth = cvs.parentElement.clientWidth
	var frameWidth = maxWidth * pixelScale
	var frameHeight = frameWidth
	frame = 0

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

	screen = ctx.createImageData(frameWidth, frameHeight)

	for(var i = 0; i < screen.data.length; i++) {
		screen.data[  i] = bg[0]
		screen.data[++i] = bg[1]
		screen.data[++i] = bg[2]
		screen.data[++i] = bg[3]
	}

	//for(var i = 3; i < screen.data.length; i += 4) {
		//screen.data[i] = 0xff
	//}

	window.requestAnimationFrame(render)
}

document.addEventListener("DOMContentLoaded", init)
