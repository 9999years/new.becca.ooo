var replacements = {
    "hPa":"\u3371" //cjk compatibility
    ,"da":"\u3372"
    ,"AU":"\u3373"
    ,"bar":"\u3374"
    ,"oV":"\u3375"
    ,"pc":"\u3376"
    ,"dm":"\u3377"
    ,"IU":"\u337a"
    ,"lU":"\l337a"
    ,"pA":"\u3380"
    ,"nA":"\u3381"
    ,"\u03bcA":"\u3382" //mu + A
    ,"mA":"\u3383"
    ,"kA":"\u3384"
    ,"KB":"\u3385"
    ,"MB":"\u3386"
    ,"GB":"\u3387"
    ,"cal":"\u3388" //this one is kind of cursive so Ok
    ,"kcal":"\u3389"
    ,"pF":"\u338a"
    ,"nF":"\u338b"
    ,"\u03bcF":"\u338c"
    ,"\u03bcg":"\u338d"
    ,"mg":"\u338e"
    ,"kg":"\u338f"
    ,"Hz":"\u3390"
    ,"kHz":"\u3391"
    ,"MHz":"\u3392"
    ,"GHz":"\u3393"
    ,"THz":"\u3394"
    ,"\u03bcl":"\u3395"
    ,"ml":"\u3396"
    ,"dl":"\u3397"
    ,"kl":"\u3398"
    ,"fm":"\u3399"
    ,"nm":"\u339a"
    ,"\u03bcm":"\u339b"
    ,"mm":"\u339c"
    ,"cm":"\u339d"
    ,"km":"\u339e"
    ,"Pa":"\u33a9"
    ,"kPa":"\u33aa"
    ,"MPa":"\u33ab"
    ,"GPa":"\u33ac"
    ,"rad":"\u33ad"
    ,"ps":"\u33b0"
    ,"ns":"\u33b1"
    ,"\u03bcs":"\u33b2"
    ,"ms":"\u33b3"
    ,"pV":"\u33b4"
    ,"nV":"\u3385"
    ,"\u03bcV":"\u33b6"
    ,"mV":"\u33b7"
    ,"kV":"\u33b8"
    ,"MV":"\u33b9"
    ,"pW":"\u33ba"
    ,"nW":"\u33bb"
    ,"\u03bcW":"\u33bc"
    ,"mW":"\u33bd"
    ,"kW":"\u33be"
    ,"MW":"\u33bf"
    ,"k\u2126":"\u33c0" //ohm
    ,"M\u2126":"\u33c1"
    ,"a.m.":"\u33c2"
    ,"Bq":"\u33c3"
    ,"cc":"\u33c4"
    ,"cd":"\u33c5"
    ,"Co.":"\u33c7"
    ,"dB":"\u33c8"
    ,"Gy":"\u33c9"
    ,"ha":"\u33ca"
    ,"HP":"\u33cb"
    ,"in":"\u33cc"
    ,"K.K.":"\u33cd"
    ,"KM":"\u33ce"
    ,"kt":"\u33cf"
    ,"lm":"\u33d0"
    ,"ln":"\u33d1"
    ,"log":"\u33d2"
    ,"lx":"\u33d3"
    ,"mb":"\u33d4"
    ,"mil":"\u33d5"
    ,"mol":"\u33d6"
    ,"pH":"\u33d7"
    ,"p.m.":"\u33d8"
    ,"PPM":"\u33d9"
    ,"PR":"\u33da"
    ,"sr":"\u33db"
    ,"Sv":"\u33dc"
    ,"Wb":"\u33dd"
    ,"gal":"\u33ff"
    ,"PTE":"\u3250" //enclosed cjk letters and months
    ,"AA":"\ua732" //ligatures
    //,"aa":"\ua733" //im gonna comment out a bunch of european ones
    //,"AE":"\u00c6" //they look too weird in regular text
    //,"ae":"\u00e6"
    //,"AO":"\ua734"
    //,"ao":"\ua735"
    //,"AU":"\u1736"
    //,"au":"\ua737"
    //,"AV":"\u1738"
    //,"av":"\ua739"
    //,"Ay":"\ua73c"
    //,"ay":"\ua73d"
    ,"ffi":"\ufb03"
    ,"ffl":"\ufb04"
    ,"DZ":"\u01f1"
    ,"Dz":"\u01f2"
    ,"dz":"\u01f3"
    ,"ff":"\ufb00"
    ,"fi":"\ufb01"
    ,"fl":"\ufb02"
    ,"ffi":"\ufb03"
    ,"ffl":"\ufb04"
    ,"IJ":"\u0132"
    ,"ij":"\u0133"
    ,"LJ":"\u01c7"
    ,"Lj":"\u01c8"
    ,"lj":"\u01c9"
    ,"NJ":"\u01ca"
    ,"Nj":"\u01cb"
    ,"nj":"\u01cc"
    //,"OE":"\u0152"
    //,"oe":"\u0153"
    ,"oo":"\ua74f"
    ,"ft":"\ufb05"
    ,"ue":"\u1d6b"
    ,"VY":"\ua760"
    ,"vy":"\u1761"
    //,"D.S.":"\u1d109" //music notation block, not really supported right now
    //,"D.C.":"\u1d10a"
    ,"DJ":"\ud83c\udd90" //enclosed alphanumeric supplement
    ,"0.":"\ud83c\udd00" //surrogate pairs! fuck!
    ,"0,":"\ud83c\udd01"
    ,"1,":"\ud83c\udd02"
    ,"2,":"\ud83c\udd03"
    ,"3,":"\ud83c\udd04"
    ,"4,":"\ud83c\udd05"
    ,"5,":"\ud83c\udd06"
    ,"6,":"\ud83c\udd07"
    ,"7,":"\ud83c\udd08"
    ,"8,":"\ud83c\udd09"
    ,"9,":"\ud83c\udd0a"
    ,"II":"\u2161" //number forms
    ,"ll":"\u2161" //these "I"s will double as "l"s (except in serif fonts lol)
    ,"Il":"\u2161"
    ,"lI":"\u2161"
    ,"III":"\u2162"
    ,"lll":"\u2162"
    ,"IIl":"\u2162"
    ,"Ill":"\u2162"
    ,"llI":"\u2162"
    ,"IlI":"\u2162"
    ,"lIl":"\u2162"
    ,"IV":"\u2163"
    ,"lV":"\u2163"
    ,"VII":"\u2166"
    ,"VIl":"\u2166"
    ,"VlI":"\u2166"
    ,"Vll":"\u2166"
    ,"VIII":"\u2167"
    ,"Vlll":"\u2167"
    ,"VIIl":"\u2167"
    ,"VIll":"\u2167"
    ,"VllI":"\u2167"
    ,"VIlI":"\u2167"
    ,"VlIl":"\u2167"
    ,"IX":"\u2168"
    ,"lX":"\u2168"
    ,"XI":"\u2169"
    ,"Xl":"\u2169"
    ,"XII":"\u216b"
    ,"XIl":"\u216b"
    ,"XlI":"\u216b"
    ,"Xll":"\u216b"
    ,"ii":"\u2171"
    ,"iii":"\u2172"
    ,"iv":"\u2173"
    ,"vi":"\u2175"
    ,"vii":"\u2176"
    ,"viii":"\u2177"
    ,"ix":"\u2178"
    ,"xi":"\u217a"
    ,"xii":"\u217b"
    ,"...":"\u2026"
}

