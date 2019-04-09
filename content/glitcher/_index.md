+++
title="img glitcher"
+++

once upon a time, a procedural, in-browser image glitcher lived here (or,
rather, at glitcher.9999yea.rs; i no longer have the 9999yea.rs domain). it
worked by dumping the binary representation of an image into the page as a
base64-encoded blob url; then, a fairly simple javascript script could randomly
mess with the data to produce glitches as “authentic” as manually messing with
the binary data in a text editor.

it may be revived one day, but i wouldn’t count on it;

- browsers seem to have gotten much less generous with attempting to render
  malformed images
- i don’t want to allow users to upload images any more — or even run any php
  scripts
