+++
title="i c the light"
description="resources and publications that i used writing i c the light, a distance-estimating ray marching renderer"
url="i-c-the-light/reference-links"
+++

## Reference Links

### Distance Estimation / Ray Marching

[The Science of Fractal Images, Heinz-Otto Peitgen and Dietmar Saupe, eds.
(1988)][28] \
Fractal rendering algorithms.


[Ray Tracing Deterministic 3-D Fractals by John C. Hart et. al (1989)][1] \
The first paper on distance-estimating 3d fractals as a ray-marching
technique!

[Distance Estimated 3D Fractals][2] \
Distance-estimated 3D fractals. This is what I really want to do, and the
source that lead me to this.

[Demoscene Presentation on Ray Marching][3] \
“Don’t define the surface first and then compute the distance field, but
directly code a distance field and a surface will emerge.” \
Unfortunately, a lot of the links in this presentation are dead.

[Ray march shaders on Stack Exchange][4] \
A nice overview of what the algorithm is with unfortunately and
understandably little on the specifics of applying it.

[Sample functions for various primitive objects in a ShaderToy][5] \
Made by Iñigo Quilez, who seems to be very prominent in this scene. \
[More information here on his website.][6] \
Also shows how to calculate binary intersections (unions, subtractions,
and intersections) of objects, repeat/rotate/translate/scale objects,
displace and blend objects, and more. This is a gold mine.

[Terrain Ray Marching][7] \
Also by Iñigo Quilez.

[Ray marching soft shadows][8] \
Thanks Iñigo Quilez.

[Ray marching with THREE.js][9] \
Surprisingly achievable and smooth in Javascript, although complexity
suffers.

[Distance estimation of Mandlebrot and Julia sets][10]

### Open Source Ray Tracers And Guides

[Smallpt, a raytracer written in 99 lines of C++][11]

[Introduction to Ray Tracing: a Simple Method for Creating 3D Images][12] \
A more conceptual overview of the topic.

[Fuzzy Photon — How to write a Raytracer][13] \
Gets into details with specific problems and code examples.

[UCI RayTracing Tutorial][14] \
Contains more information on depth of field, isosurfaces (blobs), and auto
exposure. \

[Luminosity ray tracer written in Haskell][15] \
A lot of more mathematical language here, as should be expected from a
Haskell project.

[Purple Alien Planet Raytracer written in C][16] \
An open-source implementation containing lots of math and explanations for
the underlying algorithms.

[The Rendering Equation][17] \
The rendering equation describes the total amount of light emitted from a
point x along a particular viewing direction, given a function for
incoming light and a BRDF.

[SDL Skeleton capable of drawing pixels to the screen][18] \
This may have saved me effort in writing boilerplate, although I had already
done most of this earlier. It’s definitely good to have another reference,
though.

### Perlin Noise

[Understanding Perlin Noise][19] \
Perlin noise for procedural textures, reads a lot on 2d noise (because of
simplicity to explain and diagram) but still very digestible. A lot like the
Eevee link.

[Improved Noise reference implementation][20] \
A compact (3062-byte) Java implementation of Perlin noise, by Perlin himself.
Not dynamic or 4-dimensional, and filled with many weird hacks, but a good
starting point.

[Improving Perlin Noise by Ken Perlin][21]

[Perlin Noise by Eevee][22]

[Formulas for picking a random point on the surface of a sphere][23]

[Perlin noise derivatives by Iñigo Quilez][24]

### Misc

[Volume rendering][25]

[Quaternion Fractals][26]

[Ray Tracing Quaternion Julia Sets on the GPU (Keenan Crane, 2005)][27]

[1]: https://becca.ooo/i-c-the-light/resources/ray-tracing-deterministic-3-d-fractals-john-c-hart-daniel-j-sandin-louis-h-kauffman-1989.pdf
[2]: http://blog.hvidtfeldts.net/index.php/2011/06/distance-estimated-3d-fractals-part-i/
[3]: http://www.iquilezles.org/www/material/nvscene2008/rwwtt.pdf
[4]: https://gamedev.stackexchange.com/questions/67719/how-do-raymarch-shaders-work
[5]: https://www.shadertoy.com/view/Xds3zN
[6]: http://www.iquilezles.org/www/articles/distfunctions/distfunctions.htm
[7]: http://www.iquilezles.org/www/articles/terrainmarching/terrainmarching.htm
[8]: http://www.iquilezles.org/www/articles/rmshadows/rmshadows.htm
[9]: http://barradeau.com/blog/?p=575
[10]: http://imajeenyus.com/mathematics/20121112_distance_estimates/distance_estimation_method_for_fractals.pdf
[11]: http://www.kevinbeason.com/smallpt/
[12]: http://www.scratchapixel.com/lessons/3d-basic-rendering/introduction-to-ray-tracing
[13]: http://fuzzyphoton.tripod.com/howtowrt.htm
[14]: https://www.ics.uci.edu/~gopi/CS211B/RayTracing%20tutorial.pdf
[15]: http://mitchellkember.com/blog/post/ray-tracer/
[16]: http://www.purplealienplanet.com/node/20
[17]: https://en.wikipedia.org/wiki/Rendering_equation
[18]: http://sol.gfxile.net/gp/ch02.html
[19]: https://flafla2.github.io/2014/08/09/perlinnoise.html
[20]: http://mrl.nyu.edu/~perlin/noise/
[21]: http://http.developer.nvidia.com/GPUGems/gpugems_ch05.html
[22]: https://eev.ee/blog/2016/05/29/perlin-noise/
[23]: http://mathworld.wolfram.com/SpherePointPicking.html
[24]: http://www.iquilezles.org/www/articles/morenoise/morenoise.htm
[25]: https://graphicsrunner.blogspot.com/2009/01/volume-rendering-101.html
[26]: http://paulbourke.net/fractals/quatjulia/
[27]: https://www.cs.cmu.edu/~kmcrane/Projects/QuaternionJulia/paper.pdf
[28]: /i-c-the-light/resources/the_science_of_fractal_images.pdf
