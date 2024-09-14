
export function Button(type = 'button', text = '', className = "", id = "",) {
    const btn = document.createElement('button')
    btn.type = type
    btn.innerText = text
    className ? btn.className = className : null
    id ? btn.id = id : null



    // <button type="button" id="add-btn">
    // <img id="add-icon" src=${iconsPath}/plus-solid.svg alt="">
    // <span>הוסף</span>
    // </button>


    //     <div id="form-btns">
    //     <button class="btn primary" type="reset" onclick="">נקה הכל</button>
    //     <button class="btn confirm" type="submit">שלח</button>
    // </div>


    return btn
}