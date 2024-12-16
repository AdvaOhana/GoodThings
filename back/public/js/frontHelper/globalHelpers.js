// import { Image } from '../components/Image.js'
// import { Span } from '../components/Span.js'

const iconsPath = '../../assets/icons'


function delay(timeInMs) {
    return new Promise(res => setTimeout(res, timeInMs))
}


function setStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}
 function getStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

 async function toaster(text, type = "check", duration = 2000) {
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
        iconType = `${imgsRef}/circle-xmark-regular.svg`
    }
    const img = document.createElement('img')
    img.src = iconType
    img.alt = `${type}`
    img.className = "icons icons-primary"

    const span = document.createElement('span')
    span.innerHTML = `${text}`

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


window.helpers = {toaster,getStorage,setStorage}