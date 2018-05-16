+++
title="url editor"
description="a live, interactive tool for editing urls and their parameters"
js=["url-editor"]
css=["url-editor", "unicode/tools"]

[blackfriday]
extensionsmask=["autolink"]
+++

a live, interactive tool for editing urls and their parameters. working beta

url input:
<textarea id="url_in">
https://www.amazon.com/Cutter-Stripper-Stranded-Klein-Tools/dp/B00080DPNQ/ref=sr_1_6?s=power-hand-tools&ie=UTF8&qid=1526426148&sr=1-6&keywords=wire+strippers
</textarea>

<div id="url_out"></div>

<noscript>nothing will happen without javascript</noscript>

# help

* you can edit all fields in boxes and your changes will update in the url
  input box
* you can click the × to delete a parameter or element of the path from the url
* it needs a browser from about 2016 or later to work because of some
  javascript stuff

# to-do

* add functionality to add components to the path and parameters
