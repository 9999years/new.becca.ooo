import { $ } from "./fake"

//globals
var background,
    bottomLimit,
    continuous,
    ctx,
    cursorTracking,
    cvs,
    flipped,
    formula,
    frame,
    gotIt,
    graph,
    gridSpacing,
    lastRender,
    lastTouch,
    mode,
    partitions,
    pixelScale,
    screen,
    step,
    topLimit,
    touched

function colorToRgba(color) {
	return 'rgba('
		+ color[0] + ','
		+ color[1] + ','
		+ color[2] + ','
		+ color[3] + ')';
}

function drawLine(x, y, endx, endy, color) {
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(endx, endy);
	ctx.strokeStyle = colorToRgba(color);
	ctx.stroke();
	return;
}

function drawSharpLine(x, y, endx, endy, color) {
	drawLine(
		Math.floor(x) + 0.5,
		Math.floor(y) + 0.5,
		Math.floor(endx) + 0.5,
		Math.floor(endy) + 0.5,
		color
	);
	return;
}

function round(val) {
	return val.toPrecision(3);
}

function screenToGraphY(y) {
	//transform screen coords to graph coords
	return ((y / ctx.y) * graph.y.range + graph.y.center - graph.y.range / 2);
}

function screenToGraphX(x) {
	return (x / ctx.x) * graph.x.range + graph.x.center - graph.x.range / 2;
}

function graphToScreenY(y) {
	//reverse
	return ctx.y - (y - graph.y.min) / graph.y.range * ctx.y;
}

function graphToScreenX(x) {
	return (x - graph.x.min) / graph.x.range * ctx.x;
}

function getYValue(x) {
	//x in graph to y in graph
	try {
		return eval(formula);
	} catch(e) {
		return NaN;
	}
}

function getTickStep(width) {
	//get the number's exponent
	var exponent = Math.floor(Math.log10(width));
	//by raising it to -log x, we can "normalize" it to a number
	//from 1 to 10, which we can round to 2.5
	//and then raise (or lower) it to its original exponent - 1
	//(to make it approx. 1/10th of the screen's width)
	var normal = width * Math.pow(10, -exponent);
	var tickStep = Math.ceil(normal / 2.5) * 2.5
		* Math.pow(10, exponent - 1);
	return tickStep;
}

function renderIntegral() {
	//trapezoidal
	//start
	//mid
	//end
	var intFillColor = colorToRgba([0xff, 0, 0, 0.5]);
	var intStrokeColor = colorToRgba([0xff, 0, 0, 1]);
	ctx.strokeStyle = intStrokeColor;
	ctx.fillStyle = intFillColor;

	var screenYZero = Math.floor(graphToScreenY(0)) + 0.5;

	var intStep = (topLimit - bottomLimit) / partitions;
	if(intStep == 0) {
		//something went wrong, avoid an infinite loop
		return;
	}
	var getyi;
	if(mode == 'trapezoidal' || mode == 'start' || mode == 'definite') {
		getyi = (i) => {return getYValue(i);}
	} else if(mode == 'end') {
		getyi = (i) => {return getYValue(i + intStep);}
	} else if(mode == 'mid') {
		getyi = (i) => {return getYValue(i + intStep / 2);}
	}
	var getyi2;
	if(
		mode == 'start' ||
		mode == 'mid' ||
		mode == 'end'
	) {
		getyi2 = (i) => {return yi;}
	} else {
		//trapezoidal OR definite
		getyi2 = (i) => {return getYValue(i + intStep);}
	}
	var area = 0;
	var yi, yi2, yprev;
	yprev = yi = getyi();
	ctx.beginPath();
	for(var i = bottomLimit; i < topLimit - 0.00001; i += intStep) {
		yi  = getyi(i);
		yi2 = getyi2(i);
		if(isNaN(yi) || isNaN(yi2) || !isFinite(yi) || !isFinite(yi2)) {
			//don't NaN-corrupt my area
			continue;
		}
		area += (yi + yi2) / 2 * intStep;
		yprev = yi;
		if(Math.abs(yi2) > graph.y.range * 100) {
			//“asymptote detection”
			continue;
		}

		if(mode != 'definite') {
			ctx.beginPath();
			//top left
			ctx.moveTo(
				Math.floor(graphToScreenX(i)) + 0.5,
				Math.floor(graphToScreenY(yi)) + 0.5
			);
		}
		//top right
		ctx.lineTo(
			Math.floor(graphToScreenX(i + intStep)) + 0.5,
			Math.floor(graphToScreenY(yi2)) + 0.5
		);
		if(mode != 'definite') {
			//bottom right
			ctx.lineTo(
				Math.floor(graphToScreenX(i + intStep)) + 0.5,
				screenYZero
			);
			//back to start
			ctx.lineTo(
				Math.floor(graphToScreenX(i)) + 0.5,
				screenYZero
			);
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
		}
	}

	if(mode == 'definite') {
		//bottom right
		ctx.lineTo(
			Math.floor(graphToScreenX(topLimit)) + 0.5,
			screenYZero
		);
		//back to start
		ctx.lineTo(
			Math.floor(graphToScreenX(bottomLimit)) + 0.5,
			screenYZero
		);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
	}

	//if we actually took the limit from top to bottom, invert the area
	if(flipped) {
		area *= -1;
	}

	//draw area text
	ctx.textAlign = 'start';
	ctx.textBaseline = 'bottom';
	ctx.fillText('∫f(x)dx ≈ ' + area.toPrecision(5),
		0, ctx.y - 15 * pixelScale);
	ctx.font = 10 * pixelScale + 'px ' + ctx.fontFamily;
	ctx.fillText(bottomLimit.toPrecision(3), 0, ctx.y);
	ctx.fillText(topLimit.toPrecision(3), 2 * pixelScale, ctx.y - 32 * pixelScale);
	ctx.font = 16 * pixelScale + 'px ' + ctx.fontFamily;
}

