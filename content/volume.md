<!DOCTYPE html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>volume by integration</title>
<link rel="icon" href="/icon-32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/icon-196.png" sizes="any" type="image/png">
<link rel="stylesheet" href="main.css">
<style>
.red {
	color: #d00;
}

#container {
	margin: 50px auto;
	max-width: 600px;
}

#formula-input {
	width: 60%;
	max-width: 200px;
	margin-right: 0.5em;
}

#volume-input {
	margin-bottom: 3em;
}

#int {
	position: relative;
	font-size: 32px;
}

#bottom-limit-value, #top-limit-value {
	position: absolute;
	left: 0;
	width: 4em;
}

#int > #bottom-limit-value {
	top: 3em;
}

#int > #top-limit-value {
	top: -1.3em;
}

@media (max-width: 600px) {
	#container {
		margin: 20px;
	}

	#formula-input {
		width: 30%;
	}
}

</style>
<div id="container">
	<h1>Volume Selection</h1>
	<div id="volume-input">
	Volume = <span id="int">∫
	<input type="number" id="bottom-limit-value" value="0">
	<input type="number" id="top-limit-value" value="10">
	</span><input type="text" id="formula-input" value="ln(x^2)/2"></input>dx
	= <span id="integration-result">100.0%</span>
	</div>
	<p>Song: <a href="https://soundcloud.com/apieceofonion/apieceofonion-edy-internal">Internal by ApieceofOnion and EDY</a>
	<audio id="song" src="internal_apieceofonion.mp3">
</div>
<script>
//jquery lite™
//sorry
let $ = id => document.getElementById(id);

//globals
let formula,
	song,
	flipped = false,
	partitions = 800,
	bottomLimit,
	topLimit;

function getYValue(x) {
	//x in graph to y in graph
	try {
		return eval(formula);
	} catch(e) {
		return NaN;
	}
}

function approximateIntegral() {
	let intStep = (topLimit - bottomLimit) / partitions;
	let getyi = (i) => {return getYValue(i);}
	let getyi2 = (i) => {return getYValue(i + intStep);}
	let area = 0;
	let yi, yi2, yprev;
	yprev = yi = getyi();
	for(let i = bottomLimit; i < topLimit - 0.00001; i += intStep) {
		yi  = getyi(i);
		yi2 = getyi2(i);
		if(isNaN(yi) || isNaN(yi2) || !isFinite(yi) || !isFinite(yi2)) {
			//don't NaN-corrupt my area
			continue;
		}
		area += (yi + yi2) / 2 * intStep;
		yprev = yi;
	}
	if(flipped) {
		area *= -1;
	}
	return area;
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
}

function calibrateFormula() {
	formula = $('formula-input').value;
	var descriptors = Object.getOwnPropertyDescriptors(Math);
	formula = formula.replace(/(\d+)\s*([a-zA-Z]+)/gi, '$1 * $2');
	formula = formula.replace(/\bln\b/gi, 'log');
	formula = formula.replace(/\bln\s*x\b/gi, 'log(x)');
	Object.getOwnPropertyNames(Math).forEach(val => {
		formula = formula.replace(new RegExp('\\b'
			+ val.toLowerCase() + '\\s*x\\b', 'gi'),
			val + '(x)');
		formula = formula.replace(new RegExp('\\b'
			+ val.toLowerCase() + '\\b', 'gi'), 'Math.' + val);
	});
	formula = formula.replace(/\^/gi, '**');
	formula = formula.replace(/\)\s*\(/gi, ')*(');
	formula = formula.replace(/\)\s*(\w+)/gi, ')*$1');
	formula = formula.replace(/(\w+)\s+(\w+)/gi, '$1 * $2');
}

function updateOutput() {
	let vol = approximateIntegral().toPrecision(4),
		ret = $('integration-result');
	ret.innerHTML = vol + '%';
	if(vol > 100) {
		vol = 100;
		ret.classList = 'red';
	} else if(vol < 0) {
		vol = 0;
		ret.classList = 'red';
	} else {
		ret.classList = '';
	}
	song.volume = vol / 100;
}

(() => {
	song = $('song');
	calibrateIntegral();
	calibrateFormula();
	updateOutput();
	song.play();

	$('bottom-limit-value').oninput
		= $('bottom-limit-value').onchange
		= e => {
		calibrateIntegral();
		updateOutput();
	};

	$('top-limit-value').oninput
		= $('top-limit-value').onchange
		= e => {
		calibrateIntegral();
		updateOutput();
	};

	$('formula-input').oninput
		= $('formula-input').onchange
		= e => {
		calibrateFormula();
		updateOutput();
	};
})();
</script>
