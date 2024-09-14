export function Div(className = "", markup = '') {
    const divEl = document.createElement('div');
    divEl.className = `${className}`

    divEl.insertAdjacentHTML('afterbegin', markup)

    return divEl
}