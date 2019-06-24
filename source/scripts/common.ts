export let $ = (id: string) => document.getElementById(id)

export function bind(
    target: Node,
    events: [string],
    handler: (e: Event) => void
) {
    for(const event of events) {
        target.addEventListener(event, handler, false)
    }
}

// linear interpolation from a to b by a factor of f
export let lerp = (a: number, b: number, f: number) =>
    (a * (1 - f) + b * f) / 2
// sinusoidal interpolation from a to b by a factor of f
export let sinterp = (a: number, b: number, f: number) =>
    (b - a) * (1 - Math.cos(Math.PI * f)) / 2 + a
// random float between min (inclusive) and max (exclusive)
export let randf = (min: number, max: number) =>
    Math.random() * (max - min) + min
