import { isToday } from 'https://cdn.skypack.dev/date-fns';

const addIcon = '../../assets/icons/plus-solid.svg'
const delIcon = '../../assets/icons/trash-can-regular.svg'


const createTovitBtn = document.querySelectorAll('.create-tovit');

if (createTovitBtn?.length) {
    createTovitBtn.forEach(btn => {
        btn.onclick = () => {
            const todaysPost = JSON.parse(btn.getAttribute('data-todays-post'));
            const userData = JSON.parse(btn.getAttribute('data-user'));
            const bgOptArr = JSON.parse(btn.getAttribute('data-bg-options'));

            loadTovit(todaysPost, userData, bgOptArr)
        }
    })

}

function loadTovit(todayPost, userData, bgOptArr) {
    let localPostContent = window.helpers.getStorage('post-items')
    const postBg = todayPost.background === ' ' ? userData.tovit_template : todayPost.background
    todayPost.background = postBg


    const tovitData = {
        postedToday: isToday(userData?.last_post_time),
        post: todayPost, //{background, background_url, id, post_content, post_date, public, user_id}
        error: "שימו לב נדרש להזין מינימום 2 תווים",
    }

    if (!tovitData.postedToday) {
        tovitData.post.post_content = localPostContent || tovitData.post.post_content
    }

    const bgMarkup = bgOptArr.reduce((prev, curr, i) => {
        if (i === 0) return prev + `<p class="tovit-bg-small tovit-bg-dropdown def-bg bg-img-${i + 1}"></p>`
        else {
            return prev + `<img class="tovit-bg-small tovit-bg-dropdown bg-img-${i + 1}" src=${curr} alt="image-${i + 1}">`
        }
    }, "")

    window.createModal()
    const modal = document.querySelector('.modal-content')

    const markup = `
        <form id="things-form">
            <div class="toggle-div">
                <span>שיתוף לכולם</span>
                <div class="toggle-container ${tovitData.post.public ? "active-switch" : ""}">
                    <div class="switch ${tovitData.post.public ? "active-toggle" : ""}"></div>
                </div>
            </div>
            <div id="input-container">
                <div class="b-and-i" id="add-thing-form">
                    <div class="floating-label-group">
                        <input type="text" id="post-content" class="form-input" true="" placeholder="" false="" autofocus autocomplete="off">
                        <label class="floating-label ">${userData.first_name || "User"}, כתוב/י משהו טוב שקרה לך היום...</label>
                    </div>
                    <button type="button" id="add-btn">
                        <img src=${addIcon} alt="הוסף" class="icons icons-big" id="add-icon">
                        <span>הוסף</span>
                    </button>
                </div>
                <p id="input-error">${tovitData.error}</p>
                <div id="data-list">
                </div>
                <div id="form-btns">
                <div class="image-select">
                                    <div class="image-container">
                                        <p class="tovit-bg-blur">
                                            <span class="chevron">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFF" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                                </svg>
                                            </span>
                                            </p>
                                        <img class="tovit-bg-small bg-img-2" src=${bgOptArr[1]} alt="">
                                        
                                    </div>
                                    <div class="image-dropdown">
                                        ${bgMarkup}
                                    </div>
                                </div>
                                <div>
                    <button type="reset" class="btn primary">ביטול</button>
                    <button type="button" class="btn confirm">${tovitData?.public ? "שמור ושתף לכולם" : "שמור ושתף"}</button>
                </div>
            </div>
        </form>
    `

    modal.insertAdjacentHTML('afterbegin', markup)
    modal.style.backgroundImage = `url(${tovitData.post.background_url})`
    const form = document.getElementById('things-form');
    const submitBtn = document.querySelector('.btn.confirm');
    const addBtn = document.getElementById('add-btn');

    handleImgPress(modal, tovitData);
    handleDropdown();
    handleToggle(submitBtn, tovitData);

    form?.addEventListener('submit', (e) => handleAdd(e, tovitData))
    addBtn?.addEventListener('click', (e) => handleAdd(e, tovitData))
    submitBtn?.addEventListener('click', (e) => handleSubmit(e, tovitData, userData, form))

    if (tovitData?.post?.post_content?.length) updateListUI(tovitData)

}


