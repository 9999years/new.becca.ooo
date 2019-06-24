import { $ }  from "./fake"

window.addEventListener('load', e => {
    ($("reel-vid") as HTMLMediaElement).addEventListener('click', function(e) {
        if(this.paused) {
            this.play()
        } else {
            this.pause()
        }
    })
})
