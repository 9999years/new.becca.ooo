import { $ } from "./fake"

//globals
var background, //imageData
    amplitude,
    backgroundColor, //4-byte arrays
    backplate, //imageData
    currentSpeed, //actual value, for easing
    cursor, //point (x, y)
    cursorColor,
    cursorTracking, // bool
    dark, // bool
    dragTimer,
    dragging, // bool
    drawCursor,
    frame,
    frameHeight,
    frameWidth, //canvas w/h
    gridColor,
    gridSpacing,
    highlightColor,
    lastSpeed, //stored value for other mode
    lineColor,
    mode, //toggle, 'static' or 'dynamic'
    pixelScale, //for retina
    plotGrid, // bool
    plotSamples, // bool
    renderTimer,
    sampleColor,
    screen, //imageData
    speed, //value in <input>
    threshold,
    timeOffset,
    x, //point (x, y)
    y; //point (x, y)

function colorToRgba(color) {
	return 'rgba('
		+ color[0] + ','
		+ color[1] + ','
		+ color[2] + ','
		+ color[3] + ')';
}

//plot a pixel on arbitrary image data
//image = ctx.createImageData...
//color = rgba byte array
function plot(image, x, y, color) {
	if(
		x < 0 ||
		x > image.width ||
		y < 0 ||
		y > image.height
	) { return; }
	var inx = (y * image.width * 4) + (x * 4);
	image.data[inx]   = color[0];
	image.data[++inx] = color[1];
	image.data[++inx] = color[2];
	image.data[++inx] = color[3];
	return;
}

function drawLine(x, y, endx, endy, color)
{
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(endx, endy);
	ctx.strokeStyle = colorToRgba(color);
	ctx.stroke();
	return;
}

function drawCircle(cx, cy, r, color)
{
	//negative radius = error
	if(r <= 0) { return; }

	ctx.beginPath();
	ctx.arc(cx, cy, r, 0, 6.283186, false);
	ctx.strokeStyle = colorToRgba(color);
	ctx.stroke();
	return;
}

function sqr(x) {
	return x * x;
}

//dist between two coords
function dist(v, w) {
	return Math.sqrt(sqr(v.x - w.x) + sqr(v.y - w.y));
}

function distsqr(v, w) {
	return sqr(v.x - w.x) + sqr(v.y - w.y);
}

//clamp val to between min and max
function clamp(val, min, max) {
	return Math.min(Math.max(val, min), max);
}

//lerp interp is 0..1
function lerp(binterp, a, b) {
	binterp = clamp(binterp, 0, 1);
	ainterp = 1 - binterp;
	return a * ainterp + b * binterp;
}

//like an advanced gray(): instead of mapping a val from black to white,
//colormap() maps it between any two colors of your choice
function colormap(val, a, b) {
	val = clamp(val, 0, 255) / 255;
	return [lerp(val, a[0], b[0]),
		lerp(val, a[1], b[1]),
		lerp(val, a[2], b[2]),
		lerp(val, a[3], b[3])];
}

//make gray color from byte
function gray(v) {
	v = clamp(v, 0, 0xff);
	return [v, v, v, 0xff];
}

//all the arguments of points that contain an x and y coord
//access w/ p.x & p.y etc...
//this must return a color: an array in the format
//[red, green, blue, alpha] where each number is between 0 and 0xff (255)
//the gray() function above converts a value from 0 to 0xff to a gray color
function estimateDistance(p, v, w) {
	period = (dist(p, w) / 20) + 15;
	return gray(0xff
		* Math.sin(p.x / period)
		* Math.cos(p.y / period)
		/ (dist(p, v) / 100));
}

function add(a, b) {
	return {
		x: a.x + b.x,
		y: a.y + b.y
	};
}

function sub(a, b) {
	return {
		x: a.x - b.x,
		y: a.y - b.y
	};
}

function mults(a, b) {
	return {
		x: a.x * b,
		y: a.y * b
	};
}

function dot(a, b) {
	return a.x * b.x + a.y * b.y;
}

//distance to line ab from p
//http://stackoverflow.com/a/1501725/5719760
function distline(p, a, b)
{
	//length = |b-a|^2 -  avoid a sqrt
	var length = distsqr(a, b);
	//avoid a = b case & divide by zero
	if(length == 0.0) return dist(p, a);
	var pa = sub(p, a);
	var ba = sub(b, a);
	//Consider the line extending the segment, parameterized as
	//a + t (b - a)
	//we find projection of point c onto the line.
	//It falls where t = [(p-a) . (b-a)] / |b-a|^2
	//we clamp t from [0,1] to handle points outside the segment ab
	var t = clamp(
		dot(pa, ba) / length,
		0, 1);
	//projection falls on the segment
	var projection = add(a, mults(ba, t));
	return dist(
		p,
		projection
	);
}