function renderDecoration() {
	var decorationColor = [0, 0, 0, 0.5];

	var xTickStep = getTickStep(graph.x.range);
	var yTickStep = getTickStep(graph.y.range);

	ctx.fillStyle   = colorToRgba(decorationColor);
	ctx.strokeStyle = colorToRgba(decorationColor);
	//draw x axis
	drawLine(
		Math.floor(graphToScreenX(graph.x.min)) - 0.5,
		Math.floor(graphToScreenY(0)) + 0.5,
		Math.floor(graphToScreenX(graph.x.max)) + 0.5,
		Math.floor(graphToScreenY(0)) + 0.5,
		decorationColor
	);
	//draw y axis
	drawLine(
		Math.floor(graphToScreenX(0)) + 0.5,
		Math.floor(graphToScreenY(graph.y.min)) - 0.5,
		Math.floor(graphToScreenX(0)) + 0.5,
		Math.floor(graphToScreenY(graph.y.max)) + 0.5,
		decorationColor
	);
	//draw ticks
	for(var i = graph.x.min - graph.x.min % xTickStep; i < graph.x.max + xTickStep; i += xTickStep) {
		drawSharpLine(
			graphToScreenX(i),
			graphToScreenY(0),
			graphToScreenX(i),
			graphToScreenY(graph.y.range / 50),
			decorationColor
		);
	}
	for(var i = graph.y.min - graph.y.min % yTickStep; i < graph.y.max + yTickStep; i += yTickStep) {
		drawSharpLine(
			graphToScreenX(0),
			graphToScreenY(i),
			graphToScreenX(graph.x.range / 50),
			graphToScreenY(i),
			decorationColor
		);
	}

	//draw tick width indicator at bottom
	var xTickWidthOnScreen = graphToScreenX(xTickStep) - graphToScreenX(0);
	//y axis is reversed relative to canvas axis so we flip it
	var yTickWidthOnScreen = -graphToScreenY(yTickStep) + graphToScreenY(0);
	//top line
	drawSharpLine(
		ctx.x - xTickWidthOnScreen - 2 * pixelScale, 2 * pixelScale,
		ctx.x - 2 * pixelScale, 2 * pixelScale,
		decorationColor
	);
	//x tick
	drawSharpLine(
		ctx.x - xTickWidthOnScreen - 2 * pixelScale, 2 * pixelScale,
		ctx.x - xTickWidthOnScreen - 2 * pixelScale, 6 * pixelScale,
		decorationColor
	);
	//x tick text
	ctx.textBaseline = 'top';
	ctx.textAlign = 'center';
	ctx.fillText(xTickStep,
		ctx.x - xTickWidthOnScreen, 8 * pixelScale
	);
	//right line
	drawSharpLine(
		ctx.x - 2 * pixelScale, 2 * pixelScale,
		ctx.x - 2 * pixelScale, yTickWidthOnScreen + 2 * pixelScale,
		decorationColor
	);
	//y tick
	drawSharpLine(
		ctx.x - 2 * pixelScale, yTickWidthOnScreen + 2 * pixelScale,
		ctx.x - 6 * pixelScale, yTickWidthOnScreen + 2 * pixelScale,
		decorationColor
	);
	//y tick text
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'right';
	ctx.fillText(yTickStep,
		ctx.x - 10 * pixelScale, yTickWidthOnScreen
	);

	ctx.textBaseline = 'top';
	ctx.textAlign = 'start';
	//top left coords
	ctx.fillText('(' + round(graph.x.min) + ', ' + round(graph.y.max) + ')',
		0, 0);
	ctx.textBaseline = 'bottom';
	//center coords
	ctx.fillText('(0, 0)', graphToScreenX(0) + 2 * pixelScale, graphToScreenY(0) - 2 * pixelScale);
	ctx.textAlign = 'end';
	//bottom right coords
	ctx.fillText('(' + round(graph.x.max) + ', ' + round(graph.y.min) + ')',
		ctx.x, ctx.y);
	return;
}

