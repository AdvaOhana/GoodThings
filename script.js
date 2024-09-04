const toasts = []
let toastContainer;
const iconsPath = "./public/icons"
const hamburger = document.querySelector('#hamburger');
const menu = document.querySelector('.menu');
const formBtn = document.querySelectorAll('.show-form')
let timeOut;

hamburger.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    delay(50)
});

formBtn.forEach(btn => btn.addEventListener('click', loadForm))


function delay(timeInMs) {
    return new Promise(res => setTimeout(res, timeInMs))
}


async function toaster(text, type, duration = 2000) {
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

function setStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}
function getStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}
function loadForm() {
    let addBtn;
    let allData;
    let formInput;
    let form;
    let inputsData;
    let formBg;
    const formElement = `
                        <div class="form-bg">
                                <form id="things-form">
                                    <div id="input-container">
                                    <div id="add-thing-form" class="b-and-i">
                                        <div class="floating-label-group">
                                            <input type="text" class="form-input" placeholder="" />
                                            <label class="floating-label">כתוב/י דבר אחד טוב שקרה לך היום</label>
                                        </div>
                                        <button type="button" id="add-btn">
                                            <img id="add-icon" src=${iconsPath}/plus-solid.svg alt="">
                                            <span>הוסף</span>
                                        </button>
                                    </div>
                                    <div id="data-list">
                                    </div>
                                    <div id="form-btns">
                                        <button class="btn primary" type="reset" onclick="">נקה הכל</button>
                                        <button class="btn confirm" type="submit">שלח</button>
                                    </div>
                                </div>
                                </form>
                            </div>
    `

    document.body.insertAdjacentHTML('beforeend', formElement)
    formBg = document.querySelector('.form-bg')
    addBtn = document.querySelector("#add-btn");
    allData = document.querySelector("#data-list");
    formInput = document.querySelector(".form-input");
    form = document.querySelector('#things-form')
    inputsData = getStorage('inputs-data') || []

    if (inputsData.length > 0) fillList()


    addBtn.addEventListener('click', handleAdd)
    form.addEventListener('submit', handleSubmit)

    formBg.addEventListener('click', e => {

        if (e.target === e.currentTarget)
            e.target.remove()
    }
    )



    function fillList() {
        let data = ""
        inputsData.forEach((el, i) => {
            data += `
        <div class="form-data-list">
            <p class="text">${el.thing}</p>
            <img class="${i} del-icon" src=${iconsPath}/trash-can-regular.svg />
        </div>
        `;
            formInput.value = "";
        })
        allData.innerHTML = data
        document.querySelectorAll('.del-icon').forEach(icon =>
            icon.addEventListener('click', handleDelete)
        )
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (inputsData.length === 0) return
        setStorage(`inputs-data`, inputsData)
        e.target.parentElement.remove()
        toaster('נתונים נשלחו בהצלחה')
    }

    function handleAdd() {
        if (formInput.value.length < 3) return
        inputsData.unshift({ date: new Date().toLocaleDateString(), thing: formInput.value })
        setStorage('inputs-data', inputsData)
        toaster('טובית נוספה בהצלחה')
        fillList();
    }

    function handleDelete(e) {
        elNum = +e.target.className.split(' ')[0]
        inputsData = inputsData.filter((el, i) => i !== elNum)
        setStorage('inputs-data', inputsData)
        toaster('טובית נמחקה בהצלחה', "delete")
        fillList()
    }

}
console.log(getStorage("inputs-data"));
console.log(new Date());

