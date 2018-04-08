+++
title="abbreviate"
description="save characters in Tweets in dubiously useful ways"
js=["../unicode/js/abbreviate"]
css=["abbreviate"]
+++

Type here: <span id="chars_in">60</span> chars

<textarea id="in">
gallantly she rode on, looking rad as hell in her new shoes
</textarea>

Results here: <span id="chars_out">52</span> chars

<textarea id="out" readonly>
㏿lantly she rode on, lꝏk㏌g ㎭ as heⅡ ㏌ her new shoes
</textarea>

Compression ratio: <span id="compression_ratio">1.154:1, 8 characters
saved</span>

{{< rule >}}

Created by [rebecca turner](/) with help from [@FakeUnicode]

[Unicode] (a format for encoding characters) contains thousands of superfluous
and unnecessary characters, almost 200 of which represent multiple Latin
characters together (that I’ve found, that is --- there are probably others). By
swapping out multiple characters in the input with the singular characters from
Unicode, we can create a text with a lower overall character count, which you
can then use to tweet longer (the consequence of doing this is that your tweets
will look a little bit like a ransom note).

On average, you’ll see savings of around 4--9%, which means around 5--12 extra
characters per tweet. If you’re tweeting nothing but “a.m.” and “p.m.” you’ll
see savings of 400% (I don’t know why you would want to do that).

[Unicode]: https://en.wikipedia.org/wiki/Unicode
[@FakeUnicode]: https://twitter.com/FakeUnicode
