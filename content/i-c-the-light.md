+++
title="i c the light"
description="a distance-estimating ray marcher for rendering quaternion julia set fractals"
+++

## A distance-estimating ray marcher

From [Syntopia]:


> Classic raytracing shoots one (or more) rays per pixel and calculates where the
> rays intersect the geometry in the scene. Normally the geometry is described by
> a set of primitives, like triangles or spheres, and some kind of spatial
> acceleration structure is used to quickly identify which primitives intersect
> the rays.
>
> Distance Estimation, on the other hand, is a ray marching technique.
>
> Instead of calculating the exact intersection between the camera ray and the
> geometry, you proceed in small steps along the ray and check how close you are
> to the object you are rendering. When you are closer than a certain threshold,
> you stop. In order to do this, you must have a function that tells you how
> close you are to the object: a Distance Estimator. The value of the distance
> estimator tells you how large a step you are allowed to march along the ray,
> since you are guaranteed not to hit anything within this radius.

[My paper on the ray marcher I wrote][paper]

[Reference links](reference-links)

[Github repo](https://github.com/9999years/i-c-the-light)

[Gallery of image output](gallery)

![A distance-estimated rendering of a pink 3D slice of a 4D quaternion Julia set
fractal](resources/julia.jpg)

[Syntopia]: http://blog.hvidtfeldts.net/index.php/2011/06/distance-estimated-3d-fractals-part-i/
[paper]: i-c-the-light.pdf
