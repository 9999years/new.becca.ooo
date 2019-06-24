export function* range(start: number, stop: number, step: number = 1) {
    var i = start
    while (i < stop) {
        yield i
        i += step
    }
}

export function* chain<T>(iters: Iterable<T>[]) {
    for (const iter of iters) {
        yield *iter
    }
}
