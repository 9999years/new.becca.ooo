//jquery lite™
//sorry
function $(id) { return document.getElementById(id); }

//globals
var background,
    frame,
    screen,
    pixelScale,
    graph,
    step,
    dragging,
    cursorTracking,
    iterations,
    cursor,
    lastTouch,
    partitions,
    bottomLimit,
    topLimit,
    flipped,
    lastRender,
    continuous,
    lineMode,
    overlayMode,
    touched;

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

function plotGray(image, x, y, gray) {
	plot(image, x, y, [gray, gray, gray, 0xff]);
	return;
}

function drawLine(x, y, endx, endy, color) {
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(endx, endy);
	ctx.strokeStyle = color;
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

function drawCircle(cx, cy, r, color) {
	//negative radius = error
	if(r <= 0) { return; }

	ctx.beginPath();
	ctx.arc(cx, cy, r, 0, 6.283186, false);
	ctx.strokeStyle = color;
	ctx.stroke();
	return;
}

function round(val) {
	return val.toPrecision(3);
}

function screenToGraphY(y) {
	y = ctx.y - y;
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

//ok, this one is kinda complicated to describe
//scales a number val (assumed to be in the range of valmin to valmax)
//to the equivalent fractional distance from min to max
//it's useful i swear
function scale(val, valmin, valmax, min, max)
{
	var valscale = (val - valmin) / (valmax - valmin);
	return valscale * (max - min) + min;
}

function complex(a, b) {
	//complex number in a + b𝑖 form
	return {'a': a, 'b': b};
}

function newComplex(c) {
	return {'a': c.a, 'b': c.b};
}

function complexAbs(val) {
	//just the pythagorean square
	return Math.sqrt(val.a * val.a + val.b * val.b);
}


function distMandelbrot(c, iterations)
{
	//somewhat misleading; only (roughly) approximates the distance
	//with the estimate becoming arbitrarily accurate as the distance to the
	//set approaches 0
	//see:
	//http://imajeenyus.com/mathematics/20121112_distance_estimates/distance_estimation_method_for_fractals.pdf
	
	if(complexAbs(c) >= 2.0) {
		//small speed improvement ---
		//ignore every point more than 2 away from the origin
		return Infinity;
	}

	var z  = complex(0.0, 0.0);
	var dz = complex(0.0, 0.0);
	var tmp = complex(0.0, 0.0);
	var msqr = 0;

	for(var i = 0; i < iterations; i++) {
		//z = z^2 + c
		//ergo
		//dz = 2 * z * dz + 1

		//dz = complexmult(z, dz);

		//z * dz
		tmp.a = z.a * dz.a - z.b * dz.b,
		tmp.b = z.a * dz.b + z.b * dz.a

		//dz = complexmultscalar(dz, 2.0F);
		dz.a = tmp.a * 2.0 + 1.0,
		dz.b = tmp.b * 2.0

		//z = z * z + c
		tmp.a = z.a * z.a - z.b * z.b,
		tmp.b = z.a * z.b + z.b * z.a

		//z = complexadd(complexmult(z, z), c);
		z.a = tmp.a + c.a;
		z.b = tmp.b + c.b;

		//msqr = complexabssqr(z);
		msqr = z.a * z.a + z.b * z.b;
		if(msqr > 1024) {
			break;
		}
	}

	//hubbard-douady potential
	//|z| · ln(|z|²)
	//-------------- = distance
	//    |dz|
	var ret = Math.sqrt(msqr / (dz.a * dz.a + dz.b * dz.b)) * Math.log(msqr);
	return ret > 0 ? ret : 0;
}

function subChar(character) {
	switch(character) {
	case '0': return '₀';
	case '1': return '₁';
	case '2': return '₂';
	case '3': return '₃';
	case '4': return '₄';
	case '5': return '₅';
	case '6': return '₆';
	case '7': return '₇';
	case '8': return '₈';
	case '9': return '₉';
	case '+': return '₊';
	case '-': return '₋';
	case 'e': return 'ₑ';
	default:  return 'ₓ';
	}
}

function subscript(number) {
	var orig = number + '';
	var ret = '';
	for(var i = 0; i < orig.length; i++) {
		ret += subChar(orig[i]);
	}
	return ret;
}

function mandelbrotArray(c, iterations) {
	//returns an array of values of zₙ
	//we use distMandelbrot for actual rendering so this is for the
	//decoration at the bottom
	var tmp = complex(0, 0);
	var z = complex(0, 0);
	var z_n = 0;
	var zArr = [];
	var lastRound = false;
	for(var n = 0; n < iterations; n++) {
		//square z & store in tmp, add c and store in z
		tmp.a = z.a * z.a - z.b * z.b,
		tmp.b = 2 * z.a * z.b

		z.a = tmp.a + c.a;
		z.b = tmp.b + c.b;

		//we have to duplicate the array to avoid pointer nonsense
		zArr.push(newComplex(z));
		if(complexAbs(z) >= 2.0) {
			if(lastRound) {
				break;
			} else {
				lastRound = true;
			}
		}
	}
	return zArr;
}

function mandelbrot(c, iterations) {
	var tmp = complex(0, 0);
	var z = complex(0, 0);
	var z_n = 0;
	while(iterations --> 0) {
		//square z & store in tmp, add c and store in z
		tmp.a = z.a * z.a - z.b * z.b,
		tmp.b = 2 * z.a * z.b

		z.a = tmp.a + c.a;
		z.b = tmp.b + c.b;

		z_n = complexAbs(z);
		if(z_n >= 2.0) {
			break;
		}
	}
	return z_n >= 2.0 ? true : false;
}

function scaleImageData(imageData, scale) {
	//got bless SO user rodarmor
	//http://stackoverflow.com/a/9138593/5719760
	var scaled = ctx.createImageData(
		imageData.width * scale,
		imageData.height * scale
	);

	for(var row = 0; row < imageData.height; row++) {
	for(var col = 0; col < imageData.width; col++) {
		var sourcePixel = [
			imageData.data[(row * imageData.width + col) * 4],
			imageData.data[(row * imageData.width + col) * 4 + 1],
			imageData.data[(row * imageData.width + col) * 4 + 2],
			imageData.data[(row * imageData.width + col) * 4 + 3]
		];
		for(var y = 0; y < scale; y++) {
		var destRow = row * scale + y;
		for(var x = 0; x < scale; x++) {
			var destCol = col * scale + x;
			scaled.data[(destRow * scaled.width + destCol) * 4] = sourcePixel[0];
			scaled.data[(destRow * scaled.width + destCol) * 4 + 1] = sourcePixel[1];
			scaled.data[(destRow * scaled.width + destCol) * 4 + 2] = sourcePixel[2];
			scaled.data[(destRow * scaled.width + destCol) * 4 + 3] = sourcePixel[3];
		}
		}
	}
	}

	return scaled;
}

function getColor(n) {
	return 'hsl(' + (360 - (n * 5) % 360) + ', 100%, 50%)';
}

function renderLineVisualization() {
	var decorationColor = colorToRgba([0x7f, 0x7f, 0x7f, 1]);
	var accentColor = colorToRgba([0xff, 0, 0, 1]);
	var white = colorToRgba([0xff, 0xff, 0xff, 1]);
	var mandelbrot = mandelbrotArray(
		complex(
			cursor.x,
			cursor.y
		), iterations
	).map(z => {return complexAbs(z);});
	//we only care about the absolute values
	var smallGraph = {
		'x': {
			'min': 10 * pixelScale,
			'max': ctx.x - 20 * pixelScale,
			'center': 0,
			'range': 0
		},
		'y': {
			'min': ctx.y - 20 * pixelScale,
			'max': ctx.y - 60 * pixelScale,
			'center': 0,
			'range': 0
		},
	};
	smallGraph.x.center = smallGraph.x.min + (smallGraph.x.max - smallGraph.x.min) / 2;
	smallGraph.y.center = smallGraph.y.min + (smallGraph.y.max - smallGraph.y.min) / 2;
	smallGraph.x.range  = smallGraph.x.max - smallGraph.x.min;
	smallGraph.y.range  = smallGraph.y.max - smallGraph.y.min;

	drawSharpLine(
		smallGraph.x.min, smallGraph.y.min,
		smallGraph.x.min, smallGraph.y.max,
		decorationColor
	);
	drawSharpLine(
		smallGraph.x.min, smallGraph.y.min,
		smallGraph.x.max, smallGraph.y.min,
		decorationColor
	);

	ctx.textAlign = 'end';
	ctx.textBaseline = 'middle';
	ctx.fillText('0',
		smallGraph.x.min - 2 * pixelScale, smallGraph.y.min
	);
	ctx.fillText('2',
		smallGraph.x.min - 2 * pixelScale, smallGraph.y.max
	);

	ctx.textAlign = 'center';
	ctx.textBaseline = 'bottom';
	ctx.strokeStyle = accentColor;
	ctx.fillStyle = accentColor;
	ctx.beginPath();
	var dx = smallGraph.x.range / (iterations - 1);
	//((mandelbrot.length - 1) || 1);
	x = smallGraph.x.min;
	y = scale(
		mandelbrot.shift(),
		0, 2,
		smallGraph.y.min, smallGraph.y.max
	);
	ctx.moveTo(
		x, y
	);
	var text = 'z' + subscript(0);
	var style;
	ctx.fillText(text, x, y);

	var labelSkip = Math.ceil((iterations + 1) / 15);
	for(var x = smallGraph.x.min + dx, n = 1;
		x <= smallGraph.x.max; x += dx, n++) {
		raw = mandelbrot.shift();
		if(raw == undefined) {
			continue;
		}
		y = scale(
			raw,
			0, 2,
			smallGraph.y.min, smallGraph.y.max
		);
		ctx.lineTo(x, y);
		ctx.stroke();
		if((n % labelSkip == 0) || (mandelbrot.length == 0)) {
			ctx.fillText('z' + subscript(n), x, y - 10 * pixelScale);
			if(mandelbrot.length == 0) {
				ctx.textBaseline = 'top'
				ctx.fillText(round(raw), x, y);
			}
		}
		style = getColor(n);
		ctx.strokeStyle = style;
		ctx.beginPath();
		ctx.moveTo(x, y);
	}
	ctx.stroke();
	return;
}

function renderOverlayVisualization() {
	var decorationColor = colorToRgba([0x7f, 0x7f, 0x7f, 1]);
	var accentColor = colorToRgba([0xff, 0, 0, 1]);
	var white = colorToRgba([0xff, 0xff, 0xff, 1]);
	var mandelbrot = mandelbrotArray(
		complex(
			cursor.x,
			cursor.y
		), iterations
	);
	var current = mandelbrot.shift();
	ctx.strokeStyle = accentColor;
	ctx.fillStyle = accentColor;
	var x, y;
	x = graphToScreenX(current.a);
	y = graphToScreenY(current.b);
	ctx.beginPath();
	ctx.moveTo(x, y);

	var n = 0;
	var labelSkip = Math.ceil((iterations + 1) / 15);
	var style;
	while(current = mandelbrot.shift()) {
		if(current == undefined) {
			continue;
		}
		x = graphToScreenX(current.a);
		y = graphToScreenY(current.b);
		ctx.lineTo(x, y);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(x, y);
		if(mandelbrot.length == 0) {
			ctx.fillText('z' + subscript(n), x, y - 10 * pixelScale);
		}
		n = n + 1;
		style = getColor(n);
		ctx.strokeStyle = style;
	}
	ctx.stroke();
	//drawCircle(graphToScreenX(0), graphToScreenY(0),
		//graphToScreenX(2) - graphToScreenX(0),
		//accentColor
	//);
	return;
}

function renderDecoration() {
	var decorationColor = colorToRgba([0x7f, 0x7f, 0x7f, 1]);
	var accentColor = colorToRgba([0xff, 0, 0, 1]);
	var white = colorToRgba([0xff, 0xff, 0xff, 1]);

	var xTickStep = getTickStep(graph.x.range);
	var yTickStep = getTickStep(graph.y.range);

	ctx.fillStyle   = decorationColor;
	ctx.strokeStyle = decorationColor;
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

	//cursor crosshairs
	ctx.textBaseline = 'top';
	ctx.textAlign = 'left';
	ctx.fillStyle = accentColor;
	drawSharpLine(
		graphToScreenX(cursor.x),
		graphToScreenY(cursor.y) - 10 * pixelScale,
		graphToScreenX(cursor.x),
		graphToScreenY(cursor.y) + 10 * pixelScale,
		accentColor
	);
	drawSharpLine(
		graphToScreenX(cursor.x) - 10 * pixelScale,
		graphToScreenY(cursor.y),
		graphToScreenX(cursor.x) + 10 * pixelScale,
		graphToScreenY(cursor.y),
		accentColor
	);
	ctx.fillText(
		'(' +
		round(cursor.x) + ', ' +
		round(cursor.y) + ')',
		graphToScreenX(cursor.x) + 10 * pixelScale,
		graphToScreenY(cursor.y) + 10 * pixelScale
	);

	//visualization
	if(lineMode) {
		renderLineVisualization();
	}
	if(overlayMode) {
		renderOverlayVisualization();
	}
	return;
}

function render(time) {
	//if(performance.now() - time < 60) { return; }
	var graphColor = colorToRgba([0, 0, 0, 1]);
	var intFillColor = colorToRgba([0xff, 0, 0, 0.5]);
	var accentColor = colorToRgba([0xff, 0, 0, 1]);
	var x, y, dist;
	ctx.clearRect(0, 0, ctx.x, ctx.y);

	//resolution scale
	//so we can chill a bit while dragging
	//var res = dragging ? 4 : 1;
	//if(dragging) {
		//screen = ctx.createImageData(ctx.x, ctx.y);
		//iterations /= res;
		//iterations -= 1;
	//}

	var distFunction;
	//if(dragging) {
		//distFunction = function(i, j, iterations) {
			//return 0xff * mandelbrot(
				//complex(screenToGraphX(j), screenToGraphY(i)),
				//iterations
			//);
		//};
	//} else {
	distFunction = function(i, j, iterations) {
		return 90000 * distMandelbrot(
			complex(screenToGraphX(j), screenToGraphY(i)),
			iterations
		) / graph.x.range;
	};
	//}

	for(var i = 0; i < ctx.y; i++) {
	for(var j = 0; j < ctx.x; j++) {
		dist = distFunction(i, j, iterations);
		plotGray(screen, j, i, dist);
	}
	}

	//push array to canvas
	//update time, push a frame, call render() again
	//screen = scaleImageData(screen, res);
	ctx.putImageData(screen, 0, 0);

	renderDecoration();

	//if(dragging) {
		//iterations += 1;
		//iterations *= res;
	//}
	frame++;
	if(!touched) {
		cursor.x = screenToGraphX(ctx.x / 2 + 75 * Math.cos(frame / 60));
		cursor.y = screenToGraphY(ctx.y / 2 + 75 * Math.sin(frame / 60));
		window.requestAnimationFrame(render);
	}
	return;
}

function calibrateGraph() {
	//re calculate keys of graph
	graph.x.range  = +$('scale-value').value;
	graph.x.center = +$('center-x-value').value;
	graph.x.min = graph.x.center - graph.x.range / 2;
	graph.x.max = graph.x.center + graph.x.range / 2;
	graph.y.range  = +$('scale-value').value;
	graph.y.center = +$('center-y-value').value;
	graph.y.min = graph.y.center - graph.y.range / 2;
	graph.y.max = graph.y.center + graph.y.range / 2;
	//re-calc proper iteration count
	iterations = Math.floor(+$('iterations-value').value + 4 / graph.x.range) * 2;
	$('location-dropdown').value = graph.x.center + " + " + graph.y.center;
	return;
}

function updateScroll(e) {
	var width = +$('scale-value').value;

	var scale;
	if(e.type == 'wheel') {
		scale = e.deltaY > 0 ? 1.1 : 0.9;
	} else {
		//touch
	}

	$('scale-range').value = $('scale-value').value = (width * scale).toPrecision(3);
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
	var dx = 0, dy = 0;

	if(e.type == 'mousemove') {
		if(cursorTracking) {
			cursor.x = screenToGraphX(e.offsetX * pixelScale);
			cursor.y = screenToGraphY(e.offsetY * pixelScale);
		}
		if(!dragging) { return; }
		//deltas are negative, but y axis is flipped, so we only
		//flip the x axis
		dx = screenToGraphX(0) - screenToGraphX(e.movementX);
		dy = screenToGraphY(0) - screenToGraphY(e.movementY);
	} else {
		if(e.touches.length < lastTouch.count) {
			return;
		}
		//TODO implement cursor for touches
		//cursor.x = e.touches[0].offsetX;
		//cursor.y = e.touches[0].offsetY;
		if(!dragging) { return; }
		//touch
		dx = screenToGraphX(0) - screenToGraphX(
			(e.touches[0].pageX - lastTouch.x) * pixelScale
		);
		dy = screenToGraphY(0) - screenToGraphY(
			(e.touches[0].pageY - lastTouch.y) * pixelScale
		);
		lastTouch.x = e.touches[0].pageX;
		lastTouch.y = e.touches[0].pageY;
		if(e.touches.length > 1) {
			var currentDist = distsqr(
				e.touches[0].pageX, e.touches[0].pageY,
				e.touches[1].pageX, e.touches[1].pageY
			);
			var scale = lastTouch.dist / currentDist;
			lastTouch.dist = currentDist;
			var width = +$('scale-value').value;
			$('scale-range').value = (width * scale).toPrecision(3);
			calibrateGraph();
		}
	}

	$('center-x-value').value = $('center-x-range').value = cx + dx;
	$('center-y-value').value = $('center-y-range').value = cy + dy;
	calibrateGraph();
	return;
}

function reset() {
	calibrateGraph();
	return;
}

function init() {
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
	dragging = false;
	cursorTracking = true;
	touched = false;
	frame = 0;
	mode = 'line';

	lineMode = $('mode-line').checked;

	overlayMode = $('mode-overlay').checked;

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

	cursor = {'x': 0, 'y': 0};

	reset();

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

	screen = ctx.createImageData(frameWidth, frameHeight);

	cvs.onwheel = e => {
		updateScroll(e);
		window.requestAnimationFrame(render);
		return false;
	};

	cvs.onmousemove = e => {
		touched = true;
		updateCursor(e);
		window.requestAnimationFrame(render);
	};

	cvs.onmousedown = e => {
		cvs.style.cursor = '-webkit-grabbing';
		dragging = true;
		window.requestAnimationFrame(render);
	};

	cvs.onmouseup = cvs.onmouseout = e => {
		cvs.style.cursor = '-webkit-grab';
		dragging = false;
		window.requestAnimationFrame(render);
	};

	cvs.ontouchmove = e => {
		updateCursor(e);
		window.requestAnimationFrame(render);
		return false;
	}

	cvs.ontouchstart = e => {
		e.preventDefault();
		dragging = true;
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
		dragging = false;
	}

	$('scale-value').oninput = $('scale-value').onchange = e => {
		$('scale-range').value = e.target.value;
		calibrateGraph();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('scale-range').oninput = $('scale-range').onchange = e => {
		$('scale-value').value = e.target.value;
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

	$('iterations-value').oninput = $('iterations-value').onchange = e => {
		$('iterations-range').value = e.target.value;
		calibrateGraph();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('iterations-range').oninput = $('iterations-range').onchange = e => {
		$('iterations-value').value = e.target.value;
		calibrateGraph();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('automate-button').onclick = e => {
		if(touched == true) {
			touched = false;
			window.requestAnimationFrame(render);
		}
	};

	$('mode-line').onclick = e => {
		lineMode = e.target.checked;
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('mode-overlay').onclick = e => {
		overlayMode = e.target.checked;
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	$('location-dropdown').oninput = e => {
		var matches = e.target.value.match(/[0-9-.]+/g);
		$('center-x-value').value = $('center-x-range').value = matches[0];
		$('center-y-value').value = $('center-y-range').value = matches[1];
		calibrateGraph();
		if(touched) {
			window.requestAnimationFrame(render);
		}
	};

	window.onkeydown = e => {
		if(e.key == 't') {
			event.preventDefault();
			cursorTracking = !cursorTracking;
			if(cursorTracking) {
				$('cursor-tracking-note').style.display = 'none';
			} else {
				$('cursor-tracking-note').style.display = 'block';
			}
		}
	};

	window.requestAnimationFrame(render);
	return;
};

