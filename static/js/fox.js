var stepTimer;
var secondsTimer;
var seconds = 0;
var time = {seconds:0,minutes:0,hours:0};
var numAnimals = 3;
var steps = 0;
var deaths = 0;
var animalCount = 0;
var worldHeight = 40;
var worldWidth = 40;
var world = [];
var worldFacts = [];
var animals = [];
var data = [];
var colors = [];
var growAmount = .2; // 1 seems stable
var outputWidth = 600;
var outputHeight = 600;
var runningMax = 100;
var FPS = 60;
var seed = 3;

function minMax(a, b) {
	return {
		min: a,
		max: b
	};
}

var animalSettings = {
	hp:               minMax(0, 100),
	maxHP:            minMax(50, 200),
	lifespan:         minMax(0, 200),
	speed:            minMax(1, 3),
	reproductionRate: minMax(1, 100),
	defense:          minMax(0, 20),
	digestionRate:    minMax(0, 2),
	camoflage:        minMax(0, 10),
	eatAmount:        minMax(20, 100),
	attack:           minMax(0, 100)
};

let $ = id => document.getElementById(id)

function makeAnimal(x, y, hp, maxHP, lifespan, speed, reproductionRate, defense, digestionRate, vore, camoflage, eatAmount, damage, color, type) {
	animalCount++;
	x = x ? x : 0;
	y = y ? y : 0;
	hp = hp ? hp : 10;
	maxHP = maxHP ? maxHP : 20;
	lifespan = lifespan ? lifespan : 100;
	lifespan = lifespan < 1 ? 1 : lifespan;
	speed = speed ? speed : 1;
	speed = speed < 1 ? 1 : speed;
	reproductionRate = reproductionRate ? reproductionRate : 20;
	reproductionRate = reproductionRate < 1 ? 1 : reproductionRate;
	defense = defense ? defense : 0;
	defense = defense < 0 ? defense = 0 : defense;
	digestionRate = digestionRate ? digestionRate : 1;
	digestionRate = digestionRate <= 0 ? 1 : digestionRate;
	vore = vore ? vore : "herb";
	//vore = vore != "herb" && vore != "carne" && vore != "omni" ? "herb" : vore;
	camoflage = camoflage ? camoflage : 0;
	eatAmount = eatAmount ? eatAmount : 0;
	eatAmount = eatAmount <= 0 ? 1 : eatAmount;
	damage = damage ? damage : 0;
	damage = damage < 0 ? 0 : damage;
	color = color ? color : 0;
	type = type ? type : -1;
	return {
		x: x,
		y: y,
		dx: 0,
		dy: 0,
		hp: hp,
		maxHP: maxHP, //20,
		age: 0,
		lifespan: lifespan,
		speed: speed, //1,
		reproductionRate: reproductionRate, //10,
		sinceReproduced: 0,
		defense: defense, //1,
		digestionRate: digestionRate,
		vore: vore, //"herb",
		camoflage: camoflage, //0,
		eatAmount: eatAmount, //25,
		damage: damage, //0,
		color: color,
		type: type,
		target: {},
		behave: behave,
		eat: eat,
		move: move,
		die: die,
		reproduce: reproduce,
		attack: attack
	};
}

let hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {
	// null and undefined are "empty"
	if (obj == null) return true;
	// Assume if it has a length property with a non-zero value
	// that that property is correct.
	if (obj.length > 0) return false;
	if (obj.length === 0) return true;
	// Otherwise, does it have any properties of its own?
	// Note that this doesn't handle
	// toString and valueOf enumeration bugs in IE < 9
	for (var key in obj) {
		if (hasOwnProperty.call(obj, key)) return false;
	}
	return true;
}

function randomBase() {
	var x = Math.sin(seed++) * 10000;
	return x - Math.floor(x);
}

// returns integer, inclusive
function random(min, max) {
	return Math.floor((randomBase() * (max - min + 1)) + min);
}

function randomFloat(min, max) {
	return (randomBase() * (max - min + 1)) + min;
}

// random sign (i.e. 1 or -1)
function randompm() {
	return random(0, 1) ? 1 : -1;
}

