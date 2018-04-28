+++
title="Getting started with Hugo"
+++

This website is built with [Hugo], a “static site generator,” or a very
complicated tool to make changing your website’s style easier. I actually think
Hugo is pretty cool! It makes keeping this website looking good and cohesive a
lot easier. There’s a catch, though: [the docs][hugo docs] are terrible. I don’t
know if they’re particularly terrible for me, because my needs don’t quite align
with… whatever the Hugo authors feel like the target demographic of Hugo is, or
if the docs are just bad. A major problem with the docs is that their
“discoverability” is low --- i.e. that finding the thing I wanted to learn about
was hard, partially because a lot of Hugo uses unique / specialized terminology
with not-very-intuitive meanings (archetype, section, taxonomy, tag, front
matter, shortcode, etc.).

There’s another problem that lies within writing documentation for a system of
many intrinsically-interconnected parts such as networks, which is of ordering;
it’s difficult to teach “just the important parts” when every part is equally
important. It’s difficult to avoid endless forward and backward references from
critical to tangentially related but nonetheless important parts of the system.

In any case, **learning to use Hugo was hard for me.** Here’s what I have
learned that might help you.

This guide links to examples from my own website throughout, particularly where
I think they’re useful. I believe that seeing real-life examples --- not just
contrived overly-simplified hello worlds --- is critical to learning how to
“really” use something. The [Hugo sandbox] along with [its source code][sandbox
src] is a great resource for seeing just about every Hugo feature mashed
together and you may find the [Hugo example blog] enlightening as well.

Please note that this guide is a work in progress; [hit me up] or open a
pull-request / issue for [this guide on GitHub] if you’d like to help improve it!

# Scope

It’s important to state my scope, because it’s a bit different than what the
docs seem to assume.

What I assume you already know:

* How to write [HTML] (for creating your templates), [CSS] (for designing your
  website), [Markdown] (for writing your pages’ content), and [TOML] (for
  specifying configuration data).
* At least one programming language (for creating cool and dynamic templates).

Don’t worry too much if you haven’t worked with some of these before, but it may
be valuable to spend 5 minutes reading up on them beforehand so you know what
the building blocks are here.

What I want:

* I want to create a website from the ground up, i.e. write my own styles and
  HTML.
    * This means creating my own theme. (Or, as I learned later, not creating or
      using a theme at all.)
* I want to convert existing pages with short bits of information or in some
  cases web-apps to be within Hugo.
* I want to get my website under version control.
* I want to keep everything [DRY] and extensible --- I want to make creating new
  variations of existing content and styles and extending my current styles as
  easy as possible.

Critically, here’s what I’m *not* doing:

* I’m not writing a blog or press releases.
* I’m not using someone else’s theme or styles.
* I’m not creating a deep hierarchy / taxonomy. My content is fairly “flat”.
  There’s a couple things nested within the [Unicode] stuff, but that’s more or
  less the extent of it.
* I’m not writing a localized website, i.e. with support for multiple languages.
  This is because I don’t speak multiple languages.

# The Hugo process

