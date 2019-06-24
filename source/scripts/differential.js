import { $ } from "./fake"

var background,
    bottomLimit,
    continuous,
    cursor,
    cursorTracking,
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
    touched,
    ctx,
    cvs

function colorToRgba(color) {
    return 'rgba('
        + color[0] + ','
        + color[1] + ','
        + color[2] + ','
        + color[3] + ')';
}

function drawLine(x, y, endx, endy, color) {
    // archive color to restore canvas to original state
    let prevColor = ctx.strokeStyle;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endx, endy);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.strokeStyle = prevColor;
}

function drawSharpLine(x, y, endx, endy, color) {
    drawLine(
        Math.floor(x) + 0.5,
        Math.floor(y) + 0.5,
        Math.floor(endx) + 0.5,
        Math.floor(endy) + 0.5,
        color
    );
}

function round(val) {
    return val.toPrecision(3);
}

function screenToGraphY(y) {
    //transform screen coords to graph coords
    return (y / ctx.y) * graph.y.range + graph.y.min;
}

function screenToGraphX(x) {
    return -(x / ctx.x) * graph.x.range - graph.x.min;
}

function graphToScreenY(y) {
    //reverse
    return ctx.y - (y - graph.y.min) / graph.y.range * ctx.y;
}

function graphToScreenX(x) {
    return (x - graph.x.min) / graph.x.range * ctx.x;
}

function getdydx(x, y) {
    //x, y in graph to dy/dx
    try {
        return eval(formula);
    } catch(e) {
        return NaN;
    }
}

function getTickStep(width) {
    //get the number's exponent
    let exponent = Math.floor(Math.log10(width));
    //by raising it to -log x, we can "normalize" it to a number
    //from 1 to 10, which we can round to 2.5
    //and then raise (or lower) it to its original exponent - 1
    //(to make it approx. 1/10th of the screen's width)
    let normal = width * Math.pow(10, -exponent);
    let tickStep = Math.ceil(normal / 2.5) * 2.5
        * Math.pow(10, exponent - 1);
    return tickStep;
}

function renderGrid() {
    let color = colorToRgba([0, 0, 0, 1]);
    let increment = graph.x.range / gridSpacing;
    let xOfs = -graph.x.min % increment;
    let yOfs = -graph.y.min % increment;
    let tickLength = 10;
    let dydx, theta, cost, sint;
    for(let y = graph.y.min + yOfs; y < graph.y.max; y += increment) {
    for(let x = graph.x.min + xOfs; x < graph.x.max; x += increment) {
        dydx = getdydx(x, y);
        theta = Math.atan(dydx);
        const slope_x = tickLength * Math.cos(theta);
        const slope_y = tickLength * Math.sin(theta);
        drawLine(
            graphToScreenX(x) - slope_x,
            graphToScreenY(y) + slope_y,
            graphToScreenX(x) + slope_x,
            graphToScreenY(y) - slope_y,
            color
        );
    }
    }
}

