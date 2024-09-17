import { Image } from './Image.js'
import { Button } from './Button.js'
import { loadForm } from '../js/tovitForm.js';
import { globalState } from '../state/store.js';
import { ToggleElement } from './Toggle.js';


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
    <div id="hamburger-container">
        <button id="hamburger" >
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </button>
        <img id="user-logo" src="./src/assets/icons/user-regular.svg" alt="">
     
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


    const hamburger = header.querySelector('#hamburger');
    const menu = header.querySelector('.menu');
    const formBtn = header.querySelectorAll('.show-form')
    const hamburgerContainer = header.querySelector('#hamburger-container')
    hamburgerContainer.appendChild(ToggleElement(globalState.getState().theme))
    const themeToggle = header.querySelector('.toggle-container')




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
        const { theme, user } = globalState.getState();
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        globalState.setState({ theme: newTheme })
    })

    themeHandler(globalState.getState())

    formBtn.forEach(btn => btn.addEventListener('click', () => loadForm()))


    return header
}