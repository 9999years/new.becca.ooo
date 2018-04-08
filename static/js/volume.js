//jquery lite™
//sorry
let $ = id => document.getElementById(id)

//globals
let vid = $('video')
let flipped = false
let partitions = 300
var formula,
	bottomLimit,
	topLimit,
	player
	ready = false

function getYValue(x) {
	//x in graph to y in graph
	try {
		return eval(formula)
	} catch(e) {
		return NaN
	}
}

function approximateIntegral() {
	let intStep = (topLimit - bottomLimit) / partitions
	let getyi = (i) => {return getYValue(i);}
	let getyi2 = (i) => {return getYValue(i + intStep);}
	let area = 0
	let yi, yi2, yprev
	yprev = yi = getyi()
	for(let i = bottomLimit; i < topLimit - 0.00001; i += intStep) {
		yi  = getyi(i)
		yi2 = getyi2(i)
		if(isNaN(yi) || isNaN(yi2) || !isFinite(yi) || !isFinite(yi2)) {
			//don't NaN-corrupt my area
			continue
		}
		area += (yi + yi2) / 2 * intStep
		yprev = yi
	}
	if(flipped) {
		area *= -1
	}
	return area
}

function calibrateIntegral() {
	bottomLimit = +$('bottom-limit-value').value
	topLimit = +$('top-limit-value').value
	if(bottomLimit > topLimit) {
		flipped = true
		var tmp
		tmp = bottomLimit
		bottomLimit = topLimit
		topLimit = tmp
	} else {
		flipped = false
	}
}

function calibrateFormula() {
	formula = $('formula-input').value
	var descriptors = Object.getOwnPropertyDescriptors(Math)
	formula = formula.replace(/(\d+)\s*([a-zA-Z]+)/gi, '$1 * $2')
	formula = formula.replace(/\bln\b/gi, 'log')
	formula = formula.replace(/\bln\s*x\b/gi, 'log(x)')
	Object.getOwnPropertyNames(Math).forEach(val => {
		formula = formula.replace(new RegExp('\\b'
			+ val.toLowerCase() + '\\s*x\\b', 'gi'),
			val + '(x)')
		formula = formula.replace(new RegExp('\\b'
			+ val.toLowerCase() + '\\b', 'gi'), 'Math.' + val)
	})
	formula = formula.replace(/\^/gi, '**')
	formula = formula.replace(/\)\s*\(/gi, ')*(')
	formula = formula.replace(/\)\s*(\w+)/gi, ')*$1')
	formula = formula.replace(/(\w+)\s+(\w+)/gi, '$1 * $2')
}

function updateOutput() {
	let vol = approximateIntegral().toPrecision(4),
		ret = $('integration-result')
	ret.innerHTML = vol + '%'
	if(vol > 100) {
		vol = 100
		ret.classList = 'red'
	} else if(vol < 0) {
		vol = 0
		ret.classList = 'red'
	} else {
		ret.classList = ''
	}
	if(player != null) {
		player.setVolume(vol / 100)
	}
}

function onYouTubeIframeAPIReady(v) {
	ready = true

	if(v === undefined) {
		// ...yeah
		v = "dQw4w9WgXcQ"
	}

	player = new YT.Player('player', {
		videoId: v,
		events: {
			'onReady': e => e.target.playVideo(),
			'onStateChange': e => console.log(e)
		}
	})
}

(() => {
	let tag = document.createElement('script')
	tag.src = "https://www.youtube.com/iframe_api"
	let firstScriptTag = document.getElementsByTagName('script')[0]
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

	calibrateIntegral()
	calibrateFormula()
	updateOutput()

	$('bottom-limit-value').oninput
		= $('bottom-limit-value').onchange
		= e => {
		calibrateIntegral()
		updateOutput()
	}

	$('top-limit-value').oninput
		= $('top-limit-value').onchange
		= e => {
		calibrateIntegral()
		updateOutput()
	}

	$('formula-input').oninput
		= $('formula-input').onchange
		= e => {
		calibrateFormula()
		updateOutput()
	}

	$('yt-input').oninput
		= $('yt-input').onchange
		= e => {
		if(!ready) { return }
		let url = new URL($('yt-input').value)
		if(url.host.endsWith("youtu.be")) {
			onYouTubeIframeAPIReady(url.pathname.replace(/^\/+/g, ''))
		} else if(url.host.endsWith("youtube.com")) {
			onYouTubeIframeAPIReady(url.searchParams.get('v'))
		}
	}
})()