function renderSolution() {
    // get cursor pos. in graph coords
    let startx = cursor.x;
    let starty = cursor.y;
    let color = colorToRgba([255, 0, 0, 1]);
    // divide graph range into slices
    let dx = graph.x.range / ctx.x;
    let y = starty;
    // previous y, for asymptote checking
    let y_p = y;
    let x = startx;
    let dydx, dydx_p;
    dydx_p = dydx = getdydx(x, y);

    ctx.fillStyle = color;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillText('(' + startx.toPrecision(3)
        +   ', ' + starty.toPrecision(3) + ')',
        graphToScreenX(startx) + 15 * pixelScale,
        graphToScreenY(starty)
    );
    ctx.fillText('dy/dx = ' + dydx.toPrecision(3),
        graphToScreenX(startx) + 15 * pixelScale,
        graphToScreenY(starty) + 18 * pixelScale
    );

    let flip = () => {
        // flip dx so we're traveling from right to left
        dx *= -1;
        // finish path, reset coords
        ctx.stroke();
        ctx.moveTo(startx, starty);
        ctx.beginPath();
        x = startx;
        y = y_p = starty;
        dydx_p = dydx = getdydx(x, y);
    };

    if(
           (cursor.x > graph.x.max)
        || (cursor.x < graph.x.min)
        || (cursor.y > graph.y.max)
        || (cursor.y < graph.y.min)
    ) {
        //out of bounds!
        return;
    }

    // use euler’s method
    // move right, then left
    ctx.strokeStyle = color;
    ctx.moveTo(graphToScreenX(startx), graphToScreenY(starty));
    ctx.beginPath();
    while(x += dx) {
        dydx = getdydx(x, y);
        y += dydx * dx;

        // out of bounds (10 window-lengths above or below the window)
        // don’t be fooled by the next if(), this catches most of
        // the asymptotes
        if(
               (y >= graph.y.max + 5 * graph.y.range)
            || (y <= graph.y.min - 5 * graph.y.range)
            || (isNaN(y))
            || (!isFinite(y))
        ) {
            //console.log(x + ', ' + y);
            // one last line so the graph doesn’t dissapear
            // mid-graph
            //ctx.fillText("OOB", graphToScreenX(x - dx), graphToScreenY(y_p));
            if(!isNaN(y) && isFinite(y)) {
                y = ctx.y;
                if(
                    ((dydx_p > 0) && (dx > 0)) ||
                    ((dydx_p < 0) && (dx < 0))
                ) { y *= -1; }
                ctx.lineTo(graphToScreenX(x), y);
            }
            if(dx >= 0) {
                flip();
                continue;
            } else {
                break;
            }
        }

        // asymptote is defined as the slope changing sign and being
        // of a large magnitude
        // not bullet-proof but better than nothing
        // euler’s method doesn’t really work across asymptotes
        // (although it will usually get the graph shape right) so
        // we just call it quits
        if((Math.sign(dydx) === -Math.sign(dydx_p))
            && (Math.abs(dydx) >= 20)
        ) {
            //ctx.fillText("SLOPE", graphToScreenX(x), graphToScreenY(y_p));
            break;
        } else {
            //console.log(x + ', ' + y);
            ctx.lineTo(graphToScreenX(x), graphToScreenY(y));
        }

        if(x >= graph.x.max) {
            // start over, reverse direction
            flip();
        } else if(x <= graph.x.min) {
            break;
        }

        dydx_p = dydx;
        y_p = y;
    }
    ctx.stroke();
}

function renderDecoration() {
    let decorationColor = colorToRgba([0, 0, 0, 0.5]);

    let xTickStep = getTickStep(graph.x.range);
    let yTickStep = getTickStep(graph.y.range);

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
    for(let i = graph.x.min - graph.x.min % xTickStep; i < graph.x.max + xTickStep; i += xTickStep) {
        drawSharpLine(
            graphToScreenX(i),
            graphToScreenY(0),
            graphToScreenX(i),
            graphToScreenY(graph.y.range / 50),
            decorationColor
        );
    }
    for(let i = graph.y.min - graph.y.min % yTickStep; i < graph.y.max + yTickStep; i += yTickStep) {
        drawSharpLine(
            graphToScreenX(0),
            graphToScreenY(i),
            graphToScreenX(graph.x.range / 50),
            graphToScreenY(i),
            decorationColor
        );
    }

    //draw tick width indicator at bottom
    let xTickWidthOnScreen = graphToScreenX(xTickStep) - graphToScreenX(0);
    //y axis is reversed relative to canvas axis so we flip it
    let yTickWidthOnScreen = -graphToScreenY(yTickStep) + graphToScreenY(0);
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
}

function render(time) {
    let x, y;
    ctx.clearRect(0, 0, ctx.x, ctx.y);
    renderDecoration();

    renderGrid();
    renderSolution();

    frame++;
    //if(!touched || continuous) {
        //window.requestAnimationFrame(render);
    //}
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
}

