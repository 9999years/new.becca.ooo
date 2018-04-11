<!doctype html>

<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>img glitcher //// 9999 years</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<style>
	@font-face {
    font-family: 'apercu';
    src: url('//u.9999yea.rs/resources/apercu/apercu_bold_italic-webfont.eot');
    src: url('//u.9999yea.rs/resources/apercu/apercu_bold_italic-webfont.eot?#iefix') format('embedded-opentype'),
         url('//u.9999yea.rs/resources/apercu/apercu_bold_italic-webfont.woff') format('woff'),
         url('//u.9999yea.rs/resources/apercu/apercu_bold_italic-webfont.ttf') format('truetype');
    font-weight: bold;
    font-style: italic;
}

@font-face {
    font-family: 'apercu';
    src: url('//u.9999yea.rs/resources/apercu/apercu_bold-webfont.eot');
    src: url('//u.9999yea.rs/resources/apercu/apercu_bold-webfont.eot?#iefix') format('embedded-opentype'),
         url('//u.9999yea.rs/resources/apercu/apercu_bold-webfont.woff') format('woff'),
         url('//u.9999yea.rs/resources/apercu/apercu_bold-webfont.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'apercu';
    src: url('//u.9999yea.rs/resources/apercu/apercu_italic-webfont.eot');
    src: url('//u.9999yea.rs/resources/apercu/apercu_italic-webfont.eot?#iefix') format('embedded-opentype'),
         url('//u.9999yea.rs/resources/apercu/apercu_italic-webfont.woff') format('woff'),
         url('//u.9999yea.rs/resources/apercu/apercu_italic-webfont.ttf') format('truetype');
    font-weight: normal;
    font-style: italic;
}

@font-face {
    font-family: 'apercu';
    src: url('//u.9999yea.rs/resources/apercu/apercu_regular-webfont.eot');
    src: url('//u.9999yea.rs/resources/apercu/apercu_regular-webfont.eot?#iefix') format('embedded-opentype'),
         url('//u.9999yea.rs/resources/apercu/apercu_regular-webfont.woff') format('woff'),
         url('//u.9999yea.rs/resources/apercu/apercu_regular-webfont.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
*{
max-width:100%;
word-wrap:break-word;
}
img{
max-width:100%;
}
div{
margin:0;
padding:0;
}
body,html{
margin:0;
padding:0;
font-family:'apercu';
font-size:18px;
background-color:#0a0c14;
color:#fff;
}

h3{
font-size:24px;
}

h4{
font-style:italic;
background-color:#cec9ff;
color:#0a0c14;
display:inline;
padding-left:3px;
padding-right:3px;
}
a{
color:#00f;
text-decoration:none;
}
a:hover{
background-color:#cec9ff;
}
::selection
{
background-color:#cec9ff;
}
	#container{
	margin:30px;
	margin-top:20px;
	display:inline-block;
	}

	#title{
	margin-bottom:5px;
	}

	#title, #title a{
	display:inline-block;
	font-size:60px;
	text-decoration:none;
	color:#00f;
	}

	#title a{
	padding-left:10px;
	padding-right:10px;
	padding-bottom:5px;
	}

	#title a:hover, #title:hover{
	background-color:#cec9ff;
	}

	a{
	color:#00f;
	}

	#fileForm{
	position:relative;
	}

	.button a, .button a:hover, .button a:active{
	color:inherit;
	background-color:inherit;
	display:inherit;
	margin:0;
	padding:0;
	}

	.button{
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	height: 25px;
	padding:5px;
	padding-left:10px;
	padding-right:10px;
	background-color:#00f;
	color:#fff;
	display:inline;
	cursor:hand;
	cursor:pointer;
	margin-right:5px;
	}

	.button:hover, .tabButton:hover{
	background-color:#009;
	}

	.button:active, .tabButton:active{
	background-color:#f0f;
	}

	input[type="range"] {
	width:500px;
	max-width:100%;
	position:relative;
	top:6px;
	}

	.leftPad{
	display:inline-block;
	width:100px;
	}

	#fileForm{
	max-width:700px;
	}

	.top20{
	margin-top:20px;
	}

	#file{
	display:none;
	}

	input{
	font-family:'apercu';
	margin:0;
	}

	#glitched{
	display:block;
	background-color:#fff;
	}

	#urlText{
	width:100%;
	max-width:500px;
	padding:5px;
	padding-left:10px;
	background-color:#cec9ff;
	color:#00f;
	font-size:18px;
	border:none;
	}

	#fileGUI{
	background-color:#00f;
	color:#fff;
	font-size:18px;
	border:none;
	padding:5px;
	padding-left:10px;
	padding-right:10px;
	text-decoration:none;
	max-width:495px;
	display:inline-block;
	overflow:hidden;
	}

	input[type="submit"]{
	display:none;
	float:right;
	background-color:#00f;
	color:#fff;
	font-size:18px;
	border:none;
	padding:5px;
	}

	#anger{
	color:#f00;
	position:absolute;
	left:700px;
	top:42px;
	width:200px;
	}

	.buttonRow{
	display:flex;
	}

	.buttonRow:not(:first-child){
	margin-top:5px;
	}

	#drop_zone{
	position:absolute;
	display:none;
	background-color: #cec9ff;
	color:#00f;
	font-size: 48px;
	padding-top:65px;
	z-index:999;
	}
	#drop_zone.drag{
	display:flex;
	}
	#contentContainer.drag,#about.drag{
	display:none!important;
	}
	#drop_contents{
	width:500px;
	text-align:center;
	position:fixed;
	}
	#drop_text{
	font-size:18px;
	}
	#preview_vis{
	position:absolute;
	width:0;
	opacity:0.5;
	background-color:#fff;
	}

	#dndText{
	display:inline-block;
	position:relative;
	top:-10px;
	margin-left:10px;
	}

	#about{
	display:none;
	max-width:700px;
	}
	</style>
	<script type="text/javascript" src="//u.9999yea.rs/resources/js/css3-mediaqueries.js"></script>
	<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-29541720-13']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>
