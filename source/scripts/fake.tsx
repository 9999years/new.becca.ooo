export const $ = (id: string) => document.getElementById(id)

export function h(element: string, properties: object | null, ...children: Element[]): HTMLElement {
    const ret: HTMLElement = document.createElement(element)
    if (properties !== null) {
        for (const key in properties) {
            ret.setAttribute(key, properties[key])
        }
    }
    for (const child of children) {
        ret.append(child)
    }
    return ret
}
