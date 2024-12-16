export function Image(src, alt, id, className) {
    const img = document.createElement('img')
    img.src = src
    alt ? img.alt = alt : null
    className ? img.className = className : null
    id ? img.id = id : null
    return img
}
