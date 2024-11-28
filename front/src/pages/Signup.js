import { Button } from '../components/Button.js'
import { Div } from '../components/Div.js'
import { Input } from '../components/Input.js'
import { Span } from '../components/Span.js'
import { getCountries } from '../helpers/globalHelpers.js'
const body = document.getElementById('root')
const countries = await getCountries()
const genders = ['נקבה', 'זכר', 'מעדיף שלא לבחור']
const days = Array.from({ length: 31 }, (el, i) => i + 1)
const months = Array.from({ length: 12 }, (el, i) => i + 1)
const years = Array.from({ length: 120 }, (el, i) => new Date().getFullYear() - i)

export default function Signup() {
    body.innerHTML = ''
    const datesContainer = Div('dates-container', "signup-dates")
    const datesTitle = Span('תאריך לידה', "mini-title")
    datesContainer.appendChild(datesTitle)

    const dates = [
        Input('', "select", "", "", "", days, 'יום', 'day'),
        Input('', "select", "", "", "", months, 'חודש', 'month'),
        Input('', "select", "", "", "", years, 'שנה', 'year')
    ]
    dates.forEach(date =>
        datesContainer.appendChild(date))
    const inputsArr = [
        Input('שם פרטי', 'text', "given-name"),
        Input('שם משפחה', 'text', "family-name"),
        Input('שם משתמש', 'text'),
        Input('פלאפון', 'phone', "tel", "", "", "", "", "", false),
        Input('סיסמה', 'password', ""),
        Input('אימות סיסמה', 'password', ""),
        Input('אימייל', 'email', "email"),
        Input('', "select", "", "", "", genders, 'בחר/י מגדר', "gender"),
        Input('', "select", "", "", "", countries, 'בחר/י מדינה', "country"),
        datesContainer,
    ]

    const main = document.createElement('main')
    main.id = 'signup-container'

    const header = Div('page-header')
    const title = document.createElement('h1')
    title.innerHTML = 'הרשמה'
    const subTitle = document.createElement('p')
    subTitle.innerHTML = 'הכנס את הדואר האלקטרוני והסיסמה שלך'
    header.appendChild(title);
    header.appendChild(subTitle);
    main.appendChild(header);


    const signupForm = document.createElement('form');
    signupForm.className = "signup-form"
    signupForm.method = 'post';
    signupForm.action = '/user/signup'
    inputsArr.map(input => {
        signupForm.appendChild(input)
    })


    const submitBtn = Button('submit', "הרשמה", 'btn confirm wide')
    signupForm.appendChild(submitBtn);

    const action = Div('user-actions')

    const loginLink = document.createElement('a')
    loginLink.setAttribute('data-link', '');
    loginLink.innerHTML = 'התחבר'
    loginLink.href = '/login'
    const existUser = Span(`משתמש קיים? `)
    existUser.appendChild(loginLink)

    action.appendChild(existUser)



    signupForm.appendChild(action)
    main.appendChild(signupForm)

    body.appendChild(main)
}

