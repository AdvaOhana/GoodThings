import { Image } from './Image.js'
import { Button } from './Button.js'
import { getStorage } from '../helpers/globalHelpers.js';
import { loadForm } from '../js/tovitForm.js';
import { globalState } from '../state/store.js';


const root = document.getElementById('root')


export function Header() {
    const markup = `
    ${Image('./src/assets/imgs/logo.png', 'טוב יומי', 'logo').outerHTML}
    <nav id="menu-bar" class="navbar">
            <ul class="nav-list">
                <li>${Button('text', 'הוסף טובית', 'btn primary show-form').outerHTML}</li>
                <li>פריט 2</li>
                <li>פריט 3</li>
            </ul>
    </nav>
    <div id="continer">
        <button id="hamburger" >
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </button>
        <img id="user-logo" src="./src/assets/icons/user-regular.svg" alt="">
        ${Button('text', 'שנה תצוגה', 'btn primary', 'theme-color').outerHTML}
    </div>
    <div class="menu hidden">
                <ul>
                <li>${Button('text', 'הוסף טובית', 'btn primary show-form').outerHTML}</li>
                <li>פריט 2</li>
                <li>פריט 3</li>
            </ul>
    </div>
`
    const header = document.createElement('header')

    header.insertAdjacentHTML('afterbegin', markup)
    const themeToggle = header.querySelector('#theme-color')
    const hamburger = header.querySelector('#hamburger');
    const menu = header.querySelector('.menu');
    const formBtn = header.querySelectorAll('.show-form')
    let inputsData = getStorage('inputs-data') || []

    hamburger.addEventListener('click', (e) => {
        menu.classList.toggle('hidden');
        function closeMenu(e) {
            if (e.target === e.currentTarget) {
                menu.classList.toggle('hidden')
                root.removeEventListener('click', closeMenu)
            }
        }
        root.addEventListener('click', closeMenu)
    });


    function themeHandler(state) {
        root.className = state.theme;
    }

    globalState.subscribe(themeHandler)

    themeToggle.addEventListener('click', () => {
        const currTheme = globalState.getState().theme;
        const newTheme = currTheme === 'dark' ? 'light' : 'dark'
        globalState.setState({ theme: newTheme })
    })

    themeHandler(globalState.getState())

    formBtn.forEach(btn => btn.addEventListener('click', () => loadForm(inputsData)))


    return header
}