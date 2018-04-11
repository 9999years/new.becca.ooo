+++
title="glitcher"
description="about"
+++

# about

img glitcher is an in-browser procedural data bending application developed by
[rebecca turner], known previously as [9999years9999 years]

it simply loads the image data as raw binary into an image on the page. then,
the buttons will modify the data randomly --- as with manual data bending,
corruption and image breaking is to be expected, just undo and try again! some
images just won’t glitch well and gifs in particular are very volatile?try
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

`jpg`, `jpeg`, `gif`, `png`, `tiff`, `bmp`, `raw`, `tga`, `img`, `tif`, `xbm`,
`mng`, `iff`, `ppm`, `pbm`, and `webp` images will upload, however not all will
display in browsers

firefox support is not planned due to the way firefox renders images. sorry! in
fact, as time goes on, this might break in other browsers as well

#### privacy policy:

all images uploaded are kept on the server (for image linking features).
additionally, to conserve requests to the google images search api (for the
random image feature) if the random image feature is used, your ip will be
logged along with the amount of images you’ve loaded. no other data is kept. i
don’t want it

bug reports, comments, questions, and suggestions are extremely appreciated!
[send me an ask] or [contact] me!

[return to the glitcher][..]

[rebecca turner]: /
[9999 years]: http://9999years.tumblr.com/
[contact]: /contact
