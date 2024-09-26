import { Div } from "./Div.js"

export function Input(
    labelText = 'נא לכתוב כאן...', type = 'text', inputClass = "", labelClass = ""
) {
    const inputWrapper = Div('floating-label-group')

    const markup = `
        <input type=${type} class="form-input ${inputClass}" placeholder="" />
        <label class="floating-label ${labelClass}">${labelText}</label>
    `


    inputWrapper.insertAdjacentHTML('afterbegin', markup)

    return inputWrapper
}