<script>
String.prototype.replaceChar=function(index, char) {
      return this.substr(0, index) + char + this.substr(index+char.length);
}

String.prototype.insert=function(index, insertee) {
      return this.substr(0, index) + insertee + this.substr(index+insertee.length);
}

String.prototype.delete=function(start, end) {
      return this.substr(0, start) + this.substr(end);
}

function rand(min,max) {
return Math.floor((Math.random()*(max-min))+min);
}

function randB64(l) {
var key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var out = "";
for(var i=0;i<l;i++)
{
out = out + key[Math.floor((Math.random()*64))];
}
return out;
}

function randFromArray(a) {
return a[Math.floor((Math.random()*a.length))];
}

function setChange(corpus) {
document.getElementById("glitched").setAttribute("src",corpus);
}

var undoStack=[0];
var redoStack=[0];
var lastAction = "do";

function debug(msg) {
console.log(msg);
console.log(undoStack);
console.log(redoStack);
console.log(lastAction);
console.log("-----");
}

function undoStackFirst()
{
return undoStack[undoStack.length-1];
}
function redoStackFirst()
{
return redoStack[redoStack.length-1];
}

function undo() {
if(!undoStackFirst()) { undoStack.push(0); }
if(lastAction == "do") { redoStack.push(undoStack.pop()); }
setChange(document.forms['imageData']["r" + undoStackFirst()].value);
document.getElementById('timescale').value = undoStackFirst();
document.getElementById('timescalevalue').innerHTML = undoStackFirst();
if(undoStackFirst() == undoStack[undoStack.length-2])
{
undoStack.pop();
}
else
{
redoStack.push(undoStack.pop());
}
lastAction = "undo";
//debug("undo");
}

function redo() {
if(!redoStackFirst()) { redoStack.push(0); }
if(lastAction == "undo") { undoStack.push(redoStack.pop()); }
setChange(document.forms['imageData']["r" + redoStackFirst()].value);
document.getElementById('timescale').value = redoStackFirst();
document.getElementById('timescalevalue').innerHTML = redoStackFirst();
if(redoStackFirst() == redoStack[redoStack.length-2])
{
redoStack.pop();
}
else
{
undoStack.push(redoStack.pop());
}
lastAction = "redo";
//debug("redo");
}

function redoToRound(round) {
round = parseInt(round,10);
setChange(document.forms['imageData']["r" + round].value);
document.getElementById('timescale').value = round;
document.getElementById('timescalevalue').innerHTML = round;
undoStack.push(round);
redoStack.push(round);
lastAction = "redo";
//debug("redo to round");
}