function atPoint(x, y, exclude, vore) {
	var result = [];
	for (var i = 0; i < animals.length; i++) {
		if (animals[i].x == x && animals[i].y == y && animals[i] != exclude && animals[i].vore != vore) {
			result.push(animals[i]);
		}
	}
	return result;
}

function scale(num, minIn, maxIn, minOut, maxOut) {
	return ((num - minIn) / (maxIn - minIn)) * (maxOut - minOut) + minOut;
}

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function count(type) {
	var result = 0;
	for (var i = 0; i < animals.length; i++) {
		if (animals[i].type == type) {
			result++;
		}
	}
	return result;
}

function statsType(type) {
	for (var i = 0; i < animals.length; i++) {
		if (animals[i].type == type) {
			return animals[i];
		}
	}
}

function die() {
	deaths++;
	if(count(this.type) == 1) {
		//EXTINCT!
		data[this.type] = "extinct";
		$("extinctionsList").innerHTML += ("species <span style=\"color:hsl(" + this.color + ",100%,50%)\">" + this.type + this.vore.substr(0,1) + "</span> at " + pad(Math.floor(time.hours),2) + ":" + pad(Math.floor(time.minutes),2) + ":" + pad(time.seconds,2) + "<br>");
	}
	animals.splice(animals.indexOf(this), 1);
}

function reproduce() {
	worldFacts[this.x][this.y].push({
		text: "child",
		color: "rgba(180,180,255,0.8)"
	});
	this.sinceReproduced = 0;
	animals.push(makeAnimal(this.x, this.y, this.hp * 0.5, this.maxHP, this.lifespan, this.speed, this.reproductionRate, this.defense, this.digestionRate, this.vore, this.camoflage, this.eatAmount, this.damage, this.color, this.type));
	this.hp -= this.hp * 0.5; //lose half health
}

function attack(target) { //return hp gain
	target.hp -= this.damage / target.defense;
	//console.log("target: " + target.x + "," + target.y);
	//console.log("this: " + this.x + "," + this.y);
	if (target.hp < 0) {
		target.die();
		worldFacts[this.x][this.y].push({
			text: "kill",
			color: "rgba(255,0,0,1)"
		});
		return true; //success, kill
	} else {
		worldFacts[this.x][this.y].push({
			text: "attack",
			color: "rgba(255,0,255,0.5)"
		});
		return false;
	}
}

function eat() {
	if (this.vore == "herb") { //todo add support for omniovres
		if (world[this.x][this.y] >= this.eatAmount) { //has enough food
			world[this.x][this.y] -= this.eatAmount; //take out the food
			if (world[this.x][this.y] < 0) {
				world[this.x][this.y] = 0;
			}
			this.hp += 0.1 * this.maxHP * this.digestionRate; //gain hp proporitonal to digestionRate
			return;
		} else if (world[this.x][this.y] > 0) {
			this.hp += 0.05 * this.maxHP * this.digestionRate * (world[this.x][this.y] / this.eatAmount); //gain less% health
			world[this.x][this.y] = 0;
		}
	} else if (this.vore == "carne") {
		if (!isEmpty(this.target)) {
			if (this.attack(this.target)) {
				this.hp += this.digestionRate * 60;
			} else {
				this.hp += this.digestionRate * 30;
			}
		}
	}
}

