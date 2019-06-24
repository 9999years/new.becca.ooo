---
title: Mandelbrot
layout: mandelbrot
hide_header: true
extra_js:
  - mandelbrot.bundle
extra_css:
  - differential
---

<div class="head">
*z*<sub>*n* + 1</sub> = *z<sub>n</sub>*<sup>2</sup> + *c*, *z*<sub>0</sub> = 0
</div>

<p><button id="automate-button">Automate</button></p>

<p><input type="checkbox" name="line" id="mode-line" checked> Line
<br>
<input type="checkbox" name="overlay" id="mode-overlay" checked> Overlay
</p>

<p>Zoom:
<input type="number" id="scale-value" value="3">
<br><input type="range" id="scale-range" min="0.0000000001" max="3" value="3" step="0.01"></input>
</p>

<p>Iterations:
<input type="number" id="iterations-value" value="32">
<br><input type="range" id="iterations-range" min="0" max="128" value="32" step="1"></input>
</p>

<p>Center:
<br>x:
<input type="number" id="center-x-value" value="-0.743643135">
<br><input type="range" id="center-x-range" min="-10" max="10" value="-0.743643135" step="0.01"></input>
<br>y:
<input type="number" id="center-y-value" value="0.131825963">
<br><input type="range" id="center-y-range" min="-10" max="10" value="0.131825963" step="0.01"></input>
</p>

<p>Interesting locations:
<br><select id="location-dropdown">
  <option value="-0.743643135 + 0.131825963">
    -0.74364 + 0.13182𝑖
  </option>
  <option value="-0.157024915 + 1.039106103">
    -0.15702 + 1.03911𝑖
  </option>
  <option value="-0.1011 + 0.9563">
    -0.10110 + 0.95630𝑖
  </option>
  <option value="0.001643721971153 + -0.822467633298876">
    0.001643 - 0.82246𝑖
  </option>
  <option value="0.16125 + 0.638438">
    0.161250 + 0.638438𝑖
  </option>
  <option value="-0.5357487292400005 + -0.5258438794399889">
    -0.53574 - 0.525843𝑖
  </option>
</select></p>

<div id="cursor-tracking-note" style="display: none;">
**Note:** Cursor tracking is disabled — the red crosshairs won’t move with your mouse. Press `t` to toggle cursor tracking.
</div>

The line at the bottom represents the values of |*z<sub>n</sub>*| at the
location of the red crosshairs, until |*z<sub>n</sub>*| “escapes” (becomes
greater than 2) or all the iterations are calculated. The line swirling around
the graph starting from the cursor similarly represents actual values of
*z<sub>n</sub>*, not just their absolute values. Increasing the amount of
iterations increases the detail rendered, and by rendering a sufficiently large
number of iterations, we may render a picture arbitrarily close to the actual,
infinitely-detailed Mandelbrot set.

Any white “holes” in the set are simply unfortunate graphical errors, and
should be disregarded.
