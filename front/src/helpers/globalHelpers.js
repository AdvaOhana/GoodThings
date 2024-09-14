const iconsPath = "./src/assets/icons"
import { Image } from '../components/Image.js'
import { Span } from '../components/Span.js'

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

    parentEl.insertAdjacentHTML(location, markup)
}

export async function toaster(text, type, duration = 2000) {
    const toasts = []
    let toastContainer;
    let iconType = `${iconsPath}/check-solid.svg`
    if (!toastContainer) {
        createToastContainer()
    }
    const toastElement = document.createElement('div')
    toastElement.classList.add('toast')

    if (type === 'delete') {
        iconType = `${iconsPath}/trash-can-regular.svg`

    }
    if (type === 'fail') {
        iconType = `${iconsPath}/circle-xmark-regular.svg`
    }

    const img = Image(iconType).outerHTML
    const span = Span(text).outerHTML

    toastElement.insertAdjacentHTML('beforeend', img)
    toastElement.insertAdjacentHTML('beforeend', span)
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