function render(time) {
	//if(performance.now() - time < 60) { return; }
	var graphColor = colorToRgba([0, 0, 0, 1]);
	var x, y, yval;
	ctx.clearRect(0, 0, ctx.x, ctx.y);
	renderDecoration();
	//graph
	ctx.beginPath();
	ctx.moveTo(0, graphToScreenY(getYValue(screenToGraphX(0))));
	for(var i = step; i < ctx.x + step; i += step) {
		x = screenToGraphX(i);
		yval = getYValue(x);
		if(
			isNaN(yval) || !isFinite(yval) ||
			Math.abs(yval) > graph.y.range * 100
		) {
			//don't NaN-corrupt my area
			continue;
		}
		y = graphToScreenY(yval);
		ctx.lineTo(i, y);
	}
	ctx.strokeStyle = graphColor;
	ctx.stroke();

	//integral
	renderIntegral();

	frame++;
	if(!touched || continuous) {
		if(!touched) {
			partitions = $('partitions-value').value = $('partitions-range').value =
				Math.floor(10 * Math.cos(frame / 30) + 12);
		}
		window.requestAnimationFrame(render);
	}
	return;
}

function calibrateGraph() {
	//re calculate keys of graph
	graph.x.range  = +$('width-value').value;
	graph.x.center = +$('center-x-value').value;
	graph.x.min = graph.x.center - graph.x.range / 2;
	graph.x.max = graph.x.center + graph.x.range / 2;
	graph.y.range  = +$('height-value').value;
	graph.y.center = +$('center-y-value').value;
	graph.y.min = graph.y.center - graph.y.range / 2;
	graph.y.max = graph.y.center + graph.y.range / 2;
	//fix some attributes
	$('bottom-limit-range').setAttribute('min', graph.x.min);
	$('bottom-limit-range').setAttribute('max', graph.x.max);
	$('top-limit-range').setAttribute('min', graph.x.min);
	$('top-limit-range').setAttribute('max', graph.x.max);
	return;
}

function calibrateIntegral() {
	bottomLimit = +$('bottom-limit-value').value;
	topLimit = +$('top-limit-value').value;
	if(bottomLimit > topLimit) {
		flipped = true;
		var tmp;
		tmp = bottomLimit;
		bottomLimit = topLimit;
		topLimit = tmp;
	} else {
		flipped = false;
	}
	return;
}


function updateScroll(e) {
	var width = +$('width-value').value;
	var height = +$('height-value').value;

	var scale;
	if(e.type == 'wheel') {
		scale = e.deltaY > 0 ? 1.1 : 0.9;
	} else {
		//touch
	}

	$('width-value').value  = $('width-range').value  = (width * scale).toPrecision(3);
	$('height-value').value = $('height-range').value = (height * scale).toPrecision(3);
	calibrateGraph();
	return;
}

function dist(x1, x2, y1, y2) {
	return  Math.sqrt(
		Math.pow(x2 - x1, 2) +
		Math.pow(y2 - y1, 2)
	);
}

function distsqr(x1, y1, x2, y2) {
	return  Math.pow(x2 - x1, 2) +
		Math.pow(y2 - y1, 2);
}