function updateScroll(e) {
    let width = +$('width-value').value;
    let height = +$('height-value').value;

    let scale;
    if(e.type == 'wheel') {
        scale = e.deltaY > 0 ? 1.1 : 0.9;
    } else {
        //touch
    }

    $('width-value').value  = $('width-range').value  = (width * scale).toPrecision(3);
    $('height-value').value = $('height-range').value = (height * scale).toPrecision(3);
    calibrateGraph();
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

// updates cursor position for when the cursor is moved at any point
function updateCursor(e) {
    if((e.type == 'mousemove') || (e.type == 'wheel')) {
        cursor.x = e.offsetX * pixelScale / ctx.x
            * graph.x.range + graph.x.min;
        cursor.y = (ctx.y - e.offsetY * pixelScale) / ctx.y
            * graph.y.range + graph.y.min;
    } else if(e.type == 'touchmove') {
        //touch event
        cursor.x = (
            graph.x.range
            * pixelScale
            * (e.touches[0].clientX - e.srcElement.offsetLeft)
            / ctx.x
            + graph.x.min
        );
        cursor.y = (
            graph.y.range
            * (ctx.y
            - (e.touches[0].clientY - e.srcElement.offsetTop)
            * pixelScale)
            / ctx.y
            + graph.y.min
        );
    }
}

// moves the graph around when the cursor is moved *while* clicking /
// touching the canvas
function updateCursorMovement(e) {
    let cx = +$('center-x-value').value;
    let cy = +$('center-y-value').value;
    let dx, dy;

    if((e.type == 'mousemove') || (e.type == 'wheel')) {
        //deltas are negative, but y axis is flipped, so we only
        //flip the x axis
        dx = -graph.x.range * e.movementX / ctx.x;
        dy =  graph.y.range * e.movementY / ctx.y;
    } else if(e.type == 'touchmove') {
        if(e.touches.length < lastTouch.count) {
            return;
        }
        //touch
        //console.log(e.touches[0].pageX + " " + e.touches[0].pageY);
        dx = -graph.x.range * (e.touches[0].pageX - lastTouch.x)
            * pixelScale / ctx.x;
        dy = graph.y.range * (e.touches[0].pageY - lastTouch.y)
            * pixelScale / ctx.y;
        lastTouch.x = e.touches[0].pageX;
        lastTouch.y = e.touches[0].pageY;
        if(e.touches.length > 1) {
            // zooming in/out
            let currentDist = distsqr(
                e.touches[0].pageX, e.touches[0].pageY,
                e.touches[1].pageX, e.touches[1].pageY
            );
            let scale = lastTouch.dist / currentDist;
            lastTouch.dist = currentDist;
            let width = +$('width-value').value;
            let height = +$('height-value').value;
            $('width-value').value  = $('width-range').value  = (width * scale).toPrecision(3);
            $('height-value').value = $('height-range').value = (height * scale).toPrecision(3);
            calibrateGraph();
        }
    }

    $('center-x-value').value = $('center-x-range').value = cx + dx;
    $('center-y-value').value = $('center-y-range').value = cy + dy;
    calibrateGraph();
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
    // 2log10(5y) ⇒ 2 * log10(5 * y)
    formula = formula.replace(/(\d+)(\w+)/gi, '$1 * $2');
    formula = formula.replace(/·/g, '*');
    formula = formula.replace(/\bln\b/gi, 'Math.log');
    formula = formula.replace(/\bt\b/gi, '(performance.now() / 1000)');
    // (x - 1)(x + 3) ⇒ (x - 1) * (x + 3)
    formula = formula.replace(/\)\(/g, ')*(');

    let descriptors = Object.getOwnPropertyDescriptors(Math);
    for(let val in descriptors) {
        let v = descriptors[val].value;
        if(typeof(v) === 'function') {
            formula = formula.replace(
                new RegExp('\\b' + v.name.toLowerCase()
                + '\\b', 'gi'),
                'Math.' + v.name
            );
            if(v.length == 1) {
                // 1 arg means we can replace stuff like
                // sinx and sin y with Math.sin(x) etc.
                formula = formula.replace(
                    new RegExp('\\b' + v.name.toLowerCase()
                    + '\\s*([xy])\\b', 'gi'),
                    'Math.' + v.name + '($1)'
                );
            }
        } else if(typeof(v) === 'number') {
            // constant like e or π
            formula = formula.replace(
                new RegExp('\\b' + val + '\\b', 'gi'),
                'Math.' + val
            );
        }
    }

    // word chars surrounded by space = multiplication
    // like tanx siny
    formula = formula.replace(/(\w|\))\s+(\w|\()/g, '$1 * $2');
}

function setEqFromURL() {
    // strip leading `#`, decode
    // short delay so the url can update before we grab it
    // default to y + sin(x) in case we have a null-ish false-ish value
    window.setTimeout(() => {
        $('formula-input').value = window.decodeURIComponent(
            document.location.hash.substr(1)
        ) || "y + sin(x)";
        calibrateFormula();
        window.requestAnimationFrame(render);
    }, 20);
}

function reset() {
    calibrateGraph();
    calibrateFormula();
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("For some reason, this page runs very slowly with the dev console open. If you're experiencing a slow framerate, try closing the dev tools / element inspector.")

    //initialize cvs, ctx, etc
    let frameWidth, frameHeight;
    pixelScale = window.devicePixelRatio;
    let maxWidth = document.body.clientwidth * pixelScale;
    if(maxWidth < 500) {
        frameWidth = maxWidth * pixelScale;
    } else {
        frameWidth  = 500 * pixelScale;
    }
    frameHeight = frameWidth;
    gridSpacing = +$('grid-spacing-value').value;
    cursorTracking = false;
    continuous = false;
    touched = true;
    gotIt = false;
    frame = 0;

    lastTouch = { x: 0, y: 0, dist: 0 };
    cursor = {x: 0, y: 0};

    graph = {
        x: {
            range:  0,
            min:    0,
            max:    0,
            center: 0
        },
        y: {
            range:  0,
            min:    0,
            max:    0,
            center: 0
        }
    };

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


    setEqFromURL();
    reset();

    cvs.onwheel = e => {
        updateScroll(e);
        updateCursor(e);
        if(touched) {
            window.requestAnimationFrame(render);
        }
        return false;
    };

    cvs.onmousemove = e => {
        updateCursor(e);
        if(cursorTracking) {
            updateCursorMovement(e);
        }
        if(touched) {
            window.requestAnimationFrame(render);
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
        updateCursorMovement(e);
        if(touched) {
            window.requestAnimationFrame(render);
        }
        return false;
    };

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
    };

    cvs.ontouchend = e => {
        cursorTracking = false;
    };

    $('grid-spacing-range').oninput = $('grid-spacing-range').onchange = e => {
        $('grid-spacing-value').value = e.target.value;
        gridSpacing = e.target.value;
        if(touched) {
            window.requestAnimationFrame(render);
        }
    }

    $('grid-spacing-value').oninput = $('grid-spacing-value').onchange = e => {
        $('grid-spacing-range').value = e.target.value;
        gridSpacing = e.target.value;
        if(touched) {
            window.requestAnimationFrame(render);
        }
    }

    $('formula-input').oninput = $('formula-input').onchange = e => {
        window.location.hash = "#" + window.encodeURIComponent(
            $('formula-input').value
        );
        calibrateFormula();
        if(touched) {
            window.requestAnimationFrame(render);
        }
    };

    $('got-it').onclick = e => {
        $('formula-note').remove();
        gotIt = true;
    };

    document.querySelectorAll('#formula-examples a').forEach(el => {
        el.addEventListener('click', () => setEqFromURL(), true)
    })

    window.requestAnimationFrame(render);
})