let $                  = id => document.getElementById(id)
let textIn             = $("in")
let textOut            = $("out")
let textRatio          = $("compression_ratio")
let charsIn            = $("chars_in")
let charsOut           = $("chars_out")

let textFiltered       = ""
let textRaw            = ""
let compressionRatio   = 1

let regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g

//this function is from here
// https://mathiasbynens.be/notes/javascript-unicode
//(thanks mathias)
// replace every surrogate pair with a bmp symbol to acct for 5 or 6 byte
// unicode symbols
// then get the length
let symbols = s => s.replace(regexAstralSymbols, '.').length

// function to select text when the text boxes are clicked
// browsers are weird about this (it doesnt work w/o a delay)
// can you believe there's a function containing 'exec' that isn't a huge
// security hole?
let selectAll = () => window.setTimeout(
    () => document.execCommand("selectAll", false, null), 1)

//takes a string and an object with pairs to replace
function filter(text, pairs) {
    var result = []
    var i = 0

    // if the next delta characters exist in `pairs`, replace them in
    // `replace`
    // i actually considered putting this whole thing in a ternery, lol
    // i really tried to not put those braces in too smh
    let repl = delta => {
        const replace_with = pairs[text.substring(i, i + delta)]
        if(replace_with) {
            result.push(replace_with)
        }
        return replace_with !== undefined
    }


    for(i = 0; i < text.length; i++) {
        var made_replacement = false
        // if the current n chars exist as a pair, replace
        for(n = 4; n > 1; n--) {
            if(repl(n)) {
                made_replacement = true
                // - 1 to counteract the i++ in the for()
                i += n - 1
                break
            }
        }

        if(!made_replacement && n == 1) {
            // we didn't replace anything; add the current char
            // plain
            result.push(text[i])
        }
    }

    return result.join("")
}


// when text is input (covers pastes as well as keys)
textIn.addEventListener("input", function(e) {
    // refresh textFiltered and output
    let textRaw = textIn.value
    textOut.value = textFiltered = filter(textRaw, replacements)
    textRatio.innerHTML = compressionRatio
        = Math.round(
            (symbols(textRaw) / symbols(textFiltered))
            * 1000
            ) / 1000
    // output comp. ratio and add the stats
    textRatio.innerHTML += ":1, "
        + (symbols(textRaw)
            - symbols(textFiltered))
        + " characters saved"
    // update character counters
    charsIn.innerHTML  = symbols(textRaw)
    charsOut.innerHTML = symbols(textFiltered)
}, false)

// select all text when focused
textIn.addEventListener("focus", selectAll, false)
textOut.addEventListener("focus", selectAll, false)
