import { $ as id, bind } from "./common"
import $ from 'jquery'
import jCanvas from 'jcanvas'

var canvas
var canvas_j
var context
var width
var height
var incidentAngle = 0
var refractedAngle = 0
var nsubi = 1
var nsubr = 2
var textRadius = 120
var aboutShown = false

/*var refractiveIndicies = {
  "Vacuum": 1,
  "Air": 1.0003,
  "Water": 1.333,
  "Ethanol": 1.361,
  "Diamond": 2.419,
  "Amber": 1.55,
  "Ice": 1.31,
  "Acetone": 1.36,
  "Glycerol": 1.4729,
  "Bromine": 1.661,
  "Acrylic glass": 1.491,
  "Kerosene": 1.39,
  "Crown glass": 1.52,
  "Flint glass": 1.61,
  "Pyrex": 1.47,
  "Rock salt": 1.516,
  "Sapphire": 1.764,
  "Cubic zirconia": 2.17,
  "Potassium niobate": 2.28,
  "Silicon carbide": 2.67,
  "Cinnabar (Mercury sulfide)": 3.02,
  "Gallium(III) phosphide": 3.5,
  "Gallium(III) arsenide": 3.927,
  "Zinc Oxide": 2.4,
  "Germanium": 4.03,
  "Silicon": 3.45,
  "Unknown I": 1.223,
  "Unknown II": 1.67,
  "Unknown III": 3.441,
  "Unknown IV": 2.414,
  "Unknown V": 1.798
  };*/

window.addEventListener('load', e => {
    jCanvas($, window)
    canvas = id("main_canvas")
    canvas_j = $("#main_canvas")

    context = canvas.getContext("2d")
    context.canvas.width = width = canvas.clientWidth
    context.canvas.height = height = canvas.clientHeight
    run()
    updateRay()

    canvas_j.dblclick(function(e) {
        canvas_j.setLayer('dragCircle', {x: e.offsetX, y: e.offsetY})
        updateRay()
    })

    window.addEventListener('resize', e => {
        context.canvas.width = width = canvas.clientWidth
        context.canvas.height = height = canvas.clientHeight
        textRadius = height < 330 ? height/4 : 120
        canvas_j.setLayer('boundryLine', {
            y1: Math.round(height / 2) + 0.5,
            y2: Math.round(height / 2) + 0.5,
            x2: width
        }).setLayer('ray', {
            x2: width / 2,
            y2: Math.round(height / 2) + 0.5
        }).setLayer('reflectedRay', {
            x1: width / 2,
            y1: Math.round(height / 2) + 0.5
        }).setLayer('incidentArc', {
            x:width/2,
            y:Math.round(height/2)+0.5,
            radius: height < 400 ? height/4 : 100
        }).setLayer('refractedArc', {
            x:width/2,
            y:Math.round(height/2)+0.5,
            radius: height < 400 ? height/4 : 100
        }).setLayer('normal',{
            x1: Math.round(width/2)+0.5, y1: height/4,
            x2: Math.round(width/2)+0.5, y2: 3*height/4})
        updateRay()
        canvas_j.drawLayers()
    })
})

