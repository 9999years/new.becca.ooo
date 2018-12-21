var start = true;

function toggleStartStop() {
	if(start) {
		clearTimeout(stepTimer);
		clearTimeout(secondsTimer);
		start = false;
		$("startStop").innerHTML = "start";
	} else {
		step();
		updateTime();
		$("startStop").innerHTML = "stop";
		start = true;
	}
}

$("reset").onclick = e => {
	initalize();
};

$("startStop").onclick = e => {
	toggleStartStop();
};

$("fps").onclick = e => {
	if(FPS == 60) {
		FPS = 6;
	} else {
		FPS = 60;
	}
};

$("grow").onchange = $("grow").oninput = e => {
	$('growRange').value = (e.target.value);
	growAmount = parseFloat(e.target.value);
};

$("growRange").onchange = $("growRange").oninput = e => {
	$('grow').value = e.target.value;
	growAmount = parseFloat(e.target.value);
};

$("animalsNumber").onchange = $("animalsNumber").oninput = e => {
	$('animalsNumberRange').value = (e.target.value);
	numAnimals = parseFloat(e.target.value);
	initalize();
};

$("animalsNumberRange").onchange = $("animalsNumberRange").oninput = e => {
	$('animalsNumber').value = (e.target.value);
	numAnimals = parseFloat(e.target.value);
	initalize();
};

$("worldSize").onchange = $("worldSize").oninput = e => {
	$('worldSizeRange').value = (e.target.value);
	worldWidth = parseFloat(e.target.value);
	worldHeight = worldWidth;
	initalize();
};

$("worldSizeRange").onchange = $("worldSizeRange").oninput = e => {
	$('worldSize').value = (e.target.value);
	worldWidth = parseFloat(e.target.value);
	worldHeight = worldWidth;
	initalize();
};

//min ranges

$("hpMinNumberRange").onchange = $("hpMinNumberRange").oninput = e => {
	$("hpMinNumber").value = e.target.value;
	animalSettings.hp.min = +e.target.value;
	initalize();
};

$("maxHPMinNumberRange").onchange = $("maxHPMinNumberRange").oninput = e => {
	$("maxHPMinNumber").value = e.target.value;
	animalSettings.maxHP.min = +e.target.value;
	initalize();
};

$("lifespanMinNumberRange").onchange = $("lifespanMinNumberRange").oninput = e => {
	$("lifespanMinNumber").value = e.target.value;
	animalSettings.lifespan.min = +e.target.value;
	initalize();
};

$("speedMinNumberRange").onchange = $("speedMinNumberRange").oninput = e => {
	$("speedMinNumber").value = e.target.value;
	animalSettings.speed.min = +e.target.value;
	initalize();
};

$("reproductionRateMinNumberRange").onchange = $("reproductionRateMinNumberRange").oninput = e => {
	$("reproductionRateMinNumber").value = e.target.value;
	animalSettings.reproductionRate.min = +e.target.value;
	initalize();
};

$("defenseMinNumberRange").onchange = $("defenseMinNumberRange").oninput = e => {
	$("defenseMinNumber").value = e.target.value;
	animalSettings.defense.min = +e.target.value;
	initalize();
};

$("digestionRateMinNumberRange").onchange = $("digestionRateMinNumberRange").oninput = e => {
	$("digestionRateMinNumber").value = e.target.value;
	animalSettings.digestionRate.min = +e.target.value;
	initalize();
};

$("camoflageMinNumberRange").onchange = $("camoflageMinNumberRange").oninput = e => {
	$("camoflageMinNumber").value = e.target.value;
	animalSettings.camoflage.min = +e.target.value;
	initalize();
};

$("eatAmountMinNumberRange").onchange = $("eatAmountMinNumberRange").oninput = e => {
	$("eatAmountMinNumber").value = e.target.value;
	animalSettings.eatAmount.min = +e.target.value;
	initalize();
};

$("attackMinNumberRange").onchange = $("attackMinNumberRange").oninput = e => {
	$("attackMinNumber").value = e.target.value;
	animalSettings.attack.min = +e.target.value;
	initalize();
};

//max ranges

$("hpMaxNumberRange").onchange = $("hpMaxNumberRange").oninput = e => {
	$("hpMaxNumber").value = e.target.value;
	animalSettings.hp.max = +e.target.value;
	initalize();
};

$("maxHPMaxNumberRange").onchange = $("maxHPMaxNumberRange").oninput = e => {
	$("maxHPMaxNumber").value = e.target.value;
	animalSettings.maxHP.max = +e.target.value;
	initalize();
};

$("lifespanMaxNumberRange").onchange = $("lifespanMaxNumberRange").oninput = e => {
	$("lifespanMaxNumber").value = e.target.value;
	animalSettings.lifespan.max = +e.target.value;
	initalize();
};

$("speedMaxNumberRange").onchange = $("speedMaxNumberRange").oninput = e => {
	$("speedMaxNumber").value = e.target.value;
	animalSettings.speed.max = +e.target.value;
	initalize();
};

$("reproductionRateMaxNumberRange").onchange = $("reproductionRateMaxNumberRange").oninput = e => {
	$("reproductionRateMaxNumber").value = e.target.value;
	animalSettings.reproductionRate.max = +e.target.value;
	initalize();
};

$("defenseMaxNumberRange").onchange = $("defenseMaxNumberRange").oninput = e => {
	$("defenseMaxNumber").value = e.target.value;
	animalSettings.defense.max = +e.target.value;
	initalize();
};

$("digestionRateMaxNumberRange").onchange = $("digestionRateMaxNumberRange").oninput = e => {
	$("digestionRateMaxNumber").value = e.target.value;
	animalSettings.digestionRate.max = +e.target.value;
	initalize();
};

