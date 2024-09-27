import { Button } from './Button.js';
import { Div } from './Div.js';
import { Error } from './Error.js';
import { Image } from './Image.js';
import { Input } from './Input.js';
import { Span } from './Span.js';
import { ToggleElement } from './Toggle.js';
import { toaster, setStorage, createElement, defaultRef } from '../helpers/globalHelpers.js'
import { globalState, Store } from '../state/store.js';

const iconsPath = "../../src/assets/icons"

const formState = new Store({
    isPublic: false,
    today: new Date().toLocaleDateString(),
    errorText: "",
})

export default function loadForm() {
    const body = document.getElementById('root')
    const addBtn = Button('button', "", "", "add-btn")
    addBtn.insertAdjacentElement('afterbegin', Image(`${iconsPath}/plus-solid.svg`, 'הוסף', "add-icon", 'icons icons-big'))
    addBtn.insertAdjacentElement('beforeend', Span('הוסף'))

    const inputEl = Input(`${globalState.getState().userName}, כתוב/י משהו טוב שקרה לך היום...`);
    const formBgElement = Div('form-bg');

    // Create form and its inner elements using DOM methods
    const form = document.createElement('form');
    form.id = "things-form";

    const inputContainer = Div("", 'input-container');
    const addThingForm = Div('b-and-i', "add-thing-form");

    addThingForm.appendChild(inputEl);
    addThingForm.appendChild(addBtn);

    inputContainer.appendChild(addThingForm);
    inputContainer.appendChild(Error());

    const dataList = Div("", 'data-list');
    inputContainer.appendChild(dataList);

    const formBtns = Div("", 'form-btns');
    const submitBtn = Button('submit', "שיתוף", 'btn confirm')
    const resetBtn = Button('reset', "ביטול", 'btn primary')
    formBtns.appendChild(resetBtn);
    formBtns.appendChild(submitBtn);
    inputContainer.appendChild(formBtns);

    const toggleDiv = Div('toggle-div')
    const togglePublic = ToggleElement()
    toggleDiv.appendChild(Span('שיתוף לכולם'))
    toggleDiv.appendChild(togglePublic)
    form.appendChild(toggleDiv);
    form.appendChild(inputContainer);

    togglePublic.addEventListener('click', () => {
        formState.setState({ isPublic: !formState.getState().isPublic })

    }

    )

    formBgElement.appendChild(form);
    body.insertAdjacentElement('beforeend', formBgElement)

    const formInput = document.querySelector(".form-input");


    addBtn.addEventListener('click', handleAdd)
    form.addEventListener('submit', handleSubmit)

    formBgElement.addEventListener('click', e => {
        if (e.target === e.currentTarget) {
            e.target.remove()
            history.pushState('', '', location.origin)
        }
    })

    formInput.addEventListener('input', () => {
        handleInputError("")
    })

    globalState.subscribe(state => {
        updateUI(state);
    })

    formState.subscribe(state => {
        updateError(state.errorText)
        updateToggle(state.isPublic)

    })

    updateUI(globalState.getState())
    updateError(formState.getState().errorText)
    updateToggle(formState.getState().isPublic)

    function handleAdd() {
        if (formInput.value.length < 3) {
            formState.setState({ errorText: "מינימום 3 תווים" })
            return
        };
        let tovitData = globalState.getState().inputsData;

        let createTovitToday = tovitData?.filter(el => el.date === formState.getState().today)

        if (createTovitToday?.length) {
            createTovitToday[0]?.thing.push(formInput.value)
        } else {
            tovitData.unshift(
                {
                    date: formState.getState().today,
                    thing: [formInput.value],
                    user_id: "fake-id-1012",
                    public: formState.getState().isPublic,
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
        let todayThings = tovitData.find(el => el.date === formState.getState().today)?.thing;

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
        const things = state.inputsData?.filter(el => el.date === formState.getState().today)[0]?.thing;
        if (allData) {
            allData.innerHTML = "";

        }
        if (things && things.length) {
            things.forEach((thing, i) => {

                const markup = `
                <div class="form-data-list">
                <p class="text">${thing}</p>
                ${Image(`${iconsPath}/trash-can-regular.svg`, "מחק", "", `icons icons-small del-icon`).outerHTML}
                </div>
                `
                createElement('beforeend', markup, 'data-list', 'id');
            })
            document.querySelectorAll('.del-icon').forEach((icon, i) => {
                icon.addEventListener('click', () => handleDelete(i));
            });
        }
    }

    function updateToggle(isPublic) {
        submitBtn.innerHTML = isPublic ? "שיתוף לכולם" : "שיתוף"
    }

    function updateError(error) {
        const errorText = `${error}`
        document.getElementById('input-error').innerText = errorText
    }

} 