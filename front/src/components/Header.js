import { Image } from './Image.js'
import { Button } from './Button.js'
import { globalState } from '../state/store.js';
import { defaultRef } from '../helpers/globalHelpers.js';



const root = document.getElementById('root')


export function Header() {
    const markup = `
    ${Image('imgs/logo.png', 'טוב יומי', 'logo').outerHTML}
    <nav id="menu-bar" class="navbar">
            <ul class="nav-list">
                <li><a data-link href="${defaultRef}">בית</a></li>
                <li><a data-link href="${defaultRef}/tovit/form">הוסף טובית</a></li>
                <li><a data-link href="${defaultRef}/login">התחברות</a></li>
                <li><a data-link href="${defaultRef}/error">שגיאה</a></li>
            </ul>
    </nav>
    <div id="hamburger-container">
        <button id="hamburger" >
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </button> 
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
    const hamburgerContainer = header.querySelector('#hamburger-container')
    const themeToggle = Image(`${globalState.getState().theme === 'dark' ? 'icons/moon-regular.svg' : 'icons/sun-regular.svg'}`, `${globalState.getState().theme === 'dark' ? 'moon' : 'sun'}`, "theme-toggle", "icons icons-primary")

    const userIcon = Image('icons/user-regular.svg', "user", "", "icons icons-primary round-icon")
    hamburgerContainer.appendChild(userIcon)

    hamburgerContainer.appendChild(themeToggle)

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
        const themeToggler = document.getElementById('theme-toggle')
        if (!themeToggler) return
        themeToggler.src = `${globalState.getState().theme === 'dark' ? 'icons/moon-regular.svg' : 'icons/sun-regular.svg'}`
        themeToggler.alt = `${globalState.getState().theme}`
    }

    globalState.subscribe(themeHandler)

    themeToggle.addEventListener('click', () => {
        const { theme, user } = globalState.getState();
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        globalState.setState({ theme: newTheme })
    })

    themeHandler(globalState.getState())

    return header
}