Hugo is a glorified Markdown-to-HTML renderer. See [markdown
rendering](#markdown-rendering) below for details on this.

Hugo combines the Markdown-with-metadata (more on this soon) in your `content`
directory with templated HTML in your `layouts` directory and static files like
CSS and Javascript in your `static` directory to final output in your `public`
directory. There’s [more directories] but they’re not important for now.

## Front matter

[Front matter] is metadata attached to each Markdown content file, which lets
you specify things like the title of the page. Front matter is accessible in
templates, so **you can control your layout from the front matter**, implicitly
by setting specific variables or explicitly by changing the layout and type of
the page directly. I use my front matter to specify extra CSS and Javascript
files to include, for example.

### TOML, YAML, or JSON?

Front matter can be written in [TOML], [YAML], or [JSON]. Short answer: **use
TOML.**

JSON requires a lot of unnecessary quotes and commas that I don’t like. Parsing
JSON is also [a “minefield”][json parser comparison], which means writing it is
as well. YAML is, quite deceptively, [incredibly complex] and prone to strange
[“gotchas”][yaml gotchas].

In contrast, [TOML]’s simple and strict specification makes it well suited to
easy and unambiguous writing, at the expense of a couple of quotation marks ---
but you won’t be constantly wondering if your string keys accidentally use a
reserved character, silently breaking your data like YAML does. For these
reasons I suggest using TOML.

## Markdown rendering

Hugo renders Markdown to HTML with [Blackfriday]. I… think that Blackfriday is
based off of the [Commonmark spec], but I’m not 100% sure. Blackfriday’s docs
are essentially nonexistent, which is unfortunate. Blackfriday additionally has
a bunch of [extensions][bf exts] for things like smart quotes and tables, which
can be [enabled or disabled within Hugo][hugo bf exts].

# Layouts

Layouts are HTML templates. The documentation here, [from Hugo][hugo template
docs] and [from Go proper][go template docs], is sparse at best as well.
(Noticing a pattern?) Templates are used to factor out common code to avoid
repetition and make changing your website as easy as possible in the future.

## The layout process

The location of content within `content` (i.e. its directories and filename) as
well as its [front matter](#front-matter) determine what layout is used,
according to a [fairly arcane lookup order][hugo lookup order] (some people find
[this guide][forum lookup order] on the Hugo forums to be useful).

To make matters worse, templates implicitly rely on each other as well; all
templates are populated with other templates from a [`baseof`] template, which
can be overridden in other templates.

Lets start with a simple example, an [about](/about) page. We would start by
creating a file `content/about.md`, which will be rendered to
`public/about/index.html` and accessible as something like
`your-website.com/about` in the finished product.

### Lookup order

Template lookup order is difficult --- see [previous](#the-layout-process) ---
but fairly simple. **Lookup order depends almost entirely on a page’s *kind* and
*type.***

**Kind** is more general than type. Kind will be either `single` for one-off
pages that are more-or-less unrelated to the website’s other pages --- like our
about page --- or `list` for pages that are a *list* of things. List pages
aren’t actually that important, except that **`_index.md` (which is rendered to
a directory’s index) is a list page, and if you don’t have a list template it
will be blank.**

**Type** is `page` or the top-level directory of the page within the `content`
directory. i.e. a file `content/unicode/fun-facts.md` would have a type of
`unicode` but `content/fun-facts.md` would have a type of `page`.

Both type and kind can be overridden in the front matter.

In the simple case, Hugo will try to look up a layout in:

* `layouts/{type}/{filename}.html`
* `layouts/{type}/{kind}.html`
* `layouts/_default/{type}.html`
* `layouts/_default/{kind}.html`

Or maybe other places along the way. I’m not sure, to be frank, and [improving
understanding in this area is a work in progress.][actual lookup order]

The most-default template is `layouts/_default/single.html`, but you should also
have `layouts/_default/list.html` for those pesky list pages such as the index.

### Building blocks

Templates are a bit more than just plain HTML. In particular, they are built
with [partial templates], mostly-constant chunks of HTML you use frequently,
like your website’s header and its meta tags. Partials can rely on your front
matter so they can adapt to cases like all the HTML before your content or just
your meta tags.

[Shortcode templates] are more dynamic than partial templates and more closely
resemble the functional model of a template that takes some input and returns
some value dependent on that input, but for the moment they’re only available in
content pages (i.e. Markdown files) and not templates (HTML files). Shortcodes
are useful for cases like embedding a Youtube video. I’d love to use shortcodes
for cases like including a CSS file, but again, they’re not available in
templates.

[Base templates][`baseof`] allow you to set [internal templates], which are
shared within an individual template render. The idea here is that you set 

## Data templates

Data templates allow you to create structured pages from data rather than
markdown. I use data templates to render a list of [my contact information]
together with [a unique template][contact template] and [a stub markdown
file][content.md] to my [contact] page.

# Deploying

To-do:

* Using Git webhooks and Caddy.
* Using Travis.
* Rendering SASS and other assets.

[Hugo]: https://gohugo.io/
[hugo docs]: https://gohugo.io/documentation/
[Hugo sandbox]: https://hugo-sandbox.netlify.com/
[sandbox src]: https://gitlab.com/kaushalmodi/hugo-sandbox
[Hugo example blog]: https://github.com/gohugoio/hugo/tree/master/examples/blog
[hit me up]: /contact
[contact]: /contact
[this guide on GitHub]: https://github.com/9999years/becca.ooo/blob/master/content/hugo.md
[Unicode]: /unicode/index
[hints at in the preface]: https://intronetworks.cs.luc.edu/current/html/preface.html#classroom-use
[*An Introduction To Computer Networks*]: http://intronetworks.cs.luc.edu/
[DRY]: https://en.m.wikipedia.org/wiki/Don%27t_repeat_yourself
[Blackfriday]: https://github.com/russross/blackfriday
[Commonmark spec]: https://spec.commonmark.org/
[bf exts]: https://github.com/russross/blackfriday#extensions
[hugo bf exts]: https://gohugo.io/content-management/formats
[more directories]: https://gohugo.io/getting-started/directory-structure/#directory-structure-explained
[hugo template docs]: https://gohugo.io/templates/introduction/
[go template docs]: https://golang.org/pkg/html/template/
[Front matter]: https://gohugo.io/content-management/front-matter/
[HTML]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML
[Markdown]: http://commonmark.org/help/
[CSS]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics
[TOML]: https://github.com/toml-lang/toml
[YAML]: http://camel.readthedocs.io/en/latest/yamlref.html
[JSON]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON#No_really_what_is_JSON
[incredibly complex]: https://docs.saltstack.com/en/2017.7/topics/troubleshooting/yaml_idiosyncrasies.html
[yaml gotchas]: http://blog.teamlazerbeez.com/2009/04/15/yaml-gotchas/
[json parser comparison]: http://seriot.ch/json/parsing.html#all_results
[hugo lookup order]: https://gohugo.io/templates/lookup-order/
[forum lookup order]: https://discourse.gohugo.io/t/my-experiences-with-hugos-template-lookup-order/9959
[`baseof`]: https://gohugo.io/templates/base/
[my contact information]: https://github.com/9999years/becca.ooo/blob/master/data/contact.toml
[contact template]: https://github.com/9999years/becca.ooo/blob/master/layouts/page/contact.html
[content.md]: https://github.com/9999years/becca.ooo/blob/master/content/contact.md
[actual lookup order]: https://discourse.gohugo.io/t/preview-actual-template-lookup-order/11443/2
[partial templates]: https://gohugo.io/templates/partials/
[Shortcode templates]: https://gohugo.io/templates/shortcode-templates/
[internal templates]: https://gohugo.io/templates/internal/