function updateRay() {
    var circle = canvas_j.getLayer('dragCircle')
    if(circle === undefined) {
        return
    }
    const nsubi = id('nsubi')
    const nsubr = id('nsubr')
    const nsubiContainer = id('nsubiContainer')
    const nsubrContainer = id('nsubrContainer')
    if(circle.y > height/2) {
        nsubiContainer.classList.remove("top")
        nsubiContainer.classList.add("bottom")
        nsubrContainer.classList.remove("bottom")
        nsubrContainer.classList.add("top")
    } else {
        nsubiContainer.classList.remove("bottom")
        nsubiContainer.classList.add("top")
        nsubrContainer.classList.remove("top")
        nsubrContainer.classList.add("bottom")
    }
    incidentAngle = Math.atan((circle.x - width / 2) / (circle.y - height / 2))
    var adjacent = height / 2
    var opposite = height * Math.tan(incidentAngle) / 2
    if (opposite > width / 2) {
        opposite = width / 2
        adjacent = width / (2 * Math.tan(incidentAngle))
    }
    if (circle.y < height / 2) {
        adjacent *= -1
        opposite *= -1
    }
    id('incidentAngleLabel').innerHTML = Math.abs(Math.round(incidentAngle * (180 / Math.PI) * 100) / 100) + "&#176;"
    canvas_j.setLayer('ray', {
        x1: width / 2 + opposite,
        y1: height / 2 + adjacent
    })
    canvas_j.setLayer('reflectedRay', {
        x2: width / 2 - opposite,
        y2: height / 2 + adjacent
    })
    const incidentIndex = +nsubi.value
    const refractedIndex = +nsubr.value
    refractedAngle = Math.asin((incidentIndex * Math.sin(incidentAngle)) / refractedIndex)
    if (circle.y > height / 2) {
        refractedAngle = Math.asin((refractedIndex * Math.sin(incidentAngle)) / incidentIndex)
    }
    adjacent = height / 2
    opposite = height * Math.tan(refractedAngle) / 2
    if (opposite > width / 2) {
        opposite = width / 2
        adjacent = width / (2 * Math.tan(refractedAngle))
    }
    if (circle.y > height / 2) {
        adjacent *= -1
        opposite *= -1
    }
    canvas_j.setLayer('ray', {
        x3: width / 2 + opposite,
        y3: height / 2 + adjacent
    }).drawLayers()
    if (isNaN(refractedAngle)) {
        refractedAngle = "TIR"
        canvas_j.setLayer('reflectedRay', {
            strokeStyle: 'rgba(255,0,0,1)'
        })
    } else {
        canvas_j.setLayer('reflectedRay', {
            strokeStyle: 'rgba(255,0,0,0.4)'
        })
    }
    var incidentArcStart = 0
    var incidentArcEnd = 0
    var refractedArcStart = 0
    var refractedArcEnd = 0
    var incidentAngleArc = Math.abs((incidentAngle * (180 / Math.PI))%180)
    var refractedAngleArc = Math.abs((refractedAngle * (180 / Math.PI))%180)
    if(circle.x > width/2 && circle.y < height/2) { //quadrant 1
        incidentArcStart = incidentAngleArc
        incidentArcEnd = 0
        refractedArcStart = refractedAngleArc+180
        refractedArcEnd = 180
    } else if(circle.x > width/2 && circle.y > height/2) { //quadrant 2
        incidentArcStart = 180
        incidentArcEnd = -incidentAngleArc+180
        refractedArcStart = 0
        refractedArcEnd = -refractedAngleArc
    } else if(circle.x < width/2 && circle.y > height/2) { //quadrant 3
        incidentArcStart = incidentAngleArc+180
        incidentArcEnd = 180
        refractedArcStart = refractedAngleArc
        refractedArcEnd = 0
    } else if(circle.x < width/2 && circle.y < height/2){ //quadrant 4
        incidentArcStart = 0
        incidentArcEnd = -incidentAngleArc
        refractedArcStart = 180
        refractedArcEnd = -refractedAngleArc+180
    }
    canvas_j.setLayer('incidentArc', {
        start: incidentArcStart,
        end: incidentArcEnd
    }).setLayer('refractedArc', {
        start: refractedArcStart,
        end: refractedArcEnd,
    }).setLayer('incidentAngleText',{
            x:(circle.y > height/2 ? 1 : -1)*Math.sin(incidentAngle/2)*textRadius+width/2,
            y:(circle.y > height/2 ? 1 : -1)*Math.cos(incidentAngle/2)*textRadius+height/2,
        text: "\u03f4\u1d62 = " + Math.abs(Math.round(incidentAngle * (180 / Math.PI) * 100) / 100) + "\u00B0"
    }).setLayer('refractedAngleText',{
            x:(circle.y > height/2 ? -1 : 1)*Math.sin(refractedAngle/2)*textRadius+width/2,
            y:(circle.y > height/2 ? -1 : 1)*Math.cos(refractedAngle/2)*textRadius+height/2,
        text: "\u03f4\u1d63 = " + Math.abs(Math.round(refractedAngle * (180 / Math.PI) * 100) / 100) + "\u00B0"
    })
    var refractedAngleArc = Math.abs((refractedAngle * (180 / Math.PI))%180)
    if(!isNaN(refractedAngle)) {
        id('refractedAngleLabel').innerHTML = Math.abs(Math.round(refractedAngle * (180 / Math.PI) * 100) / 100) + "&#176;"
    } else {
        id('refractedAngleLabel').innerHTML = "TIR"
    }
}

