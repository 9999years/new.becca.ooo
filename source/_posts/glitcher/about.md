---
title: glitcher
description: about
---

# about

img glitcher is an in-browser procedural data bending application developed by
[rebecca turner], known previously as [9999years]

it simply loads the image data as raw binary into an image on the page. then,
the buttons will modify the data randomly --- as with manual data bending,
corruption and image breaking is to be expected, just undo and try again! some
images just won’t glitch well and gifs in particular are very volatile? try
converting the image to a different format!

## functions

function   | description
-----------|------------
duplicate  | duplicates a small portion of the data
swap       | swaps two sections of data
amount     | determines the amount of image data to be modified
protection | a percent value specifying a section of the start of the image not to use, to protect headers breaking (i’ve found it generally unnecessary)
timescale  | each action (i.e. duplicate and swap) creates a state, which is stored locally in the page; undo, redo, and reset are used for navigating these states, but an explicit slider lets you restore a specific state
undo       | undoes the last action taken
redo       | re-does the last action undone
reset      | reset the image to its original state

[return to the glitcher](..)

[rebecca turner]: /
[9999years]: http://9999years.tumblr.com/
[contact]: /contact