function move() { //TODO for carnivores recursively look farther for prey (vision stat?)
	dx = 0;
	dy = 0;
	if (this.vore == "herb") {
		highestValue = world[this.x][this.y];
		lowestValue = world[this.x][this.y];
		cumulative = 0;
		square = 0; //store current square value for easy access
		for (var k = -this.speed; k <= this.speed; k++) {
			for (var l = -this.speed; l <= this.speed; l++) {
				//try {
				square = world[(this.x + k + worldWidth) % worldWidth][(this.y + l + worldHeight) % worldHeight];
				//} catch(error) {
				//console.log(k + "," + l + ":" + this.x + "," + this.y + ":" + error);
				//}
				cumulative += square;
				if (square > highestValue) { // || ((square > highestValue - 5) && random(0, 3) > 0)) {
					dx = k;
					dy = l;
					highestValue = square;
				}
				if (square < lowestValue) {
					lowestValue = square;
				}
				}
			}
			//console.log(highestValue-lowestValue);
			if (highestValue < this.eatAmount*0.8 || highestValue - lowestValue < 26) {
				dx = random(-this.speed, this.speed);
				dy = random(-this.speed, this.speed);
			}
	} else if (this.vore == "carne") {
		var candidates;
		var best; // = animals[candidates[0]];
		for (var k = -this.speed; k <= this.speed; k++) { //look
			for (var l = -this.speed; l <= this.speed; l++) {
				candidates = atPoint(k, l, this, "carne"); //get possible food
				if (candidates.length == 0) { //if none move again, break
					continue;
				} else if (isEmpty(best)) {
					best = candidates[0]; //set best to first candidate if it hasnt been set yet
				}
				for (var i = 0; i < candidates.length; i++) {
					if (candidates[i].hp / candidates[i].defense < best.hp / best.defense) {
						best = candidates[i]; //find index in animals[] of most vulnerable animal
					}
				}
				if (!isEmpty(best)) {
					this.target = best;
					this.dx = k;
					this.dy = l;
				}
			}
			if (isEmpty(best)) {
				this.target = {};
				dx = random(-this.speed, this.speed);
				dy = random(-this.speed, this.speed);
			}
		}
	}
	this.x = (this.x + dx + worldWidth) % worldWidth;
	this.y = (this.y + dy + worldHeight) % worldHeight;
	this.dx = dx;
	this.dy = dy;
}

function behave() {
	if (this.hp > 0) {
		this.age++; //TODO: add wrinkles
		this.sinceReproduced++;
		//if(animals.indexOf(this) == 0) {console.log(this.hp) ; }
		this.hp -= this.digestionRate; //lose hp over time
		//this.hp -= Math.floor(this.age / 100)*lifespan; //lose hp by age (animals alive for ~15 secs lose 5hp/sec at 30fps)
		if (this.age > this.lifespan + random(-10, 10)) {
			//this.hp -=	this.maxHP * 0.1 * this.lifespan / this.age;
		}
		this.move(); //self explanatory
		this.eat();
		//if(this.vore == "carne") console.log("hp: " + this.hp + ", max:" + this.maxHP);
		if (this.hp > this.maxHP / 2 //if healthy
				&& this.sinceReproduced > this.reproductionRate || random(0,100) == 0) { //and a random chance
			if (this.vore != "carne" || steps > 98) this.reproduce(); //reproduce
		}
		if (this.vore == "carne" && steps < 100) {
			this.hp = this.maxHP;
		}
		if (this.hp > this.maxHP) { //cap hp
			this.hp = this.maxHP;
		}
		if (this.hp <= 0) {
			worldFacts[this.x][this.y].push({
				text: "starved",
				color: "rgba(255,200,200,0.7)"
			});
			this.die();
		}
		//if (this.age-80-this.hp>random(0,100)) {
		//	this.die();
		//}
	} else {
		//dead of age
		worldFacts[this.x][this.y].push({
			text: "starved",
			color: "rgba(255,200,200,0.7)"
		});
		this.die();
	}
}

function behaveAnimals() {
	for (var i = 0; i < animals.length; i++) {
		animals[i].behave();
	}
}
/*function colorGrass(i, j) {
//if(world[i][j] > eatAmount)
//{
return 'rgb(0,' + (Math.floor(world[i][j] * 2.55)) + ',0)';
//}
//else
//{
//return 'rgb(' + (Math.floor((eatAmount-world[i][j])*(255/eatAmount))) + ',' + (Math.floor(world[i][j]*(255/eatAmount))) + ',0)';
//}
}*/

