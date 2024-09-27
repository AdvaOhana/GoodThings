const body = document.getElementById('root')

export default function NotFound() {
    body.innerHTML = "";
    const div = document.createElement('div')
    div.innerText = "Not Found"
    body.appendChild(div)
}
