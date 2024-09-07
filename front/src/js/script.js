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
import toaster from "../helpers/toaster.js";
import { setStorage, getStorage } from '../helpers/globalHelpers.js'

const iconsPath = "./src/assets/icons"
const hamburger = document.querySelector('#hamburger');
const menu = document.querySelector('.menu');
let inputsData = getStorage('inputs-data') || []

const formBtn = document.querySelectorAll('.show-form')
let timeOut;

hamburger.addEventListener('click', (e) => {
    menu.classList.toggle('hidden');
});


formBtn.forEach(btn => btn.addEventListener('click', loadForm))

function loadForm() {
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
    formInput.addEventListener('input', () => {
        handleError("")

    })

    function fillList() {
        let data = ""
        const things = inputsData?.filter(el => el.date === today)[0]?.thing
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
        if (formInput.value.length < 3) {
            handleError("מינימום 3 תווים")
            return
        };
        let createTovitToday = inputsData?.filter(el => el.date === today)

        if (createTovitToday.length) {
            createTovitToday[0].thing.push(formInput.value)
        }
        if (!createTovitToday.length) {
            inputsData.unshift({ date: today, thing: [formInput.value], user_id: "fake-id-1012", public: isPublic, img_url: 'url-for-img/123' })
        }
        setStorage('inputs-data', inputsData)
        toaster('טובית נוספה בהצלחה')
        fillList();
    }

    function handleDelete(e) {
        const thingNum = +e.target.className.split(' ')[0]
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

    function handleError(text) {
        const errorEl = document.getElementById('input-error');
        errorEl.innerHTML = text
    }

}


