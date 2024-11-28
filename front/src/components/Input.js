import { Div } from "./Div.js"
import { Span } from "./Span.js";

export function Input(
    labelText = 'נא לכתוב כאן...', type = 'text', autoComplete = 'off', inputClass = "", labelClass = "", options = [], defaultOption, name, requierd = true, disabled = false) {
    let markup;
    const inputWrapper = Div('floating-label-group')

    if (type === 'select') {
        const container = Div('select-container')
        const flag = Span('')
        container.insertAdjacentElement('afterbegin', flag)
        let optionsMarkup = `<option value="" hidden>${defaultOption}</option>`
        options.map(option => optionsMarkup += `
            <option value="${option.name ? option.name.toLowerCase() : option}" id=${option.flag ? option.flag : ""}>${option.name ? option.name.toLowerCase() : option}</option>`)
        markup = `
        <select name="${name}" dir="rtl" class="select ${inputClass}" ${requierd} ${disabled}>
        ${optionsMarkup}
        </select>
        `
        container.insertAdjacentHTML("beforeend", markup)
        container.addEventListener('change', (e) => {
            flag.innerHTML = e.target.selectedOptions[0].id
        })
        inputWrapper.insertAdjacentElement('afterbegin', container)

    } else {
        markup = `
    <input type=${type} class="form-input ${inputClass}" ${requierd} placeholder="" ${disabled} autocomplete="${autoComplete}" />
    <label class="floating-label ${labelClass}">${labelText}</label>
    `
        inputWrapper.insertAdjacentHTML('afterbegin', markup)
    }
    return inputWrapper
}