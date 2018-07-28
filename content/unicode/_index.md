+++
title="Unicode Resources"
css=["unicode/unicode"]
url="unicode"
+++

Created by [rebecca] with major help from [@FakeUnicode]

{{< rule >}}

[Unicode] is a standard “registry” of characters designed to catalogue all the
world’s writing systems and serve as a superset of all previously-existing
character sets used and supported by [just about everyone] and [all their
software]. [Get into the details on Stack Overflow] or see some of the [Unicode
encodings] on Wikipedia.

# Table of Contents

* [Charts and character data](#charts-and-character-data)
* [String analysis](#string-analysis)
* [Search](#search)
* [Shape recognition](#shape-recognition)
* [Conversion (programming)](#conversion-programming)
* [Conversion (decorative or linguistic)](#conversion-decorative-or-linguistic)
* [Coverage: fonts & support](#coverage-fonts-support)
* [Emoji](#emoji)
* [ASCII/Unicode art & Kaomoji](#ascii-unicode-art-kaomoji)
* [Inserting characters](#inserting-characters)
* [Misc.](#misc)

# Charts and character data

{{< bullet >}} [PDF charts on unicode.org] --- The only complete and perpetually
up-to-date reference.

{{< bullet >}} [List of Unicode blocks on Wikipedia] --- Also available as a
[TXT file on unicode.org]

[UNIDATA on unicode.org] --- "This directory contains the final data
files for the Unicode Character Database, for Version 8.0.0 of the
Unicode Standard."

[CopyPasteCharacter] --- Contains a bunch of common characters for easy
copying.

[Proposed new characters on unicode.org]

[Xah Lee's Unicode gallery] --- Includes a search engine, various
categorical galleries, and discussion.

[Variants on unicode.org] --- A list of variant ligatures for using
alternate forms.

[Unicode planes reference] --- Confused about what "BMP" means? Check
here.

# String analysis

{{< bullet >}} [Unicode Inspector] --- By [@timwhitlock], displays the
codepoint, byte breakdown, block, symbol, name, and surrogates for each
character in a string.

[Scarfboy search and string analysis]

[Understanding UTF-8 on jsfiddle] --- By [@FakeUnicode] on Twitter.
Displays binary/hex breakdown of strings of text.

[What Unicode character is this?] --- By [BabelStone].

# Search

[Scarfboy search and string analysis]

[codepoints.net] --- Powerful search engine with previews in Unifont

[&what;]

[FileFormat.info]

[charcod.es]

# Shape recognition

{{< bullet >}} [shapecatcher] --- Recognizes Unicode characters through a
drawing field.

[Kanji search on jisho.org] --- Find kanji characters by their parts.

[Handwritten kanji recognition] --- Like [shapecatcher] for kanji.

[Google Translate] --- Click the pencil icon in the input area to enable
shape recognition. Great for writing short bits of text in a language you don’t
know.

[Mouse input for Chinese characters]

# Conversion (programming)

{{< bullet >}} [Xem's EscApe utility on Github] --- By [Maxime Euzière].
Converts any Unicode string to 33 different escape sequences. New: [v2 beta]!

[ASCII Xlate] --- Converts plain ASCII, binary, octal, hex, base32,
base64, ASCII85, and decimal ASCII. Also calculates various hashes!

[Guide to converting to UTF-8 in vasious programming languages]

# Conversion (decorative or linguistic)

{{< bullet >}} [Unicate] --- Aconverts to various latin Unicode alphabets (e.g.
fullwidth, math scripts, etc.).

[Text converter on qaz.wtf] --- Similar to the above.

{{< bullet >}} [Zalgo generator on eeemo.net] --- generates Zalgo text.

[Convert Text on the Chrome web store] --- Converts the case of text as
a Chrome extension. Includes Zalgo generator and fullwidth transform.

[Strikethrough converter] --- By [Adam Varga].

[Emojify text on jsfiddle] --- By [@FakeUnicode] on Twitter. Transforms
text to emoji.

[Acrostic generator on 9999yea.rs] --- Dubiously useful. Also converts
to Unicode Math Monospace.

[Abbreviator on 9999yea.rs] --- Saves characters in tweets by using
precomposed characters.

[Unitools] --- A good compilation of a bunch of other tools. Honorary
mention.

[Nepali converter]

[Braille converter]

# Coverage: fonts & support

{{< bullet >}} [Alan Wood's Unicode font list] --- Probably the most complete
list of high-coverage fonts.

{{< bullet >}} [PragmataPro] --- A monospaced programming font with 6,000 glyphs
(and rising).

{{< bullet >}} [CharacterMap] --- Analyzes glyphs from font files.

[Google Noto Fonts] --- A set of sans and serif fonts supporting 581
languages (as of April 2016), with about 50% glyph coverage.

[Unicode fonts by writing system]

[Preview of all codepoints in the BMP] --- Useful for testing coverage.

[GNU Unifont]

{{< bullet >}} [Fonts for ancient scripts] --- Symbola 8.00 is available here.

[BabelStone's Han font]

[Everson Mono font]

[Hanazono font]

[Code2000 font]

# Emoji

{{< bullet >}} [Full Emoji Charts] --- all emoji with comparison pictures of
implementations on various platforms.

[Emoji Symbols: Background Data on unicode.org], a.k.a. (L2/09-027) --- Japanese
carrier background data for the original emoji import (mostly historic value).

[List of proposals and their associated codepoints on Wikipedia][emoji_history]

[Possible upcoming emoji on unicode.org]

[List of emoji ZWJ ligatures on unicode.org] --- Note: These are *not*
actually emoji or part of the Unicode standard. Implementation, support,
and blame lies entirely with the third parties involved.

[Text vs Emoji reference on unicode.org] --- Shows which characters
(should) render as emoji or text.

# ASCII/Unicode art & Kaomoji

{{< bullet >}} [cutekaomoji.com]

[List of 10,000+ kaomoji]

[textfac.es]

[ASCII art collection on chris.com]

[ASCII art on asciiworld.com]

[ASCII text art generator]

# Inserting characters

[Vim] --- Insert mode: `<C-v>uxxxx`

[Emacs] --- `<C-X> 8 <CR> xxxx <CR>`

[Mac OS X] --- (☑︎ Unicode Hex Input) `<⌥-xxxx>`

[Windows] --- (☑︎ Registry Key) `<A-xxxx>`

[Unix in GTK applications] --- `<C-S-uxxxx>`

# Misc.

{{< bullet >}} [Random Unicode character generator on jsfiddle] --- By
[@FakeUnicode] on Twitter.

[List of Unicode arrows] --- Courtesy of [@fabrizioschiavi] of
[Pragmata Pro][PragmataPro] fame.

[Emoji allowed in Twitter usernames]

[Character/byte counter]

[my unicode toys] --- by rebecca

[rebecca]: /
[@FakeUnicode]: https://twitter.com/FakeUnicode
[Unicode]: https://en.wikipedia.org/wiki/Unicode
[Unicode encodings]: https://en.m.wikipedia.org/wiki/Unicode#Unicode_Transformation_Format_and_Universal_Coded_Character_Set
[just about everyone]: http://www.unicode.org/consortium/members.html
[all their software]: http://www.unicode.org/resources/
[Get into the details on Stack Overflow]: https://stackoverflow.com/questions/2241348/what-is-unicode-utf-8-utf-16
[PDF charts on unicode.org]: http://www.unicode.org/charts/
[List of Unicode blocks on Wikipedia]: https://en.wikipedia.org/wiki/Unicode_block
[TXT file on unicode.org]: http://www.unicode.org/Public/UNIDATA/Blocks.txt
[UNIDATA on unicode.org]: http://www.unicode.org/Public/UNIDATA/
[CopyPasteCharacter]: http://www.copypastecharacter.com/all-characters
[Proposed new characters on unicode.org]: http://unicode.org/alloc/Pipeline.html
[Xah Lee's Unicode gallery]: http://xahlee.info/comp/unicode_index.html
[Variants on unicode.org]: http://unicode.org/Public/UCD/latest/ucd/StandardizedVariants.html
[Unicode planes reference]: https://en.wikipedia.org/wiki/Plane_(Unicode)
[Unicode Inspector]: http://apps.timwhitlock.info/unicode/inspect?s=%F0%9F%92%81u
[@timwhitlock]: https://twitter.com/timwhitlock
[Scarfboy search and string analysis]: http://unicode.scarfboy.com/?s=4a1e
[Understanding UTF-8 on jsfiddle]: https://jsfiddle.net/vrog8Lkf/
[What Unicode character is this?]: http://www.babelstone.co.uk/Unicode/whatisit.html
[BabelStone]: http://www.babelstone.co.uk/
[codepoints.net]: https://codepoints.net/search?q=punctuation
[&what;]: http://www.amp-what.com/unicode/search/
[FileFormat.info]: http://www.fileformat.info/info/unicode/char/search.htm
[charcod.es]: http://charcod.es/
[shapecatcher]: http://shapecatcher.com/
[Kanji search on jisho.org]: http://jisho.org/#radical
[Handwritten kanji recognition]: http://kanji.sljfaq.org/draw-canvas.html
[Google Translate]: https://translate.google.com/
[Mouse input for Chinese characters]: http://www.chinese-tools.com/tools/mouse.html
[Xem's EscApe utility on Github]: https://xem.github.io/escape/
[Maxime Euzière]: https://xem.github.io/
[v2 beta]: https://rawgit.com/xem/escape/v2/index.html
[ASCII Xlate]: https://paulschou.com/tools/xlate/
[Guide to converting to UTF-8 in vasious programming languages]: http://www.unicodetools.com/
[Unicate]: http://mar.cx/unicate/
[Text converter on qaz.wtf]: http://qaz.wtf/u/convert.cgi?text=unicode.9999yea.rs
[Zalgo generator on eeemo.net]: http://eeemo.net/
[Convert Text on the Chrome web store]: https://chrome.google.com/webstore/detail/convert-text/mcpglhjaahelnpjalcaeecgkjhkpokdn
[Strikethrough converter]: http://adamvarga.com/strike/
[Adam Varga]: http://adamvarga.com/
[Emojify text on jsfiddle]: https://jsfiddle.net/xHrxM/13/
[Acrostic generator on 9999yea.rs]: http://u.9999yea.rs/grid/
[Abbreviator on 9999yea.rs]: http://u.9999yea.rs/abbreviate/
[Unitools]: https://www.unicod.es/
[Nepali converter]: http://unicodenepali.com/
[Braille converter]: http://libbraille.org/translator.php?src=unicode.9999yea.rs&table=basic6
[Alan Wood's Unicode font list]: http://www.alanwood.net/unicode/fonts.html
[PragmataPro]: http://www.fsd.it/shop/fonts/pragmatapro/
[CharacterMap]: https://bluejamesbond.github.io/CharacterMap/
[Google Noto Fonts]: https://www.google.com/get/noto/
[Unicode fonts by writing system]: http://www.cheat-sheets.org/sites/font.su/
[Preview of all codepoints in the BMP]: http://www.visibone.com/htmlref/char/cer.htm
[GNU Unifont]: http://unifoundry.com/unifont.html
[Fonts for ancient scripts]: http://users.teilar.gr/~g1951d/
[BabelStone's Han font]: http://www.babelstone.co.uk/Fonts/Han.html
[Everson Mono font]: http://www.evertype.com/emono/
[Hanazono font]: http://fonts.jp/hanazono/
[Code2000 font]: https://en.wikipedia.org/wiki/Code2000
[Full Emoji Charts]: http://unicode.org/emoji/charts/full-emoji-list.html
[Emoji Symbols: Background Data on unicode.org]: https://www.unicode.org/L2/L2009/09027-emoji-backgrnd.pdf
[Possible upcoming emoji on unicode.org]: http://www.unicode.org/emoji/charts/emoji-candidates.html
[List of emoji ZWJ ligatures on unicode.org]: http://www.unicode.org/emoji/charts/emoji-zwj-sequences.html
[Text vs Emoji reference on unicode.org]: http://www.unicode.org/emoji/charts/text-style.html
[cutekaomoji.com]: http://cutekaomoji.com/
[List of 10,000+ kaomoji]: http://japaneseemoticons.me/all-japanese-emoticons/
[textfac.es]: https://textfac.es/
[ASCII art collection on chris.com]: http://www.chris.com/ascii/
[ASCII art on asciiworld.com]: http://www.asciiworld.com/
[ASCII text art generator]: http://patorjk.com/software/taag/#p=display&f=Graffiti&t=unicode.9999yea.rs
[Vim]: http://vim.wikia.com/wiki/Entering_special_characters
[Emacs]: https://superuser.com/questions/394405/how-to-type-a-unicode-character-by-its-number-in-emacs
[Mac OS X]: http://www.poynton.com/notes/misc/mac-unicode-hex-input.html
[Windows]: https://en.wikipedia.org/wiki/Unicode_input#In_Microsoft_Windows
[Unix in GTK applications]: https://en.wikipedia.org/wiki/Unicode_input#In_X11_.28Linux_and_other_Unix_variants.29
[Random Unicode character generator on jsfiddle]: https://jsfiddle.net/SaqVU/4/
[List of Unicode arrows]: /arrows
[@fabrizioschiavi]: https://twitter.com/fabrizioschiavi
[Emoji allowed in Twitter usernames]: http://getemoji.com/#twitter
[Character/byte counter]: https://mothereff.in/byte-counter
[my unicode toys]: index/
[emoji_history]: https://en.wikipedia.org/wiki/Miscellaneous_Symbols_and_Pictographs#History