function output() {
	//grass
	var cellHeight = outputHeight / worldHeight;
	var cellWidth = outputWidth / worldWidth;
	grassCount = 0;
	for (var i = 0; i < world.length; i++) {
	for (var j = 0; j < world[i].length; j++) {
	grassCount += world[i][j];
	if (world[i][j] < 5) {
		worldContext.fillStyle = 'rgb(0,' + (Math.floor(world[i][j] * 2.55)) + ',' + (Math.floor((5 - world[i][j]) * 51)) + ')';
	} else {
		worldContext.fillStyle = 'rgb(0,' + (Math.floor(world[i][j] * 2.55)) + ',0)';
	}
	worldContext.fillRect(cellHeight * i, cellWidth * j, cellWidth, cellHeight);
	//table += '<div class="cell" style="background-color:' + colorGrass(world,i,j) + ';">' + animalsToHTML(atPoint(i,j)) + '<\/div>';
	}
	}
	//draw stats circles
	for (var i = 0; i < worldFacts.length; i++) {
	for (var j = 0; j < worldFacts[i].length; j++) {
	for (var k = 0; k < worldFacts[i][j].length; k++) {
		//worldFacts[this.x][this.y].push({text:"baby",color:"#aaf"});
		worldContext.beginPath();
		worldContext.fillStyle = worldFacts[i][j][k].color;
		worldContext.arc(i*cellWidth+cellWidth/2,j*cellHeight+cellHeight/2,cellWidth/1.5,0,2*Math.PI,false);
		worldContext.fill();
	}
	}
	}

	//animals
	for (var i = 0; i < animals.length; i++) {
		//if(animals[i].vore == "carne") console.log(animals[i]);
		worldContext.fillStyle = "hsl(" + animals[i].color + ",100%,70%)";
		worldContext.strokeStyle = "hsl(" + animals[i].color + ",100%,70%)";
		worldContext.strokeWidth = 2;
		worldContext.beginPath();
		worldContext.moveTo(animals[i].x * cellWidth + cellWidth / 2, animals[i].y * cellHeight + cellHeight / 2);
		worldContext.lineTo((animals[i].x - animals[i].dx) * cellWidth + cellWidth / 2, (animals[i].y - animals[i].dy) * cellHeight + cellHeight / 2);
		worldContext.stroke();
		worldContext.fillText(animals[i].type + animals[i].vore.substr(0,1), cellWidth * animals[i].x + cellWidth/2, cellHeight * animals[i].y + cellHeight);

		worldContext.beginPath();
		try {
			worldContext.arc(cellWidth * animals[i].x + cellWidth/2, cellHeight * animals[i].y + cellHeight/2,(cellWidth/2)*(animals[i].hp / animals[i].maxHP),0,2*Math.PI,false);
		} catch(err) {
			console.log(i);
		}
			worldContext.fill();
	}
	//draw stats
	for (var i = 0; i < worldFacts.length; i++) {
	for (var j = 0; j < worldFacts[i].length; j++) {
	for (var k = 0; k < worldFacts[i][j].length; k++) {
		//worldFacts[this.x][this.y].push({text:"baby",color:"#aaf"});
		worldContext.fillStyle = worldFacts[i][j][k].color;
		worldContext.fillText(worldFacts[i][j][k].text, i * cellWidth, j * cellHeight + k * 20)
	}
	}
	}
	//population graph + stats
	graphContext.clearRect(0, 0, graphContext.canvas.width, graphContext.canvas.height); //clear all
	statsContext.clearRect(0, 0, statsContext.canvas.width, statsContext.canvas.height); //clear all
	var l = 0;
	var statsHeight = 10;
	for (var k = 0; k < data.length; k++) { //for each animal.type
		//loop through data
		if(data[k] == "extinct") {
			continue;
		}
		if (data[k].length > graphContext.canvas.width) {
			data[k].shift(); //delete data point if too many
		}
		//REMEMBER: COLORS[0] AND DATA[0] IS FOR GRASS!
		graphContext.strokeStyle = "hsl(" + colors[k].color + ",80%,50%)"; //set color
		graphContext.fillStyle = "hsl(" + colors[k].color + ",80%,50%)";
		if (k == 0) {
			data[k].push(Math.floor(grassCount / 100)); //total grass
		} else {
			data[k].push(count(k));
		}
		graphContext.textAlign = "start";
		runningMax = 0;
		runningMin = 999999999;
		for (var i = 0; i < data[k].length; i++) {
			if (data[k][i] > runningMax) {
				runningMax = data[k][i];
			} else if (data[k][i] < runningMin) {
				runningMin = data[k][i];
			}
		}
		runningMax += 10;
		runningMin -= 10;
		if (runningMin < 0) runningMin = 0;
		graphContext.fillText(runningMax, 5 + 40 * l, 15);
		graphContext.fillText(runningMin, 5 + 40 * l, graphContext.canvas.height - 5);
		currentCountHeight = graphContext.canvas.height - (data[k][data[k].length - 1] - runningMin) / (runningMax - runningMin) * graphContext.canvas.height;
		if (currentCountHeight > graphContext.canvas.height - 10) {
			currentCountHeight = graphContext.canvas.height - 10;
		} else if (currentCountHeight < 10) {
			currentCountHeight = 10;
		}
		graphContext.textAlign = "end";
		speciesString = k == 0 ? "grass" : k + colors[k].vore.substr(0,1);
		graphContext.fillText(data[k][data[k].length - 1] + " (" + speciesString + ")", graphContext.canvas.width - 5, currentCountHeight);
		graphContext.moveTo(0, graphContext.canvas.height); //move to bottom left
		graphContext.beginPath();
		for (var i = 0; i < data[k].length; i++) {
			graphContext.lineTo(i, graphContext.canvas.height - (data[k][i] - runningMin) / (runningMax - runningMin) * graphContext.canvas.height);
		}
		graphContext.stroke();

		//bar graphs
		if(speciesString == "grass") { //skip grass
			l++;
			continue;
		}
		statsStartHeight = statsHeight;
		statsContext.fillStyle = "hsl(" + colors[k].color + ",80%,50%)";
		statsContext.fillText(speciesString + ":",5,statsHeight+8);
		stats = statsType(k);
		var stat;
		var statText;
		for(var j = 0; j <= 7; j++) {
			switch(j) {
			case 0:
				stat = {stat:stats.maxHP,min:50,max:200,text:"HP"}; //50 to 200
				break;

			case 1:
				stat = {stat:stats.lifespan,min:0,max:200,text:"LIFE"}; //0 to 200
				break;

			case 2:
				stat = {stat:stats.speed,min:1,max:3,text:"SPD"}; //1 to 3
				break;

			case 3:
				stat = {stat:stats.reproductionRate,min:1,max:100,text:"BRTH"};
				break;

			case 4:
				stat = {stat:stats.defense,min:0,max:20,text:"DFNS"}; //0 to 20
				break;

			case 5:
				stat = {stat:stats.digestionRate,min:0,max:2,text:"DGST"}; //0 to 2
				break;

			case 6:
				stat = {stat:stats.eatAmount,min:20,max:100,text:"HNGR"}; //20 to 100
				break;

			case 7:
				stat = {stat:stats.damage,min:0,max:100,text:"ATK"}; //0 to 100
				break;
			}
		if(colors[k].vore == "carne") { //if carnivore (draw damage)
			if(j == 6) continue;
		} else { //if herb (draw eatAmt)
			if(j == 7) continue;
		}
		statsContext.fillRect(35,statsHeight,scale(stat.stat,stat.min,stat.max,0,200),9);
		statsContext.fillText(stat.text + ":" + Math.round(stat.stat*100)/100,scale(stat.stat,stat.min,stat.max,0,200)+38,statsHeight+9);
		statsHeight += 15;
		}
		statsHeight += 15;
		l++;
	}
}