$("camoflageMaxNumberRange").onchange = $("camoflageMaxNumberRange").oninput = e => {
	$("camoflageMaxNumber").value = e.target.value;
	animalSettings.camoflage.max = +e.target.value;
	initalize();
};

$("eatAmountMaxNumberRange").onchange = $("eatAmountMaxNumberRange").oninput = e => {
	$("eatAmountMaxNumber").value = e.target.value;
	animalSettings.eatAmount.max = +e.target.value;
	initalize();
};

$("attackMaxNumberRange").onchange = $("attackMaxNumberRange").oninput = e => {
	$("attackMaxNumber").value = e.target.value;
	animalSettings.attack.max = +e.target.value;
	initalize();
};

//values

//min values

$("hpMinNumber").onchange = $("hpMinNumber").oninput = e => {
	$("hpMinNumberRange").value = e.target.value;
	animalSettings.hp.min = +e.target.value;
	initalize();
};

$("maxHPMinNumber").onchange = $("maxHPMinNumber").oninput = e => {
	$("maxHPMinNumberRange").value = e.target.value;
	animalSettings.maxHP.min = +e.target.value;
	initalize();
};

$("lifespanMinNumber").onchange = $("lifespanMinNumber").oninput = e => {
	$("lifespanMinNumberRange").value = e.target.value;
	animalSettings.lifespan.min = +e.target.value;
	initalize();
};

$("speedMinNumber").onchange = $("speedMinNumber").oninput = e => {
	$("speedMinNumberRange").value = e.target.value;
	animalSettings.speed.min = +e.target.value;
	initalize();
};

$("reproductionRateMinNumber").onchange = $("reproductionRateMinNumber").oninput = e => {
	$("reproductionRateMinNumberRange").value = e.target.value;
	animalSettings.reproductionRate.min = +e.target.value;
	initalize();
};

$("defenseMinNumber").onchange = $("defenseMinNumber").oninput = e => {
	$("defenseMinNumberRange").value = e.target.value;
	animalSettings.defense.min = +e.target.value;
	initalize();
};

$("digestionRateMinNumber").onchange = $("digestionRateMinNumber").oninput = e => {
	$("digestionRateMinNumberRange").value = e.target.value;
	animalSettings.digestionRate.min = +e.target.value;
	initalize();
};

$("camoflageMinNumber").onchange = $("camoflageMinNumber").oninput = e => {
	$("camoflageMinNumberRange").value = e.target.value;
	animalSettings.camoflage.min = +e.target.value;
	initalize();
};

$("eatAmountMinNumber").onchange = $("eatAmountMinNumber").oninput = e => {
	$("eatAmountMinNumberRange").value = e.target.value;
	animalSettings.eatAmount.min = +e.target.value;
	initalize();
};

$("attackMinNumber").onchange = $("attackMinNumber").oninput = e => {
	$("attackMinNumberRange").value = e.target.value;
	animalSettings.attack.min = +e.target.value;
	initalize();
};

//max values

$("hpMaxNumber").onchange = $("hpMaxNumber").oninput = e => {
	$("hpMaxNumberRange").value = e.target.value;
	animalSettings.hp.max = +e.target.value;
	initalize();
};

$("maxHPMaxNumber").onchange = $("maxHPMaxNumber").oninput = e => {
	$("maxHPMaxNumberRange").value = e.target.value;
	animalSettings.maxHP.max = +e.target.value;
	initalize();
};

$("lifespanMaxNumber").onchange = $("lifespanMaxNumber").oninput = e => {
	$("lifespanMaxNumberRange").value = e.target.value;
	animalSettings.lifespan.max = +e.target.value;
	initalize();
};

$("speedMaxNumber").onchange = $("speedMaxNumber").oninput = e => {
	$("speedMaxNumberRange").value = e.target.value;
	animalSettings.speed.max = +e.target.value;
	initalize();
};

$("reproductionRateMaxNumber").onchange = $("reproductionRateMaxNumber").oninput = e => {
	$("reproductionRateMaxNumberRange").value = e.target.value;
	animalSettings.reproductionRate.max = +e.target.value;
	initalize();
};

$("defenseMaxNumber").onchange = $("defenseMaxNumber").oninput = e => {
	$("defenseMaxNumberRange").value = e.target.value;
	animalSettings.defense.max = +e.target.value;
	initalize();
};

$("digestionRateMaxNumber").onchange = $("digestionRateMaxNumber").oninput = e => {
	$("digestionRateMaxNumberRange").value = e.target.value;
	animalSettings.digestionRate.max = +e.target.value;
	initalize();
};

$("camoflageMaxNumber").onchange = $("camoflageMaxNumber").oninput = e => {
	$("camoflageMaxNumberRange").value = e.target.value;
	animalSettings.camoflage.max = +e.target.value;
	initalize();
};

$("eatAmountMaxNumber").onchange = $("eatAmountMaxNumber").oninput = e => {
	$("eatAmountMaxNumberRange").value = e.target.value;
	animalSettings.eatAmount.max = +e.target.value;
	initalize();
};

$("attackMaxNumber").onchange = $("attackMaxNumber").oninput = e => {
	$("attackMaxNumberRange").value = e.target.value;
	animalSettings.attack.max = +e.target.value;
	initalize();
};

worldCanvas = $("output");
worldContext = worldCanvas.getContext("2d");
statsCanvas = $("statsGraph");
statsContext = statsCanvas.getContext("2d");
graphCanvas = $("populationGraph");
graphContext = graphCanvas.getContext("2d");
initalize();
