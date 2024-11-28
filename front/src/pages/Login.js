import { Button } from '../components/Button.js'
import { Div } from '../components/Div.js'
import { Input } from '../components/Input.js'
import { Span } from '../components/Span.js'

const body = document.getElementById('root')
export default function LoginPage() {
    body.innerHTML = ''
    const emailInput = Input('אימייל / שם משתמש', 'email', "email")
    const passwordInput = Input('סיסמה', 'password', "current-password")

    const main = document.createElement('main')
    main.id = 'login-container'

    const header = Div('page-header')
    const title = document.createElement('h1')
    title.innerHTML = 'התחברות'
    const subTitle = document.createElement('p')
    subTitle.innerHTML = 'הכנס/י את הדואר האלקטרוני והסיסמה שלך'
    header.appendChild(title);
    header.appendChild(subTitle);
    main.appendChild(header);

    const loginForm = document.createElement('form');
    loginForm.className = "login-form"
    loginForm.method = 'post';

    loginForm.appendChild(emailInput)
    loginForm.appendChild(passwordInput)

    const submitBtn = Button('submit', "התחבר/י", 'btn confirm wide')
    loginForm.appendChild(submitBtn);

    const action = Div('user-actions')
    const forgotPassword = document.createElement('a')
    forgotPassword.href = '/password-recovery'
    forgotPassword.innerHTML = 'שכחת את הסיסמה?'

    const createUser = document.createElement('a')
    createUser.setAttribute('data-link', '');
    createUser.innerHTML = 'צור/י חשבון'
    createUser.href = '/signup'
    const newUser = Span(`משתמש חדש? `)
    newUser.appendChild(createUser)

    action.appendChild(forgotPassword)
    action.appendChild(newUser)

    loginForm.appendChild(action);
    main.appendChild(loginForm)

    body.appendChild(main)
}

