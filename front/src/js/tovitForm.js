import { Button } from '../components/Button.js';
import { Error } from '../components/Error.js';
import { Image } from '../components/Image.js';
import { Input } from '../components/Input.js';
import { Span } from '../components/Span.js';
import { toaster, setStorage, createElement } from '../helpers/globalHelpers.js'
import { globalState } from '../state/store.js';

const iconsPath = "./src/assets/icons"

export function loadForm() {
    const today = new Date().toLocaleDateString()
    let isPublic = false;

    const InputBtn = Button('button', "", "", "add-btn")
    InputBtn.insertAdjacentElement('afterbegin', Image(`${iconsPath}/plus-solid.svg`, 'הוסף', 'add-icon'))
    InputBtn.insertAdjacentElement('beforeend', Span('הוסף'))

    let inputText = `${globalState.getState().userName}, כתוב/י משהו טוב שקרה לך היום...`
    const inputEl = Input(inputText).outerHTML
    const formElement = `
                        <div class="form-bg">
                                <form id="things-form">
                                    <div id="input-container">
                                    <div id="add-thing-form" class="b-and-i">
                                        ${inputEl}
                                        ${InputBtn.outerHTML}
                                    </div>
                                    ${Error().outerHTML}
                                    <div id="data-list">
                                    </div>
                                    <div id="form-btns">
                                    ${Button('reset', "נקה", 'btn primary', "").outerHTML}
                                    ${Button('submit', "שלח", 'btn confirm', "").outerHTML}
                                    </div>
                                </div>
                                </form>
                            </div>
    `

    createElement('beforeend', formElement)

    const formBg = document.querySelector('.form-bg')
    const addBtn = document.querySelector("#add-btn");
    const formInput = document.querySelector(".form-input");
    const form = document.querySelector('#things-form')


    addBtn.addEventListener('click', handleAdd)
    form.addEventListener('submit', handleSubmit)
    formBg.addEventListener('click', e => {
        if (e.target === e.currentTarget)
            e.target.remove()
    })

    formInput.addEventListener('input', () => {
        handleInputError("")
    })

    globalState.subscribe(state => {
        updateUI(state);
        updateInputPlaceholder(state.userName);
    })
    updateUI(globalState.getState())

    function handleAdd() {
        if (formInput.value.length < 3) {
            handleInputError("מינימום 3 תווים")
            return
        };
        let tovitData = globalState.getState().inputsData;
        let createTovitToday = tovitData?.filter(el => el.date === today)

        if (createTovitToday.length) {
            createTovitToday[0]?.thing.push(formInput.value)
        } else {
            tovitData.unshift(
                {
                    date: today,
                    thing: [formInput.value],
                    user_id: "fake-id-1012",
                    public: isPublic,
                    img_url: 'url-for-img/123'
                })
        }
        globalState.setState({ inputsData: tovitData })
        setStorage('inputs-data', tovitData)

        toaster('טובית נוספה בהצלחה')
        formInput.value = ""
    }

    function handleSubmit(e) {
        e.preventDefault();
        let tovitData = globalState.getState().inputsData;
        if (tovitData.length === 0) return

        globalState.setState({ inputsData: tovitData })
        setStorage(`inputs-data`, tovitData)
        e.target.parentElement.remove()
        toaster('נתונים נשלחו בהצלחה')
    }



    function handleDelete(index) {
        let tovitData = globalState.getState().inputsData;
        let todayThings = tovitData.find(el => el.date === today)?.thing;

        if (todayThings) {
            todayThings.splice(index, 1)
        }

        globalState.setState({ inputsData: tovitData })
        setStorage('inputs-data', tovitData)
        toaster('טובית נמחקה בהצלחה', "delete")
    }

    function handleInputError(text) {
        const errorEl = document.getElementById('input-error');
        errorEl.innerHTML = text
    }

    function updateUI(state) {
        const allData = document.querySelector("#data-list");
        const things = state.inputsData.filter(el => el.date === today)[0]?.thing;
        allData.innerHTML = "";

        if (things && things.length) {
            things.forEach((thing, i) => {

                const markup = `
                <div class="form-data-list">
                <p class="text">${thing}</p>
                ${Image(`${iconsPath}/trash-can-regular.svg`, "מחק", "", `${i} del-icon`).outerHTML}
                </div>
                `
                createElement('beforeend', markup, 'data-list', 'id');
            })
            document.querySelectorAll('.del-icon').forEach((icon, i) => {
                icon.addEventListener('click', () => handleDelete(i));
            });
        }
    }

    function updateInputPlaceholder(newName) {
        inputText = `${newName}, כתוב/י משהו טוב שקרה לך היום...`
        document.querySelector('.floating-label').innerHTML = inputText
    }

} 