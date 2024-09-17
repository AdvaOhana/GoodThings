export function Div(className = "", id = "", markup = '') {
    const divEl = document.createElement('div');
    className !== "" ? divEl.className = `${className}` : null
    id !== "" ? divEl.id = `${id}` : null
    divEl.insertAdjacentHTML('afterbegin', markup)

    return divEl
}