function glitchImage(mode) {
var corpus = document.getElementById("glitched").getAttribute("src");
switch(mode)
{
case 1:
  replaceRandom(corpus);
  break;
case 2:
	replaceCopy(corpus);
  break;
case 3:
	duplicate(corpus);
  break;
case 4:
	deleteSegment(corpus);
  break;
case 5:
	insertRandom(corpus);
  break;
case 6:
    swap(corpus);
  break;
default:
	duplicate(corpus);
}
//if(document.forms['sliders']['timescale'].max == 0) { document.forms['sliders']['timescale'].max = 1; }
document.getElementById('imageData').innerHTML = document.getElementById('imageData').innerHTML + '<input type="hidden" name="r' + (parseInt(document.forms['sliders']['timescale'].max,10) + 1) + '" value="' + document.getElementById("glitched").getAttribute("src") + '">';
document.forms['sliders']['timescale'].max = parseInt(document.forms['sliders']['timescale'].max,10) + 1;
document.forms['sliders']['timescale'].value = parseInt(document.forms['sliders']['timescale'].max,10) + 1;
document.getElementById('timescalevalue').innerHTML = parseInt(document.forms['sliders']['timescale'].max,10);
if(lastAction == "undo") {
undoStack.push(redoStack.pop());
}
undoStack.push(parseInt(document.forms['sliders']['timescale'].max,10));
//redoStack.push(undoStackFirst());
lastAction = "do";
//debug("do");
}

function replaceRandom(corpus) {
glitchLength = rand(document.getElementById('gmax').value/2,document.getElementById('gmax').value);
startPos = rand(0+((document.getElementById('protection').value/100)*corpus.length),(corpus.length)-glitchLength);
glitchData = randB64(glitchLength);
for(var i=0; i<glitchLength; i++) {
corpus = corpus.replaceChar(i+startPos,glitchData[i]);
}
setChange(corpus);
}

function replaceCopy(corpus) {
glitchLength = rand(document.getElementById('gmax').value/2,document.getElementById('gmax').value);
startPos = rand(0+((document.getElementById('protection').value/100)*corpus.length),(corpus.length)-glitchLength);
glitchStartPos = rand(0,(corpus.length)-glitchLength);
glitchData = corpus.substr(glitchStartPos,glitchLength);
for(var i=0; i<glitchLength; i++) {
corpus = corpus.replaceChar(i+startPos,glitchData[i]);
}
setChange(corpus);
}

function duplicate(corpus) {
glitchLength = rand(document.getElementById('gmax').value/2,document.getElementById('gmax').value);
startPos = rand(0+((document.getElementById('protection').value/100)*corpus.length),(corpus.length)-glitchLength);
glitchData = corpus.substr(startPos,glitchLength);
corpus = corpus.insert(startPos+glitchLength,glitchData);
setChange(corpus);
}

function deleteSegment(corpus) {
glitchLength = rand(document.getElementById('gmax').value/2,document.getElementById('gmax').value);
startPos = rand(0+((document.getElementById('protection').value/100)*corpus.length),(corpus.length)-glitchLength);
corpus = corpus.delete(startPos,startPos+glitchLength);
setChange(corpus);
}

function insertRandom(corpus) {
glitchLength = rand(document.getElementById('gmax').value/2,document.getElementById('gmax').value);
startPos = rand(0+((document.getElementById('protection').value/100)*corpus.length),(corpus.length)-glitchLength);
glitchData = randB64(glitchLength);
corpus = corpus.insert(startPos,glitchData);
setChange(corpus);
}

function swap(corpus) {
glitchLength = rand(document.getElementById('gmax').value/2,document.getElementById('gmax').value);
startPos = rand(0+((document.getElementById('protection').value/100)*corpus.length),(corpus.length)-glitchLength);
glitchStartPos = rand(0+((document.getElementById('protection').value/100)*corpus.length),(corpus.length)-glitchLength);
glitchData = corpus.substr(glitchStartPos,glitchLength);
for(var i=0; i<glitchLength; i++) {
temp = corpus[i+startPos];
corpus = corpus.replaceChar(i+startPos,glitchData[i]);
glitchData = glitchData.replaceChar(i,temp);
}
for(var i=0; i<glitchLength; i++) {
corpus = corpus.replaceChar(i+glitchStartPos,glitchData[i]);
}
setChange(corpus);
}

