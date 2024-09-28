import { Image } from './Image.js'
import { globalState } from '../state/store.js';

const root = document.getElementById('root')
const iconsPath = "../../src/assets"

export function Header() {
    const markup = `
    ${Image(`${iconsPath}/imgs/logo.png`, 'טוב יומי', 'logo').outerHTML}
    <nav id="menu-bar" class="navbar">
            <ul class="nav-list">
                <li><a data-link href="/">בית</a></li>
                <li><a data-link href="/tovit/form">הוסף טובית</a></li>
                <li><a data-link href="/login">התחברות</a></li>
                <li><a data-link href="/error">שגיאה</a></li>
            </ul>
    </nav>
    <div id="actions-container">
    </div>
`
    const header = document.createElement('header')
    header.insertAdjacentHTML('afterbegin', markup)



    const hamburgerContainer = header.querySelector('#actions-container')
    const themeToggle = Image(`${globalState.getState().theme === 'dark' ?
        `${iconsPath}/icons/sun-regular.svg` : `${iconsPath}/icons/moon-regular.svg`
        }`
        , `${globalState.getState().theme === 'dark' ? 'sun' : 'moon'}`, "theme-toggle", "icons icons-primary")
    const userIcon = Image(`${iconsPath}/icons/user-regular.svg`, "user", "", "icons icons-primary")
    hamburgerContainer.appendChild(themeToggle)
    hamburgerContainer.appendChild(userIcon)



    function themeHandler(state) {
        root.className = state.theme;
        const themeToggler = document.getElementById('theme-toggle')
        if (!themeToggler) return
        themeToggler.src = `${globalState.getState().theme === 'dark' ? `${iconsPath}/icons/sun-regular.svg` : `${iconsPath}/icons/moon-regular.svg`}`
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