---
title: url editor
description: a live, interactive tool for editing urls and their parameters
extra_js:
   - url-editor.bundle
extra_css:
   - url-editor
   - unicode/tools
---

a live, interactive tool for editing urls and their parameters. working beta

{% raw %}
url input:
<textarea id=url_in>https://www.amazon.com/Cutter-Stripper-Stranded-Klein-Tools/dp/B00080DPNQ/ref=sr_1_6?s=power-hand-tools&ie=UTF8&qid=1526426148&sr=1-6&keywords=wire+strippers</textarea>
{% endraw %}

<div id=url_out></div>

<noscript>nothing will happen without javascript</noscript>

# help

* you can edit all fields in boxes and your changes will update in the url
  input box
* you can click the × to delete a parameter or element of the path from the url
* it needs a browser from about 2016 or later

# to-do

* renaming a parameter *key* moves it to the end of the parameters in the url.
  i’m not sure how to prevent this and also vaguely aware that some apps will
  create de-facto lists in the parameters by specifying a key multiple times, so
  this could fuck that. no clue though
* an undo button would be useful
  * but hard to add, esp. because this app is really stateless; every time the
    url is changed the whole ui is reconstructed, which makes writing it less
    error-prone, hopefully

[query string]: https://en.wikipedia.org/wiki/Query_string