/*
update, oct. 2014: it's been a while since i coded this. please don't ask me any difficult questions
update, may 2016:  please ignore this code. i'm not like that any more
*/
</script>
<script>
$( document ).ready(function() {
$("#drop_zone").css({"width":$("#container").width(),"height":$("#container").height()});
$("#drop_contents").css({"left":($("#drop_zone").width()/2)-220 + "px"});
});

function displayAbout() {
$("#about").css({"display":"block"});
$("#contentContainer").css({"display":"none"});
}

function closeAbout() {
$("#about").css({"display":"none"});
$("#contentContainer").css({"display":"block"});
}
</script>
</head>
<body>
<div id="container">
<div id="title"><b><a href="/imageglitcher/">img glitcher</a></b></div>
<div id="drop_zone">
<div id="drop_contents">
<span id="drop_text">drop here!</span>
<div id="preview_vis"></div>
<img id="drop_preview">
<div id="preview_name"></div>
</div>
</div>
<div id="contentContainer">
<img id="glitched" src="<?php
$allowedExts = array("jpg", "jpeg", "gif", "png", "tiff", "bmp", "raw", "tga", "img");
$output = "";
ob_start();
$extURL = "";
include('upload.php');
$extURL = ob_get_contents();
ob_end_clean();
echo explode('"',$output)[0];
?>">
<div id="buttonContainer" class="top20">
<div class="buttonRow">
<div class="button" onclick="glitchImage(6);">swap</div>
<div class="button" onclick="glitchImage(3);">duplicate</div>
</div>
<div class="buttonRow">
<div class="button" onclick="undo();">undo</div>
<div class="button" onclick="redoToRound(0);">reset</div>
<div class="button" onclick="redo();">redo</div>
</div>
</div>
<div id="sliderContainer" class="top20">
<form name="sliders">
<span class="leftPad">amount:</span><input type="range" min="0" max="500" value="100" id="gmax" onchange="document.getElementById('gmaxvalue').innerHTML = this.value;"> <span id="gmaxvalue">100</span>
<br>
<span class="leftPad">protection:</span><input type="range" min="0" max="100" value="0" id="protection" onchange="document.getElementById('protectionvalue').innerHTML = this.value;"> <span id="protectionvalue">0</span>
<br>
<span class="leftPad">timescale:</span><input type="range" min="0" max="0"
value="0" id="timescale" oninput="redoToRound(this.value);" onchange="redoToRound(this.value);"> <span id="timescalevalue">0</span>
</form>
</div>
<form action="/" method="post"
enctype="multipart/form-data" id="fileForm" class="top20">
<input type="file" name="file" id="file" onchange="previewInput()">
<a href="" id="fileGUI">upload</a><div id="dndText">or drag & drop!</div>
<input type="submit" name="submit" value="upload" id="fileSubmit">
<div id="url"><input type="text" name="url" id="urlText" value="url">
<input type="submit" name="submit" value="upload" id="urlSubmit"></div>
<div id="anger"></div>
</form>
<div class="buttonRow">
<div class="button" id="imageLink"><a href="<?php
echo "?f=" . substr($filename,7);
?>">link to this image</a></div>
<div class="button" id="randomImageLink"><a href="" id="randomLink">random image</a></div>
</div>
<div class="top20"><a href="about">help / about</a></div>
<form name="imageData" id="imageData">
<input type="hidden" name="r0" value="<?
echo $output;
?>">
</form>
<script>

$("#urlText").on("click",function() {
if($("#urlText").val() == "url"){
$("#urlText").val("");
}
else
{
$("#urlText").select();
}
});

$("#urlText").on("blur",function() {
if($("#urlText").val() == ""){
$("#urlText").val("url");
}
});

$("#urlText").on("keyup",function() {
$("#urlSubmit").css({"display":"inline-block"});
$("#dndText").css({"display":"inline-block"});
$("#fileGUI").html("");
$("#fileSubmit").css({"display":"none"});
});

$('#fileForm').submit(function() {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
if(!pattern.test($("#urlText").val()) && !$("#file").val()){
$("#anger").html("please enter a valid url");
$("#anger").css({"left":$("#url").width()+40});
return false;
}
});

