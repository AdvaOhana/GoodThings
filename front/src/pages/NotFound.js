import { Div } from '../components/Div'
import { Span } from '../components/Span'
const body = document.getElementById('root')

export default function NotFound() {
    body.innerHTML = "";
    const container = Div("error-container")
    const content = Div("error-container")
    const title = document.createElement('h2')
    title.innerHTML = 'שגיאה 404'
    const info = Span("סליחה, לא הצלחנו למצוא את הדף המבוקש", "error-container")
    div.innerText = "Not Found"
    body.appendChild(div)
}