async function handleSubmit(e, tovitData, userData, formElement) {
    const btns = formElement.querySelectorAll('button')
    const toggleDiv = formElement.querySelector('.toggle-div')
    const toggle = document.querySelector('.toggle-container')
    const switcher = document.querySelector('.switch')
    const icons = formElement.querySelectorAll('.del-icon')


    toggle.onclick = null
    btns.forEach((btn, i) => {
        btn.disabled = true;
        btn.classList.remove('confirm')
        btn.classList.remove('primary')
        btn.classList.add('disabled')

        if (i === btns.length - 1) {
            const shareTo = `${tovitData.public ? 'מפרסם לכולם' : 'מפרסם לעצמי'}`
            btn.innerHTML = shareTo

            const textInterval = setInterval(() => {
                btn.innerHTML += "."
            }, 1000)
            setTimeout(() => clearInterval(textInterval), 3000)
        }
    })
    icons.forEach(icon => {
        icon.classList.add('disabled')
    })
    toggleDiv.classList.add('disabled')
    switcher.classList.add('disabled')

    try {

        let method = tovitData.postedToday ? "PATCH" : "POST"

        let url = tovitData.postedToday ? `/api/tovits/${tovitData.post.id}` : `/api/tovits?userId=${userData.id}`

        if (tovitData.postedToday && !tovitData.post.post_content.length) {
            url = `/api/tovits/${tovitData.post.id}`
            method = 'DELETE'
        }

        const res = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tovitData.post)
        })

        if (!res.ok) {
            throw new Error('שיתוף הפוסט נכשל, נא לנסות שוב בעוד מספר רגעים.')
        }
        const data = await res.json()
        localStorage.removeItem('post-items')
        window.helpers.toaster(data.message)
        await window.helpers.delay(500)
        window.location.replace('/')

    } catch (error) {

        window.helpers.toaster(error.message, 'fail')
        window.closeModal();
    }

}

function handleAdd(e, tovitData) {
    e.preventDefault()
    const input = document.getElementById('post-content');
    const inputVal = input.value.trim();


    if (inputVal.length < 2) {
        tovitData.error = "שימו לב נדרש להזין מינימום 2 תווים"
        handleInputError(tovitData.error)
        return
    } else {
        tovitData.error = ""
        handleInputError(tovitData.error)
    }

    tovitData.post.post_content.push(inputVal)
    localStorage.setItem("post-items", JSON.stringify(tovitData.post.post_content))

    updateListUI(tovitData)
    window.helpers.toaster('נוסף בהצלחה')
    input.value = ""


}

function handleImgPress(modal, tovitData) {
    const dropdownImgs = modal.querySelectorAll('.tovit-bg-dropdown')

    dropdownImgs.forEach((img, i) => {
        img.addEventListener('click', () => {
            modal.style.backgroundImage = `url(${img.src})`
            tovitData.post.background = i + 1
            tovitData.post.background_url = img.src
        })
    })
}

function handleDropdown() {
    const imageSelector = document.querySelector('.image-select')
    const imgsDropdown = document.querySelector('.image-dropdown')


    let isOpenImgs = false

    imageSelector.onclick = () => {
        imgsDropdown.style.display = isOpenImgs ? 'none' : "flex"
        imgsDropdown.style.animation = "openImages 0.5s linear forwards";
        isOpenImgs = !isOpenImgs
    }

}

function handleToggle(submitBtn, tovitData) {
    const toggle = document.querySelector('.toggle-container')
    const switcher = document.querySelector('.switch')

    toggle.onclick = () => {
        toggle?.classList.toggle('active-switch')
        switcher?.classList.toggle('active-toggle')
        tovitData.post.public = !tovitData.post.public

        submitBtn.innerHTML = tovitData.post.public ? "שמור ושתף לכולם" : "שמור ושתף"
        window.helpers.toaster(tovitData.post.public ? "שימו לב, כולם יוכלו לראות את הטובית 🌎" : "הטובית תהיה פרטית, רק אתם תוכלו לראות אותה 🔒")
    }



}

function updateListUI(tovitData) {
    const allData = document.querySelector("#data-list");
    allData.innerHTML = ""
    tovitData.post.post_content.forEach((tov, i) => {
        let markup = `
    <div class="form-data-list el-${i} ">
        <p class="text">${tov}</p>
        <img src=${delIcon} class="icon-${i} icons icons-small del-icon" alt='delete' />
    </div>
    `

        allData.insertAdjacentHTML('afterbegin', markup)
        const icon = document.querySelector(`.icon-${i}`)
        icon?.addEventListener('click', () => handleDelete(i, tovitData))
    })

}

function handleDelete(num, tovitData) {

    tovitData.post.post_content.splice(num, 1)
    updateListUI(tovitData)
    localStorage.setItem("post-items", JSON.stringify(tovitData.post.post_content))
    window.helpers.toaster("השורה נמחקה בהצלחה, לא לשכוח לשמור את הפוסט 😉", "delete")

}

function handleInputError(text) {
    const errorEl = document.getElementById('input-error');
    errorEl.innerHTML = text
}