var fileSelect = document.getElementById("fileGUI");
var fileElem = document.getElementById("file");

fileSelect.addEventListener("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault(); // prevent navigation to ""
}, false);

function previewInput() {
$("#dndText").css({"display":"none"});
$("#fileGUI").html(fileElem.files[0].name);
$("#fileSubmit").css({"display":"inline-block"});
$("#urlSubmit").css({"display":"none"});
}

function transferComplete() {
$("fileForm").submit();
}
function transferFailed() { }
function transferCanceled() { }

function previewDrop(file) {
	$("#preview_name").html(file.name);
var preview = document.getElementById("drop_preview");
	    var reader = new FileReader();
      reader.onload = function (e) {
        preview.setAttribute('src', e.target.result);
	  $("#preview_vis").css({"height":$("#drop_preview").height()});
      }
      reader.readAsDataURL(file);
	  $("#drop_text").css({"display":"none"});
}

var container = $("#contentContainer");
var about = $("#about");
var dropTarget = $('#drop_zone'); //for dnd detection later

function updateProgress (oEvent) {
  if (oEvent.lengthComputable) {
    var percentComplete = oEvent.loaded / oEvent.total;
    $("#preview_vis").css({"width":percentComplete*5});
  }
}

function transferComplete(evt) {
$("#preview_name").html("complete!");
dropTarget.removeClass('drag');
container.removeClass('drag');
about.removeClass('drag');
}

function transferFailed(evt) {
$("#preview_name").html("failed");
dropTarget.removeClass('drag');
container.removeClass('drag');
about.removeClass('drag');
}

function changeImage(responseText) {
		var data = responseText.substring(0,responseText.indexOf('"'));
		var filename = responseText.substring(responseText.indexOf('"')+1);
        $("#glitched").attr("src",data);
		$("#imageData").html('<input type="hidden" name="r0" value="' + data + '">');
		var undoStack=[0];
		var redoStack=[0];
		var lastAction = "do";
		$("#timescale").attr("max",0);
		$("#timescale").attr("value",0);
		$("#timescalevalue").html("0");
		$("#imageLink a").attr("href","?f=" + filename);
}

function randomImage() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
	changeImage(xhr.responseText);
		}
	}
	xhr.open("POST", "upload.php?r");
	xhr.send(new FormData());
}

document.getElementById("randomLink").addEventListener("click", function (e){
  e.preventDefault(); // prevent navigation to ""
  randomImage();
}, false);

  function handleFileSelect(evt) {
    //evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files; // FileList object.
	var file = files[0];
	if (!file || !file.name.match(/\.(<? echo implode('|', $allowedExts); ?>)$/)) {
	$("#preview_name").html("please upload an image file");
	timeout = setTimeout( function(){
		dropTarget.removeClass('drag');
		container.removeClass('drag');
		about.removeClass('drag');
    }, 1500);
	return
	}
	previewDrop(file);
	var fd = new FormData();
	fd.append("file", file);

	var xhr = new XMLHttpRequest();
	//xhr.upload.addEventListener("progress", updateProgress, false);
	xhr.addEventListener("load", transferComplete, false);
	xhr.addEventListener("error", transferFailed, false);
	xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
			changeImage(xhr.responseText);
		}
	}
	xhr.open("POST", "upload.php");
	xhr.send(fd);
  }

  function handleDragOver(evt) {
  //  evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.

  }

  // Setup the dnd listeners.
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);

///*
  var  html = $('html'),
    showDrag = false,
    timeout = -1;

html.bind('dragenter', function () {
	$("#preview_name").html("");
	$("#drop_text").css({"display":"block"});
	$("#drop_preview").attr("src","");
    dropTarget.addClass('drag');
	container.addClass('drag');
	about.addClass('drag');
	closeAbout();
    showDrag = true;
});
html.bind('dragover', function(){
    showDrag = true;
});
html.bind('dragleave', function (e) {
    showDrag = false;
    timeout = setTimeout( function(){
		if(showDrag == false){
		dropTarget.removeClass('drag');
		container.removeClass('drag');
		about.removeClass('drag');}
    }, 300);
});//*/
</script>
</div>
</div>
</body>
</html>