function grow(strength) {
	for (var i = 0; i < world.length; i++) {
	for (var j = 0; j < world[i].length; j++) {
		var temp = 0;
		for (var k = -1; k < 2; k++) {
		for (var l = -1; l < 2; l++) {
			temp += world[(i + k + world.length) % world.length][(j + l + world[i].length) % world[i].length];
		}
		}
		temp -= world[i][j];
		if (temp > 0) {
			world[i][j] += strength;
		}
		if (world[i][j] > 0) {
			world[i][j] += strength;
		}
		//if(world[i][j] > 0 && random(0,1) == 1) world[i][j] = world[i][j] + random(-1,2);
		if (world[i][j] > 100) {
			world[i][j] = 100;
		};
		if (world[i][j] < 0) {
			world[i][j] = 0;
		};
		//world[i][j] = Math.floor(world[i][j]);
	}
	}
}

function step() {
	steps++;
	behaveAnimals();
	grow(growAmount);
	output();
	if (steps % 3 == 0) {
		for (var i = 0; i < worldFacts.length; i++) {
			for (var j = 0; j < worldFacts[i].length; j++) {
				worldFacts[i][j] = [];
			}
		}
	}
	if (isEmpty(animals)) { //HES DEAD JIM!!!
		//initalize();
		//return;
		//console.log(animals);
		clearTimeout(stepTimer);
		clearTimeout(secondsTimer);
		graphContext.font = "bold 48pt " + graphContext.fontFamily;
		graphContext.fillStyle = "#f00";
		graphContext.fillText("DEAD", graphContext.canvas.width / 2, graphContext.canvas.height / 2);
		window.setTimeout(initalize,1000)
			return;
	} else if(animals.length > 1000) {
		//TOO MANY
		clearTimeout(stepTimer);
		clearTimeout(secondsTimer);
		graphContext.fillStyle = "#f00";
		graphContext.fillText("OVERPOPULATED", graphContext.canvas.width / 2, graphContext.canvas.height / 2);
		window.setTimeout(initalize,1000)
			return;
	} else {
		stepTimer = setTimeout(step, 1000/FPS);
	}
}

