# [becca.ooo]

[![Travis CI — Let’s hope it builds because it’s going live in at most an hour](https://travis-ci.org/9999years/becca.ooo.svg?branch=master)](https://travis-ci.org/9999years/becca.ooo)

This is the source code for my personal website, [becca.ooo]. It’s been newly
(April 2018) converted to a [SASS] / [Hugo] / [Markdown][bf] stack (with my
server running [Caddy] and, regrettably, PHP 7 — hopefully PHP will be phased
out in the near future, but that requires reading / translating very old very
gross code as well as setting up a Ruby or Python fast CGI proxy and that’s just
a big hassle).  There’s also some Javascript — for the flavor text on the
[homepage][becca.ooo] as well as for the interactive web-app style things (see
the [projects] page for examples / details). As a general rule, Javascript is a
last-resort — it’s as minimal as possible and only used where strictly needed.

## Ideology

As much as any action is political, my website is a political act — with it, I
condemn massive pages and the blight of Javascript on the modern web. I recently
attempted to navigate Nike’s mobile website and there was so much code running
to enable swipe-driven interfaces that the whole website took about half of a
second to respond to any sort of touch, which ironically completely negated all
the cool intuitiveness they were aiming for with their gesture-based UI
(additionally, swiping through often conflicted with my browser’s forward /
backward swipe gestures). It was horrible, and *preventably* horrible: the pages
were a straight grid of images. Even accounting for code to enable tap-based
navigation through image galleries, the page weight was absolutely
disproportionate and it made using the website miserable. Also, this is a great
example of why the “seamless” autoloading gallery was a bad idea: every time a
new batch of images were inserted into the page, my browser would slow down at
all the data, unable to garbage collect the page’s images. It makes saving your
place hard *and* it’s the reason the Tumblr app consistently crashes with OOM
errors.

I don’t like a lot of modern web development; I think it’s too hefty and too
complicated. Simple is better. Who needs AMP or Node or anything?  Open a news
site and see how many animations are flying around on static content!
Newspapers managed to sit still on a page with no Javascript for centuries.

My goals with my website are:

1. Have a tiny page-size
2. Have a beautiful website without Javascript, massive amounts of CSS, images,
   or webfonts — with Microsoft’s [Segoe], Apple’s [San Francisco], and Google’s
   [Noto], every device comes with a beautiful (or at least adequate in Noto’s
   case) sans-serif in a plethora of weights and styles at *zero cost* to you.
   Utilise them!
3. Centralize my contact and personal information

I’m pretty proud that [becca.ooo] loads in three requests at about 6 KB, which
is about 1/300th the size and 3/100ths the requests of [the average page] (in
2018; 2MB & 100 req.s). All the content pages will load in a maximum of four
requests, most in two or three:

1. Main page HTML
2. (Possibly) a favicon (see below)
3. Main CSS
4. (Possibly) auxiliary page-specific CSS

The favicon is only loaded if a bigger image than the inlined 404-byte 32×32 PNG
is required, and I’ll probably inline the SVG version once SVG favicons become
[more widely supported][svg favicon support]. Caching essentially eliminates the
favicon and CSS after the first load, too.

The content pages are mostly CSS (about half, by weight). That’s something to
work on! A fair amount of even `main.css` is pretty niche; there’s support for
justified text, block quotes, lists, and screens below 380px wide. (That’s
certainly an extreme — desktop Tumblr can’t handle a window less than 1000px
wide. Sucks for you if you wanted to, I don’t know, browse Tumblr on *half* of a
1080p monitor and do something else like uh, talk to a friend on the other
half.)

## The scripts

`check-exists.sh` reads a filename as its first argument, which is a list of
files. Lines starting with `#` are ignored. If any line is a file which doesn't
exist, a message is printed to STDERR. At the end, the number of not-found files
is printed. (`should-exist.txt` is a list of files that *should* exist in a
proper build.) This is all part of the Travis integration.

`post-merge.sh` builds the site normally; it’s meant to be a Git hook. Create it
with something like `ln .git/hooks/post-merge post-merge.sh`, but I forget if
that’ll actually work or not. You’ll also need to `chmod +x` the thing. Either
the link or the executable. I don’t remember.

`dev.ps1 [-Build|-Install|-Diagnostic|-DiffShouldExist|-GenerateShouldExist]`
performs several tasks.

* By default, it starts a development server for both SASS and Hugo.
* `-Build` builds the site normally with `./post-merge.sh`; this requires `sh`
  to be installed.
* `-Diagnostic` builds the site and prints Hugo’s “template metric hints”.
* `-Install` installs SASS and Hugo with Chocolatey.
* `-DiffShouldExist` diffs the current `public` directory with the local
  `should-exist.txt`.
* `-GenerateShouldExist` generates a new `should-exist.txt` from the `public`
  directory; use `-Overwrite` to write the result to a new `should-exist.txt`
* `-Clean` cleans everything safe to delete (i.e. not images etc.) from `public`

## Other files

`config.toml` is the site config. Almost empty; most things happen in the
various `content/*.md` files and the `layouts/*.html` templates.

## Directory structure

`assets/css` — SASS files that are compiled into the CSS files in `static/css`.
Confusing name, I know.

`content` — The actual text on the site, but some files (like `_index.md`) just
specify which template to render and contain no body copy. It’s a bit confusing.
There’s also some weird situations like how `unicode.md` renders to `unicode/`
(i.e. as `unicode/index.html`) but it doesn’t render at all if it’s actually
placed in the `unicode/` directory in `content/`? No clue.

Some stuff in `content` are actual full-page apps, Javascript toys and such that
I made before this all existed as a Hugo site. I’ll maybe convert some of them,
at some point.

`data` — used to render several pages, this contains variable structured data,
usually organized into some sort of table.

`layouts` — actual templates. Don’t ask me how these work, I don’t really know.
I’m thinking about converting them to... something that’s not Hugo templates,
because I don’t like Hugo / Go’s (essentially non-existent) inheritance model.
Also I dislike the syntax of XML.

`public` — where the built site goes.

`static` — stuff copied to public directly. Includes processed CSS, some PDFs,
some Javascript, etc. Some stuff is actually only on my server! Beware.

## Deleting `public`

Use `./dev.ps1 -Clean` because otherwise you might delete binary data in
`public/` not stored in `static/`.

## License

It seems weird to attach a formal license to some of this work — given that it
includes, like, a short bio, and my contact information, among other things.
Whenever not specified, work within this repository is AGPLv3 licensed (see
`LICENSE.md`). However, files ending in `.md` (mostly the files within
`content/`) are all-rights-reserved fully copyrighted (© 2018 Rebecca Turner).

In short: fork the code, but not my writing.

[becca.ooo]: https://becca.ooo/
[projects]: https://becca.ooo/projects
[bf]: https://github.com/russross/blackfriday
[SASS]: http://sass-lang.com/
[Hugo]: https://github.com/gohugoio/hugo
[Caddy]: https://caddyserver.com/
[the average page]: https://www.machmetrics.com/speed-blog/average-page-load-times-websites-2018/
[Segoe]: https://en.m.wikipedia.org/wiki/Segoe
[San Francisco]: https://en.m.wikipedia.org/wiki/San_Francisco_(sans-serif_typeface)
[Noto]: https://en.m.wikipedia.org/wiki/Noto_fonts
[svg favicon support]: https://caniuse.com/#feat=link-icon-svg
