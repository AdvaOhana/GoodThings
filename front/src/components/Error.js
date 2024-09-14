export function Error(type = 'input', text = '', id = 'input-error') {
    const error = type === 'input' ? document.createElement('p') : document.createElement('div')
    error.innerHTML = text
    error.id = id
    return error
}