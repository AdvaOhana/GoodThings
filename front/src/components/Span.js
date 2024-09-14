export function Span(text = "", className, id) {

    const span = document.createElement('span')
    span.innerHTML = `${text}`
    className ? span.className = className : null
    id ? span.id = id : null


    return span
}