function updateCursor(e) {
	var cx = +$('center-x-value').value;
	var cy = +$('center-y-value').value;
	var dx, dy;

	if(e.type == 'mousemove') {
		//deltas are negative, but y axis is flipped, so we only
		//flip the x axis
		dx = -screenToGraphX(e.movementX) + screenToGraphX(0);
		dy =  screenToGraphY(e.movementY) - screenToGraphY(0);
	} else {
		if(e.touches.length < lastTouch.count) {
			return;
		}
		//touch
		dx = -screenToGraphX((e.touches[0].pageX - lastTouch.x) * pixelScale) + screenToGraphX(0);
		dy =  screenToGraphY((e.touches[0].pageY - lastTouch.y) * pixelScale) - screenToGraphY(0);
		lastTouch.x = e.touches[0].pageX;
		lastTouch.y = e.touches[0].pageY;
		if(e.touches.length > 1) {
			var currentDist = distsqr(
				e.touches[0].pageX, e.touches[0].pageY,
				e.touches[1].pageX, e.touches[1].pageY
			);
			var scale = lastTouch.dist / currentDist;
			lastTouch.dist = currentDist;
			var width = +$('width-value').value;
			var height = +$('height-value').value;
			$('width-value').value  = $('width-range').value  = (width * scale).toPrecision(3);
			$('height-value').value = $('height-range').value = (height * scale).toPrecision(3);
			calibrateGraph();
		}
	}

	$('center-x-value').value = $('center-x-range').value = cx + dx;
	$('center-y-value').value = $('center-y-range').value = cy + dy;
	calibrateGraph();
	return;
}

function calibrateFormula() {
	formula = $('formula-input').value;
	if(!gotIt) {
		if(formula.indexOf('^') != -1) {
			//there's a ^ in the eq
			$('formula-note').style.display = 'block';
		} else {
			$('formula-note').style.display = 'none';
		}
	}
	var descriptors = Object.getOwnPropertyDescriptors(Math);
	Object.getOwnPropertyNames(Math).forEach(val => {
		formula = formula.replace(new RegExp('\\b' + val.toLowerCase() + '\\b', 'gi'), 'Math.' + val);
	});
	formula = formula.replace(/\bln\b/gi, 'Math.log');
	formula = formula.replace(/\bt\b/gi, 'performance.now() / 1000');
	return;
}

function calibratePartitions() {
	if(mode == 'definite') {
		partitions = 1000;
	} else {
		partitions = +$('partitions-value').value;
	}
	return;
}