export function run() {
    canvas_j.addLayer({
        name: 'boundryLine',
        layer: true,
        strokeStyle: '#000',
        type: 'line',
        x1: 0,
        y1: Math.round(height / 2) + 0.5,
        x2: width,
        y2: Math.round(height / 2) + 0.5,
    }).addLayer({
        name: 'normal',
        layer: true,
        strokeDash: [5],
        strokeStyle: 'rgba(0,0,0,0.4)',
        type: 'line',
        x1: Math.round(width/2)+0.5, y1: height/4,
        x2: Math.round(width/2)+0.5, y2: 3*height/4,
    }).addLayer({
        name: 'ray',
        layer: true,
        strokeStyle: "rgba(255,0,0,1)",
        type: 'line',
        x1: 0,
        y1: 0,
        x2: width / 2,
        y2: Math.round(height / 2) + 0.5,
        x3: width,
        y3: width,
    }).addLayer({
        name: 'reflectedRay',
        layer: true,
        strokeStyle: 'rgba(255,0,0,0.5)',
        type: 'line',
        x1: width / 2,
        y1: Math.round(height / 2) + 0.5,
        x2: width,
        y2: 0,
    }).addLayer({
        name: 'incidentArc',
        ccw: true,
        end: 0,
        layer: true,
        radius: height < 400 ? height/4 : 100,
        start: 0,
        strokeStyle: 'rgba(255,0,0,0.5)',
        type: 'arc',
        x: width / 2,
        y: Math.round(height / 2) + 0.5,
    }).addLayer({
        name: 'refractedArc',
        ccw: true,
        end: 0,
        layer: true,
        radius: height < 400 ? height/4 : 100,
        start: 0,
        strokeStyle: 'rgba(0,0,255,0.5)',
        type: 'arc',
        x: width / 2,
        y: Math.round(height / 2) + 0.5,
    }).addLayer({
        name: 'incidentAngleText',
        fillStyle: 'rgba(255,0,0,1)',
        fontFamily:'sans-serif',
        fontSize: 12,
        layer: true,
        text:'48.62',
        type: 'text',
        x: width/2, y: height/2,
    }).addLayer({
        name: 'refractedAngleText',
        fillStyle: 'rgba(0,0,255,1)',
        fontFamily:'sans-serif',
        fontSize: 12,
        layer: true,
        text:'17.84',
        type: 'text',
        x: width/2, y: height/2,
    }).addLayer({
        name: 'dragCircle',
        drag: updateRay,
        draggable: true,
        layer: true,
        strokeStyle: '#000',
        type: 'ellipse',
        width: 50,
        height: 50,
        x: width / 3,
        y: height / 4,
        mouseover: function(layer) {
            canvas.style.cursor = 'pointer'
        },
    }).drawLayers()
    updateRay()
}
bind(id("nsubi"), ["change", "keyup", "input"], function() {
    id('selectnsubi').value = id('nsubiRange').value = this.value
    updateRay()
})

bind(id("nsubiRange"), ["change", "keyup", "input"], function() {
    id('selectnsubi').value = id('nsubi').value = this.value
    updateRay()
})

bind(id("selectnsubi"), ["change", "keyup", "input"], function() {
    if($("selectnsubi option:selected").text().substr(0,7) == "Unknown") {
        $('nsubi').val("?")
        $('nsubiRange').val(1)
        updateRay()
        return
    }
    $('nsubi').val($(this).val())
    $('nsubiRange').val($(this).val())
    updateRay()
})

bind(id("nsubr"), ["change", "keyup", "input"], function() {
    $('nsubrRange').val($(this).val())
    $('selectnsubr').val($(this).val())
    updateRay()
})

bind(id("nsubrRange"), ["change", "keyup", "input"], function() {
    $('nsubr').val($(this).val())
    $('selectnsubr').val($(this).val())
    updateRay()
})

bind(id("selectnsubr"), ["change", "keyup", "input"], function() {
    if($("selectnsubr option:selected").text().substr(0,7) == "Unknown") {
        $('nsubr').val("?")
        $('nsubrRange').val(1)
        updateRay()
        return
    }
    $('nsubr').val($(this).val())
    $('nsubrRange').val($(this).val())
    updateRay()
})
