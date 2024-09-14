export function Image(src, alt, id, className) {
    const img = document.createElement('img')

    img.src = src
    alt ? img.alt = alt : null
    className ? img.className = className : null
    id ? img.id = id : null




    // <button type="button" id="add-btn">
    // <img id="add-icon" src=${iconsPath}/plus-solid.svg alt="">
    // <span>הוסף</span>
    // </button>


    //     <div id="form-btns">
    //     <button class="btn primary" type="reset" onclick="">נקה הכל</button>
    //     <button class="btn confirm" type="submit">שלח</button>
    // </div>
    return img
}