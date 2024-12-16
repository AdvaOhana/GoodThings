const root = document.getElementById("root");
const addIcon = '../../assets/icons/plus-solid.svg'
const delIcon = '../../assets/icons/trash-can-regular.svg'
function loadTovit(){
    let isPublic = userData.defIsPublic   
    const fName = userData.first_name
    let error = ""
    const markup = `<div class="form-bg">
    <form id="things-form">
        <div class="toggle-div">
            <span>שיתוף לכולם</span>
            <div class="toggle-container ${isPublic ? "active-switch":""}">
                <div class="switch ${isPublic ? "active-toggle":""}"></div>
            </div>
        </div>
        <div id="input-container">
            <div class="b-and-i" id="add-thing-form">
                <div class="floating-label-group">
                    <input type="text" class="form-input" true="" placeholder="" false="" autofocus autocomplete="off">
                    <label class="floating-label ">${fName || "User"}, כתוב/י משהו טוב שקרה לך היום...</label>
                </div>
                <button type="button" id="add-btn">
                    <img src=${addIcon} alt="הוסף" class="icons icons-big" id="add-icon">
                    <span>הוסף</span>
                </button>
            </div>
            <p id="input-error"></p>
            <div id="data-list"></div>
            <div id="form-btns">
                <button type="reset" class="btn primary">ביטול</button>
                <button type="button" class="btn confirm">${isPublic ? "שיתוף לכולם" : "שיתוף"}</button>
            </div>
        </div>
    </form>
</div>`
root.insertAdjacentHTML('afterend',markup)

const form = document.getElementById('things-form');
const submitBtn = document.querySelector('.btn.confirm');
const addBtn = document.getElementById('add-btn');
const toggle = document.querySelector('.toggle-container')
const switcher = document.querySelector('.switch')
const  formBgElement = document.querySelector(".form-bg")
const allData = document.querySelector("#data-list");

formBgElement.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
        e.target.remove()
    }
})

toggle.onclick = () => {
    toggle?.classList.toggle('active-switch')
    switcher?.classList.toggle('active-toggle')
    isPublic = !isPublic
    updateToggleUI()
}

form?.addEventListener('submit',handleAdd)
submitBtn?.addEventListener('click', handleSubmit)

function handleAdd(e){
    const input = document.querySelector('.form-input');
    const inputVal = input.value.trim()  
    e.preventDefault()
    if (inputVal.length < 2) {
        error = "מינימום 2 תווים"
        handleInputError(error)
        return
    };
    if(error.length){
        error =""
        handleInputError(error)
    }
    updateListUI(inputVal)
    input.value = ""  
}

function handleInputError(text) {
    const errorEl = document.getElementById('input-error');
    errorEl.innerHTML = text
}


function handleSubmit(e){
    console.log(window.globalState.isPublic);
    //toaster status should come from the backend
    // window.helpers.toaster("טובית נוספה בהצלחה")

}


function updateListUI(value){
    let markup = `
    <div class="form-data-list ">
    <p class="text">${value}</p>
    <img src=${delIcon} class="icon-${window.globalState.tovCnt} icons icons-small del-icon" alt='delete' />
    </div>
    `
    allData.insertAdjacentHTML('afterbegin',markup)
    const icon = document.querySelector(`.icon-${window.globalState.tovCnt}`)
    window.globalState.tovCnt++;
    icon?.addEventListener('click',handleDelete)

}

function updateToggleUI() {
    submitBtn.innerHTML = isPublic ? "שיתוף לכולם" : "שיתוף"
}

function handleDelete(e){
    console.log(e.target.classList[0].split("-").at(1));
    
}


}




const createTovitBtn = document.getElementById('create-tovit');
if(createTovitBtn){

    createTovitBtn.onclick= ()=>loadTovit()
}
