import { Image } from '../components/Image.js'
import { Span } from '../components/Span.js'

export const imgsRef = '../src/assets'

export function delay(timeInMs) {
    return new Promise(res => setTimeout(res, timeInMs))
}

export function setStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}
export function getStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

export function createElement(location, markup, parentName = 'root', parentType) {
    let parentEl = document.getElementById('root')
    if (parentName !== 'root') {
        if (parentType === 'id') {
            parentEl = document.getElementById(parentName)
        }
        if (parentType === 'class') {
            parentEl = document.querySelector(`.${parentName}`)
        }
    }
    if (!parentEl) return
    parentEl.insertAdjacentHTML(location, markup)
}

export async function toaster(text, type = "check", duration = 2000) {
    const toasts = []
    let toastContainer;
    let iconType = `${imgsRef}/icons/check-solid.svg`
    if (!toastContainer) {
        createToastContainer()
    }
    const toastElement = document.createElement('div')
    toastElement.classList.add('toast')

    if (type === 'delete') {
        iconType = `${imgsRef}/icons/trash-can-regular.svg`

    }
    if (type === 'fail') {
        iconType = `${imgsRef}/icons/circle-xmark-regular.svg`
    }

    const img = Image(iconType, `${type}`, "", "icons icons-primary")
    const span = Span(text)

    toastElement.insertAdjacentElement('beforeend', img)
    toastElement.insertAdjacentElement('beforeend', span)
    toastContainer.appendChild(toastElement)

    toasts.unshift(toastElement)

    await delay(50)
    toastElement.classList.add('toast-active')
    updateToastPositions()

    await delay(duration)
    toastElement.remove();
    toasts.pop();
    updateToastPositions();
    if (toasts.length === 0) {
        toastContainer.remove()
        toastContainer = undefined
    }

    function updateToastPositions() {
        toasts.forEach((toast, i) => {
            toast.style.transform = `translateY(${i * 20}px) scale(${1 - i * 0.05})`;
            toast.style.opacity = `${1 - i * 0.1}`;
            toast.style.zIndex = `${toasts.length - i}`;
        });
    }

    function createToastContainer() {
        toastContainer = document.createElement('div')
        toastContainer.classList.add('toast-container')
        document.body.appendChild(toastContainer)
    }
}

export async function getCountries() {
    const res = await fetch(`https://restcountries.com/v3.1/all
        `)
    let data = await res.json()

    data.sort((a, b) => {
        a.name.common.toLowerCase() > b.name.common.toLowerCase() ? -1 : 1
    })
    data = data.map(country => { return { name: country.name.common, flag: country.flag } })
    data.sort((a, b) => {
        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    })

    return data
}