var cvs, ctx, stop = false;

function renderNextFrame() {
	if(stop) {
		return;
	} else if(mode == 'dynamic') {
		window.requestAnimationFrame(renderAll);
	} else if(mode == 'static') {
		window.requestAnimationFrame(renderPixel);
	}
	return;
}

function genV(time) {
	return {
		x: (0.1 * frameWidth
			+ amplitude * Math.cos(time)),
		y: (0.2 * frameHeight
			+ amplitude * Math.sin(time))
	};
}

function genW(time) {
	return {
		x: (0.72 * frameWidth
			+ 2 * amplitude * Math.cos(time)),
		y: (0.86 * frameHeight
			+ 2 * amplitude * Math.sin(time))
	};
}

//i used drawCursor for the toggle variable so...
function cursorDraw(screen, v, w) {
	if(drawCursor) {
		var distance = distline(cursor, v, w) - threshold;
		drawCircle(
			cursor.x,
			cursor.y,
			Math.floor(distance),
			cursorColor
			);
		drawLine(
			cursor.x - 10,
			cursor.y - 10,
			cursor.x + 10,
			cursor.y + 10,
			cursorColor
			);
		drawLine(
			cursor.x + 10,
			cursor.y - 10,
			cursor.x - 10,
			cursor.y + 10,
			cursorColor
			);
		}
	return;
}

function drawGrid(v, w) {
	if(plotGrid) {
		var color = mode == 'dynamic'
			? gridColor
			: sampleColor;
		var p = {
			x: 0,
			y: 0
		};
		var increment = Math.floor(gridSpacing * pixelScale);
		var distance;
		for(var y = 0; y < frameHeight; y += increment) {
		for(var x = 0; x < frameWidth; x += increment) {
			p.x = x;
			p.y = y;
			distance = distline(p, v, w) - threshold;
			//console.log('p.x: ' + p.x);
			//console.log('p.y: ' + p.y);
			//console.log('dst: ' + Math.floor(distance));
			//console.log('clr: ' + colorToRgba(color));
			drawCircle(
				p.x,
				p.y,
				Math.floor(distance),
				color
				);
			drawLine(
				p.x - 10,
				p.y - 10,
				p.x + 10,
				p.y + 10,
				color
				);
			drawLine(
				p.x + 10,
				p.y - 10,
				p.x - 10,
				p.y + 10,
				color
				);
		}
		}
	}
	return;
}

function renderPixel() {
	var time = frame;
	//time is waaaaay too big, get it a bit smaller
	//set up the end points, make them wiggle with sin/cos
	var v = genV(time);
	//offset so both coordinates aren't on the same cycle
	time += 1;
	var w = genW(time);

	var p = { //the point
		x: 0,
		y: 0
	};
	
	var distance;

	//iterate through the image
	p.x = x;
	p.y = y;
	if(plotSamples) {
		plot(
			backplate,
			x, y,
			gridColor
			);
	}
	//if it's far out, skip ahead a bit
	distance = distline(p, v, w) - threshold;
	//line point, plot it
	if(distance < 0) {
		plot(
			backplate,
			x, y,
			lineColor
			);
	}

	//copy it over, preserving backplate
	ctx.putImageData(backplate, 0, 0);

	//screen.data.set(backplate.data);

	//add frame-to-frame decoration
	drawGrid(v, w);

	drawCircle(
		x,
		y,
		Math.floor(distance),
		gridColor
		);
	//if it's far out, skip ahead a bit
	if(distance > 0) {
		//draw estimation arrow
		drawLine(
			x,
			y,
			x + Math.floor(distance),
			y,
			gridColor
			);
		x += Math.floor(distance);
		drawLine(
			x,
			y,
			x - 5,
			y - 5,
			gridColor
			);
		drawLine(
			x,
			y,
			x - 5,
			y + 5,
			gridColor
			);
	} else {
		//draw hit circle
		drawLine(
			x - 10,
			y - 10,
			x + 10,
			y + 10,
			highlightColor
			);
		drawLine(
			x + 10,
			y - 10,
			x - 10,
			y + 10,
			highlightColor
			);
		drawCircle(x,     y,     13, highlightColor);
		drawCircle(x + 1, y,     13, highlightColor);
		drawCircle(x - 1, y,     13, highlightColor);
		drawCircle(x,     y + 1, 13, highlightColor);
		drawCircle(x,     y - 1, 13, highlightColor);
		plot(
			screen,
			x, y,
			highlightColor
			);
	}

	//circle cursor
	cursorDraw(screen, v, w);

	x++;
	if(x > frameWidth) {
		y += Math.max((x - frameWidth) / frameHeight, 1);
		x = 0;
		if(y > frameHeight) {
			y = 0;
			backplate.data.set(background.data);
			frame++;
		}
	}
	//update time, push a frame, call render() again
	if(stop) {
		return;
	} else if(mode == 'static') {
		if(speed > 990) {
			window.requestAnimationFrame(renderPixel);
		} else {
			renderTimer = window.setTimeout(() => {
				window.requestAnimationFrame(renderPixel);
			}, 1000 - speed);
		}
		return;
	}
}