function reset() {
	calibratePartitions();
	calibrateGraph();
	calibrateFormula();
	calibrateIntegral();
	return;
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("For some reason, this page runs very slowly with the dev console open. If you're experiencing a slow framerate, try closing the dev tools / element inspector.")
	//initialize cvs, ctx, etc
	var frameWidth, frameHeight;
	pixelScale = window.devicePixelRatio;
	var maxWidth = document.body.clientwidth * pixelScale;
	if(maxWidth < 500) {
		frameWidth = maxWidth * pixelScale;
	} else {
		frameWidth  = 500 * pixelScale;
	}
	frameHeight = frameWidth;
	//gridSpacing = +$('grid-spacing').value;
	cursorTracking = false;
	continuous = false;
	touched = false;
	gotIt = false;
	frame = 0;

	lastTouch = { 'x': 0, 'y': 0, 'dist': 0 };

	graph = {
		'x': {
			'range':  0,
			'min':    0,
			'max':    0,
			'center': 0
		},
		'y': {
			'range':  0,
			'min':    0,
			'max':    0,
			'center': 0
		}
	};

	bottomLimit = +$('bottom-limit-value').value;
	topLimit =    +$('top-limit-value').value;

	//welcome to ternary hell
	mode = $('trapezoidal-button').checked ? 'trapezoidal' :
		$('rectangular-bottom-button').checked ? 'bottom' :
		$('rectangular-mid-button').checked ? 'mid' :
		$('rectangular-end-button').checked ? 'start' : 'trapezoidal';

	reset();

	step = 1;

	cvs = $('main-canvas');

	cvs.setAttribute('height', frameHeight + 'px');
	cvs.setAttribute('width',  frameWidth + 'px');
	ctx = cvs.getContext('2d')
	ctx.width  = frameWidth;
	ctx.height = frameWidth;
	ctx.x = frameWidth;
	ctx.y = frameHeight;
	cvs.style.height = frameHeight / pixelScale + 'px';
	cvs.style.width =  frameWidth / pixelScale + 'px';
	ctx.lineWidth = pixelScale;

	ctx.fontFamily = '"Segoe UI", -apple-system, "Helvetica", "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", "Noto Sans",  "FreeSans", "Code2001", "Code2000", "DejaVu Sans",  sans-serif';
	ctx.font = 16 * pixelScale + 'px ' + ctx.fontFamily;

	cvs.onwheel = e => {
		updateScroll(e);
		if(touched) {
			window.requestAnimationFrame(render);
		}
		return false;
	};

	cvs.onmousemove = e => {
		if(cursorTracking) {
			updateCursor(e);
			if(touched) {
				window.requestAnimationFrame(render);
			}
		}
	};

	cvs.onmousedown = e => {
		cvs.style.cursor = '-webkit-grabbing';
		cursorTracking = true;
	};

	cvs.onmouseup = cvs.onmouseout = e => {
		cvs.style.cursor = '-webkit-grab';
		cursorTracking = false;
	};

	cvs.ontouchmove = e => {
		updateCursor(e);
		if(touched) {
			window.requestAnimationFrame(render);
		}
		return false;
	}

	cvs.ontouchstart = e => {
		e.preventDefault();
		cursorTracking = true;
		lastTouch.x = e.touches[0].pageX;
		lastTouch.y = e.touches[0].pageY;
		if(e.touches.length > 1) {
			lastTouch.dist = distsqr(
				e.touches[0].pageX, e.touches[0].pageY,
				e.touches[1].pageX, e.touches[1].pageY
			);
		}
		lastTouch.count = e.touches.length;
		updateCursor(e);
	}

	cvs.ontouchend = e => {
		cursorTracking = false;
	}

	$('width-value').oninput = $('width-value').onchange = e => {
		$('width-range').value = e.target.value;
		calibrateGraph();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('width-range').oninput = $('width-range').onchange = e => {
		$('width-value').value = e.target.value;
		calibrateGraph();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('height-value').oninput = $('height-value').onchange = e => {
		$('height-range').value = e.target.value;
		calibrateGraph();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('height-range').oninput = $('height-range').onchange = e => {
		$('height-value').value = e.target.value;
		calibrateGraph();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('center-x-value').oninput = $('center-x-value').onchange = e => {
		$('center-x-range').value = e.target.value;
		calibrateGraph();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('center-x-range').oninput = $('center-x-range').onchange = e => {
		$('center-x-value').value = e.target.value;
		calibrateGraph();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('center-y-value').oninput = $('center-y-value').onchange = e => {
		$('center-y-range').value = e.target.value;
		calibrateGraph();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('center-y-range').oninput = $('center-y-range').onchange = e => {
		$('center-y-value').value = e.target.value;
		calibrateGraph();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('partitions-value').oninput = $('partitions-value').onchange = e => {
		touched = true;
		$('partitions-range').value = e.target.value;
		mode = mode == 'definite' ? 'trapezoidal' : mode;
		calibratePartitions();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('partitions-range').oninput = $('partitions-range').onchange = e => {
		touched = true;
		$('partitions-value').value = e.target.value;
		mode = mode == 'definite' ? 'trapezoidal' : mode;
		calibratePartitions();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('bottom-limit-value').oninput = $('bottom-limit-value').onchange = e => {
		$('bottom-limit-range').value = e.target.value;
		calibrateIntegral();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('bottom-limit-range').oninput = $('bottom-limit-range').onchange = e => {
		$('bottom-limit-value').value = e.target.value;
		calibrateIntegral();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('top-limit-value').oninput = $('top-limit-value').onchange = e => {
		$('top-limit-range').value = e.target.value;
		calibrateIntegral();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('top-limit-range').oninput = $('top-limit-range').onchange = e => {
		$('top-limit-value').value = e.target.value;
		calibrateIntegral();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('formula-input').oninput = $('formula-input').onchange = e => {
		calibrateFormula();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('trapezoidal-button').onclick = e => {
		mode = 'trapezoidal';
		calibratePartitions();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('rectangular-bottom-button').onclick = e => {
		mode = 'start';
		calibratePartitions();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('rectangular-mid-button').onclick = e => {
		mode = 'mid';
		calibratePartitions();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('rectangular-end-button').onclick = e => {
		mode = 'end';
		calibratePartitions();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('definite-approximation').onclick = e => {
		mode = 'definite';
		touched = true;
		calibratePartitions();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('got-it').onclick = e => {
		$('formula-note').remove();
		gotIt = true;
	};

	window.requestAnimationFrame(render);
})
