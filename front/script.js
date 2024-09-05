// const fakeData = [
//     {
//         date: "9/4/2024",
//         thing: [
//             "12f1f",
//             "3132r132f",
//             "veverbe"
//         ]
//     },
//     {
//         date: "8/4/2024",
//         thing: [
//             "c cxbxc",
//             "2g2g2",
//             "j987"
//         ]
//     }
// ]
// setStorage('inputs-data', fakeData)

const toasts = []
let toastContainer;
const iconsPath = "./public/icons"
const hamburger = document.querySelector('#hamburger');
const menu = document.querySelector('.menu');
let inputsData = getStorage('inputs-data') || []

const formBtn = document.querySelectorAll('.show-form')
let timeOut;

hamburger.addEventListener('click', (e) => {
    menu.classList.toggle('hidden');
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
    const today = new Date().toLocaleDateString()
    let addBtn;
    let allData;
    let formInput;
    let form;
    let formBg;
    // const formElement = `
    //                     <div class="form-bg">
    //                             <form id="things-form">
    //                                 <div id="input-container">
    //                                 <div id="add-thing-form" class="b-and-i">
    //                                     <div class="floating-label-group">
    //                                         <input type="text" class="form-input" placeholder="" />
    //                                         <label class="floating-label">כתוב/י דבר אחד טוב שקרה לך היום</label>
    //                                     </div>
    //                                     <button type="button" id="add-btn">
    //                                         <img id="add-icon" src=${iconsPath}/plus-solid.svg alt="">
    //                                         <span>הוסף</span>
    //                                     </button>
    //                                 </div>
    //                                 <div id="data-list">
    //                                 </div>
    //                                 <div id="form-btns">
    //                                     <button class="btn primary" type="reset" onclick="">נקה הכל</button>
    //                                     <button class="btn confirm" type="submit">שלח</button>
    //                                 </div>
    //                             </div>
    //                             </form>
    //                         </div>
    // `

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
        const things = inputsData.filter(el => el.date === today)[0].thing
        things?.forEach((el, i) => {
            data += `
                    <div class="form-data-list">
                        <p class="text">${el}</p>
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
        inputsData?.forEach(input => {
            if (input.hasOwnProperty('date')) {
                input.thing.push(formInput.value)
            }
        })
        if (!inputsData.length) {
            inputsData.unshift({ date: new Date().toLocaleDateString(), thing: [formInput.value] })
        }
        setStorage('inputs-data', inputsData)
        toaster('טובית נוספה בהצלחה')
        fillList();
    }

    function handleDelete(e) {
        thingNum = +e.target.className.split(' ')[0]
        let things = inputsData.filter(el => el.date === today)[0].thing
        things = things.filter((el, i) => i !== thingNum)
        inputsData.forEach(el => {
            if (el.date === today) {
                el.thing = things
            }
        })

        setStorage('inputs-data', inputsData)
        toaster('טובית נמחקה בהצלחה', "delete")
        fillList()
    }

}


