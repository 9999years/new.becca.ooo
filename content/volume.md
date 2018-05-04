+++
title="volume by integration"
description="to set the volume, solve an integral"
draft=true
css=["volume"]
js=["volume"]
+++

Non-working while I figure out what I want to do with this. I don’t want to use
3rd party videos (tracking is creepy) or host my own audio (I don’t like messing
with binaries and I’ll probably delete it earlier than is sensible), which
leaves me at kind of an impasse.

<div id="volume-input">
Volume = <span id="int">∫
<input type="number" id="bottom-limit-value" value="0">
<input type="number" id="top-limit-value" value="10">
</span><input type="text" id="formula-input" value="ln(x^2)/2"></input>dx
= <span id="integration-result">100.0%</span>
</div>

Youtube video (`youtube.com/watch` or `youtu.be`): <input id="yt-input" value="https://www.youtube.com/watch?v=dQw4w9WgXcQ">

<div id=video"></div>