function updateTime() {
	time.seconds = seconds%60;
	time.minutes = (seconds/60)%60;
	time.hours = (seconds/3600)%60;
	$("stepsCountOutput").innerHTML = (pad(Math.floor(time.hours),2) + ":" + pad(Math.floor(time.minutes),2) + ":" + pad(time.seconds,2));
	seconds++;
	secondsTimer = window.setTimeout(updateTime,1000);
}

function initalize() {
	//console.log(seed);
	//if(seed == 1) {
	//	FPS = 6;
	//} else {
	//FPS = 60;
	//}

	graphContext.fontFamily = worldContext.fontFamily = statsContext.fontFamily = '"Segoe UI", -apple-system, "Helvetica", "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", "Noto Sans",  "FreeSans", "Code2001", "Code2000", "DejaVu Sans",  sans-serif';
	worldContext.lineJoin = "round";
	worldContext.lineWidth = 2;
	worldContext.textAlign = "middle";
	worldContext.font = "12px " + worldContext.fontFamily;
	statsContext.font = "bold 12px " + statsContext.fontFamily;
	graphContext.lineJoin = "round";
	graphContext.lineWidth = 2;
	graphContext.font = "bold 12px " + graphContext.fontFamily;
	clearTimeout(stepTimer);
	clearTimeout(secondsTimer);
	steps = 0;
	deaths = 0;
	animalCount = 0;
	$("extinctionsList").innerHTML = "";
	data = [];
	colors = [];
	world = [];
	worldFacts = [];
	seconds = 0;
	for (var i = 0; i < worldWidth; i++) {
		world[i] = [];
		worldFacts[i] = [];
		for (var j = 0; j < worldHeight; j++) {
			worldFacts[i][j] = [];
			world[i][j] = random(0,10);
			//world[i][j] = 0;
			//world[i][j] = random(0,90); //random distribution
			//if(i==10 && j == 10) { world[i][j] = 0; } else { world[i][j] = 0; } //one square center
		}
	}
	animals = [];
	colors[0] = {
		color: 110,
		vore: "grass"
	};
	data[0] = [];
	for (var i = 1; i <= numAnimals; i++) {
		vore = random(0, 1) ? "carne" : "herb";
		colors[i] = {
			color: random(0, 360),
			vore: vore
		};
		data[i] = [];
		animals.push(makeAnimal(
			random(0, worldWidth - 1), //x
			random(0, worldHeight - 1), //y
			random(animalSettings.hp.min, animalSettings.hp.max),
			random(animalSettings.maxHP.min, animalSettings.maxHP.max),
			random(animalSettings.lifespan.min, animalSettings.lifespan.max),
			random(animalSettings.speed.min, animalSettings.speed.max),
			random(animalSettings.reproductionRate.min, animalSettings.reproductionRate.max),
			random(animalSettings.defense.min, animalSettings.defense.max),
			randomFloat(animalSettings.digestionRate.min, animalSettings.digestionRate.max),
			vore,
			random(animalSettings.camoflage.min, animalSettings.camoflage.max),
			random(animalSettings.eatAmount.min, animalSettings.eatAmount.max),
			random(animalSettings.attack.min, animalSettings.attack.max),
			colors[i].color,   //color
			i //type
		));
		//for(var j = 0; j < 10; j++) {
		//}
		//(x, y, hp, maxHP, lifespan, speed, reproductionRate, defense, digestionRate, vore, camoflage, eatAmount, attack,color)
	}
	//output(world);
	updateTime();
	step();
}
