import { h, $ } from "./fake"

function emblaceTOC(e: UIEvent) {
    const dest = $("toc-dest")
    const toc = $("toc")
    if (dest === null || toc === null) {
        return
    }
    dest.appendChild(toc)
}

document.addEventListener("DOMContentLoaded", emblaceTOC as () => void)