function renderAll() {
	if(currentSpeed != speed) {
		timeOffset -= frame * ((speed - currentSpeed) / 3000);
		currentSpeed = speed;
	}
	//time is waaaaay too big, get it a bit smaller
	var time = frame * (currentSpeed / 3000) + timeOffset;
	//if(time > 6.28318) {
		//frame -= 3000 * time / currentSpeed;
	//}
	//set up the end points, make them wiggle with sin/cos
	var v = genV(time);
	//offset so both coordinates aren't on the same cycle
	time += 1;
	var w = genW(time);

	var p = { //the point
		x: 0,
		y: 0
	};
	
	//ctx.putImageData(backplate, 0, 0);

	screen.data.set(background.data);

	var distance;

	//iterate through the image
	for(y = 0; y < frameHeight; y++) {
	for(x = 0; x < frameWidth; x++) {
		p.x = x;
		p.y = y;
		distance = distline(p, v, w) - threshold;
		if(plotSamples) {
			plot(
				screen,
				x, y,
				sampleColor
				);
		}

		if(distance < 0) {
			plot(
				screen,
				x, y,
				lineColor
				);
		} else {
			x += Math.floor(distance);
		}
	}
	}

	//push array to canvas
	ctx.putImageData(screen, 0, 0);

	drawGrid(v, w);

	cursorDraw(screen, v, w);

	//update time, push a frame, call render() again

	if(stop) {
		return;
	} else if(mode == 'dynamic') {
		frame++;
		window.requestAnimationFrame(renderAll);
		return;
	}
}

function clearBackplate() {
	for(var i = 0; i < backplate.data.length; i++) {
		backplate.data[  i] = background.data[i] = backgroundColor[0];
		backplate.data[++i] = background.data[i] = backgroundColor[1];
		backplate.data[++i] = background.data[i] = backgroundColor[2];
		backplate.data[++i] = background.data[i] = backgroundColor[3];
	}
	return;
}

function setColors() {
	if(dark) {
		cursorColor     = [0x00, 0xdd, 0xdd, 0xff];
		backgroundColor = [0x00, 0x00, 0x00, 0xff];
		gridColor       = [0xaa, 0x00, 0x00, 0xff];
		sampleColor     = [0x00, 0x88, 0xbb, 0xff];
		lineColor       = [0xff, 0xff, 0xff, 0xff];
		highlightColor  = [0x00, 0xff, 0xff, 0xff];
	} else {
		cursorColor     = [0x00, 0x88, 0xff, 0xff];
		backgroundColor = [0xff, 0xff, 0xff, 0xff];
		gridColor       = [0xaa, 0x00, 0x00, 0xff];
		sampleColor     = [0x00, 0x22, 0x44, 0xff];
		lineColor       = [0x00, 0x00, 0x00, 0xff];
		highlightColor  = [0xbb, 0x00, 0xee, 0xff];
	}
	clearBackplate();
	return;
}

function reset() {
	x = 0;
	y = 0;
	frame = 0;
	timeOffset = 0;
	clearBackplate();
	return;
}

function resize() {
	var maxWidth = document.body.clientWidth * pixelScale;
	//hardcoded numbers
	//sorry
	//margins mess up canvas size
	if(maxWidth < 600 * pixelScale) {
		maxWidth -= 40 * pixelScale;
	}
	var defaultWidth = 500 * pixelScale;
	if(maxWidth < defaultWidth) {
		frameWidth = maxWidth;
	} else {
		frameWidth  = defaultWidth;
	}
	frameHeight  = frameWidth;
	cvs = $('main-canvas');
	cvs.setAttribute('height', frameHeight + 'px');
	cvs.setAttribute('width',  frameWidth + 'px');
	ctx              = cvs.getContext('2d')
	ctx.width        = frameWidth;
	ctx.height       = frameWidth;
	cvs.style.height = frameHeight / pixelScale + 'px';
	cvs.style.width  = frameWidth  / pixelScale + 'px';

	ctx.lineWidth = pixelScale;

	backplate  = ctx.createImageData(frameWidth, frameHeight);
	background = ctx.createImageData(frameWidth, frameHeight);
	screen     = ctx.createImageData(frameWidth, frameHeight);

	cursor = {
		x: frameWidth * 0.75,
		y: frameHeight * 0.2
	};
	return;
}

