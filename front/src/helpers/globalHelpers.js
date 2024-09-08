const iconsPath = "./src/assets/icons"

export function delay(timeInMs) {
    return new Promise(res => setTimeout(res, timeInMs))
}

export function setStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}
export function getStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}


export function createElement(location, markup, parentName = 'body', parentType) {
    let parentEl = document.body

    if (parentName !== 'body') {
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


    const toast = `<img src=${iconType} />
                   <span>${text}</span>`



    toastElement.insertAdjacentHTML('beforeend', toast)
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