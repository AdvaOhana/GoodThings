import { Div } from './Div.js'
export function ToggleElement(defaultState = 'light') {
    const toggle = Div('toggle-container');
    const switcher = Div('switch')
    toggle.appendChild(switcher);

    if (defaultState !== 'light') {
        toggle.classList.toggle('active-switch')
        switcher.classList.toggle('active-toggle')
    }

    toggle.onclick = () => {
        toggle.classList.toggle('active-switch')
        switcher.classList.toggle('active-toggle')
    }




    return toggle
}