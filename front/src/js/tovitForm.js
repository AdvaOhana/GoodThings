import { toaster, setStorage, createElement } from '../helpers/globalHelpers.js'
const iconsPath = "./src/assets/icons"

export function loadForm(tovitData) {
    const today = new Date().toLocaleDateString()
    let isPublic = false;
    let addBtn;
    let allData;
    let formInput;
    let form;
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
                                    <p id="input-error"></p>
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

    createElement('beforeend', formElement)

    formBg = document.querySelector('.form-bg')
    addBtn = document.querySelector("#add-btn");
    allData = document.querySelector("#data-list");
    formInput = document.querySelector(".form-input");
    form = document.querySelector('#things-form')

    if (tovitData.length > 0) fillList()

    addBtn.addEventListener('click', handleAdd)
    form.addEventListener('submit', handleSubmit)
    formBg.addEventListener('click', e => {
        if (e.target === e.currentTarget)
            e.target.remove()
    })

    formInput.addEventListener('input', () => {
        handleInputError("")

    })
    function fillList() {
        let data = ""
        const things = tovitData?.filter(el => el.date === today)[0]?.thing
        things?.forEach((el, i) => {
            data += `
                    <div class="form-data-list">
                        <p class="text">${el}</p>
                        <img class="${i} del-icon" src=${iconsPath}/trash-can-regular.svg />
                    </div>
            `;
        })
        formInput.value = "";
        allData.innerHTML = data
        document.querySelectorAll('.del-icon').forEach(icon =>
            icon.addEventListener('click', handleDelete)
        )
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (tovitData.length === 0) return
        setStorage(`inputs-data`, tovitData)
        e.target.parentElement.remove()
        toaster('נתונים נשלחו בהצלחה')
    }
    function handleAdd() {
        if (formInput.value.length < 3) {
            handleInputError("מינימום 3 תווים")
            return
        };
        let createTovitToday = tovitData?.filter(el => el.date === today)

        if (createTovitToday.length) {
            createTovitToday[0].thing.push(formInput.value)
        }
        if (!createTovitToday.length) {
            tovitData.unshift({ date: today, thing: [formInput.value], user_id: "fake-id-1012", public: isPublic, img_url: 'url-for-img/123' })
        }

        const markup = `
                    <div class="form-data-list">
                        <p class="text">${formInput.value}</p>
                        <img class="${createTovitToday[0].thing.length - 1} del-icon" src=${iconsPath}/trash-can-regular.svg />
                    </div>
                    `
        setStorage('inputs-data', tovitData)
        toaster('טובית נוספה בהצלחה')
        formInput.value = ""
        createElement('beforeend', markup, 'data-list', 'id')
        const newElDelIcon = document.querySelectorAll('.del-icon')[createTovitToday[0].thing.length - 1]
        newElDelIcon.addEventListener('click', handleDelete)
    }
    function handleDelete(e) {
        const allIcons = document.querySelectorAll('.del-icon')
        const thingNum = +this.className.split(' ')[0]

        allIcons.forEach(el => {
            if (el === this) {
                allData.removeChild(this.parentElement)
            }
        })
        let todayThings = tovitData.find(el => el.date === today)?.thing

        todayThings = todayThings.filter((el, i) => {
            return el !== this.parentElement.children[0].innerHTML
        })

        tovitData.forEach((el) => {
            if (el.date === today) {
                el.thing = todayThings
            }
        })

        setStorage('inputs-data', tovitData)
        toaster('טובית נמחקה בהצלחה', "delete")
    }
    function handleInputError(text) {
        const errorEl = document.getElementById('input-error');
        errorEl.innerHTML = text
    }

}