import { $ } from "./fake"
import { initialize } from "./fox"

export function listenChange(target, handler) {
    target.addEventListener("change", handler, false)
    target.addEventListener("input", handler, false)
}

export function linkRange(id, setter, reinitialize = true) {
    const target = $(id)
    const targetRange = $(id + "Range")
    const handler = v => {
        setter(parseFloat(v))
        if (reinitialize) {
            initialize()
        }
    }

    listenChange(target, e => {
        const value = targetRange.value = e.target.value
        handler(value)
    })

    listenChange(targetRange, e => {
        const value = target.value = e.target.value
        handler(value)
    })
}

export function linkEl(id, setter) {
    const target = $(id)
    listenChange(target, e => {
        const value = target.value = e.target.value
        setter(+value)
        initialize()
    })
}