document.addEventListener('DOMContentLoaded', function() {
	//initialize cvs, ctx, etc
	pixelScale = window.devicePixelRatio;
	resize();
	gridSpacing  = +$('grid-spacing').value;
	currentSpeed = speed= +$('speed-range').value;
	threshold    = +$('threshold-range').value;
	plotGrid     = $('grid-toggle').checked;
	plotSamples  = $('samples-toggle').checked;
	drawCursor   = $('cursor-toggle').checked;
	lastSpeed    = 1000;
	mode         = 'dynamic';
	dragging = false;
	amplitude = 15;

	dark = false;
	setColors();

	reset();

	ctx.putImageData(backplate, 0, 0);

	$('stop-button').onclick = e => {
		if(stop) {
			stop = false;
			x = 0;
			y = 0;
			e.target.innerHTML = 'Pause';
			renderNextFrame();
		} else {
			stop = true;
			e.target.innerHTML = 'Play';
		}
	};

	function updateCursor(e) {
		if(cursorTracking) {
			if(typeof e.offsetX != 'undefined') {
				cursor.x = e.offsetX * pixelScale;
				cursor.y = e.offsetY * pixelScale;
			} else {
				//a touch, probably
				//just use the first one and ignore the others
				//multitouch is for chumps
				cursor.x =
					(e.touches[0].pageX - cvs.offsetLeft)
					* pixelScale;
				cursor.y =
					(e.touches[0].pageY - cvs.offsetTop )
					* pixelScale;
			}
		}
		return;
	}

	window.onresize = resize;

	cvs.onmousemove = e => {
		updateCursor(e);
	}

	cvs.onmousedown = e => {
		if(!cursorTracking) {
			cursorTracking = true;
			dragTimer = window.setTimeout(() => { dragging = true; }, 250);
		} else {
			cursorTracking = false;
		}
	}

	cvs.onmouseup = e => {
		if(dragging) {
			cursorTracking = false;
			dragging = false;
		} else {
			window.clearTimeout(dragTimer);
		}
	}

	cvs.ontouchmove = e => {
		e.preventDefault();
		updateCursor(e);
	}

	cvs.ontouchstart = e => {
		e.preventDefault();
		cursorTracking = true;
		updateCursor(e);
	}

	cvs.ontouchend = e => {
		cursorTracking = false;
	}

	$('speed-range').oninput = $('speed-range').onchange = e => {
		speed = +e.target.value;
	}

	$('grid-spacing').oninput = $('grid-spacing').onchange = e => {
		gridSpacing = +e.target.value;
	}

	$('threshold-range').oninput = $('threshold-range').onchange = e => {
		threshold = +e.target.value;
	}

	$('amplitude-range').oninput = $('amplitude-range').onchange = e => {
		amplitude = +e.target.value;
	}

	$('toggle-button').onclick = e => {
		//roll values
		var tmp = speed;
		speed = lastSpeed;
		lastSpeed = tmp;
		$('speed-range').value = speed;
		if(mode == 'dynamic') {
			mode = 'static';
			$('controls').className = 'static';
			//clear the screen
			backplate.data.set(background.data);
			renderPixel();
		} else {
			mode = 'dynamic';
			$('controls').className = 'dynamic';
			renderAll();
		}
		plotGrid    = $('grid-toggle').checked    = (mode == 'dynamic');
		plotSamples = $('samples-toggle').checked = (mode == 'static');
		drawCursor  = $('cursor-toggle').checked = (mode == 'dynamic');
	}

	$('reset-button').onclick = e => {
		reset();
	}

	$('grid-toggle').onchange = e => {
		plotGrid = e.target.checked;
	}

	$('samples-toggle').onchange = e => {
		plotSamples = e.target.checked;
	}

	$('cursor-toggle').onchange = e => {
		drawCursor = e.target.checked;
	}

	$('color-button').onclick = e => {
		dark = !dark;
		setColors();
	}

	renderAll();

	return;
})
