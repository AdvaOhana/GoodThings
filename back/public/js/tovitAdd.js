import { isSameDay,isToday } from 'https://cdn.skypack.dev/date-fns';

const root = document.getElementById("root");
const addIcon = '../../assets/icons/plus-solid.svg'
const delIcon = '../../assets/icons/trash-can-regular.svg'
function loadTovit(todayPost,userData,bgOptArr){  
    const postedToday =  isToday(userData.last_post_time);
    if(!postedToday) localStorage.removeItem('post-items') // remove all items when day has changed.

console.log('====================================');
console.log(todayPost);
console.log(userData);
console.log(bgOptArr);
console.log('====================================');
    if(window.helpers.getStorage('post-items')?.length){
        todayPost.post_content = window.helpers.getStorage('post-items')
    }
    if(postedToday && todayPost?.post_content.includes("%")){
            todayPost.post_content =  todayPost?.post_content?.split('%')
    }
    
    const tovitData = todayPost
        
    const fName = userData.first_name
    let error = ""

    let dropdownMarkup = ''
    bgOptArr?.forEach((el,i)=> {
        if(i===0) dropdownMarkup+= `<p class="tovit-bg-small tovit-bg-dropdown def-bg bg-img-${i+1}"></p>`
        else
            dropdownMarkup += `<img class="tovit-bg-small tovit-bg-dropdown bg-img-${i+1}" src=${el} alt="image-${i+1}">`
        }
    )
    
    window.createModal()
    const modal = document.querySelector('.modal-content')
    
    const markup = `
    <form id="things-form">
        <div class="toggle-div">
            <span>שיתוף לכולם</span>
            <div class="toggle-container ${tovitData.public ? "active-switch":""}">
                <div class="switch ${tovitData.public ? "active-toggle":""}"></div>
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
                                    ${dropdownMarkup}
                                </div>
                            </div>
                            <div>
                <button type="reset" class="btn primary">ביטול</button>
                <button type="button" class="btn confirm">${tovitData?.public ? "שמור ושתף לכולם" : "שמור ושתף"}</button>
            </div>
        </div>
    </form>`


modal.insertAdjacentHTML('afterbegin',markup)
modal.style.backgroundImage = `url(${postedToday ? todayPost.background : userData.tovit_template})`
const form = document.getElementById('things-form');
const submitBtn = document.querySelector('.btn.confirm');
const addBtn = document.getElementById('add-btn');
const toggle = document.querySelector('.toggle-container')
const switcher = document.querySelector('.switch')
const allData = document.querySelector("#data-list");
const imageSelector = document.querySelector('.image-select')
const imagesDropdown = document.querySelector('.image-dropdown');
const dropdownImgs = imagesDropdown.querySelectorAll('.tovit-bg-dropdown')
let tempBg = 1;
if(postedToday && todayPost.background == '1'){
    todayPost.background = tempBg
}else{
    tempBg = bgOptArr.indexOf(postedToday ? todayPost.background : userData.tovit_template)
    todayPost.background = tempBg
}


dropdownImgs.forEach((img,i)=>{
    img.addEventListener('click',()=>{
        modal.style.backgroundImage = `url(${img.src})`
        tovitData.background = i+1
    })
})

let isOpenImgs = false;
imageSelector.onclick = ()=> {
        imagesDropdown.style.display = isOpenImgs ? 'none' : "flex"
        imagesDropdown.style.animation = "openImages 0.5s linear forwards";
        isOpenImgs = !isOpenImgs
}



toggle.onclick = () => {
    toggle?.classList.toggle('active-switch')
    switcher?.classList.toggle('active-toggle')
    tovitData.public = !tovitData.public
    updateToggleUI()
}

form?.addEventListener('submit',handleAdd)
submitBtn?.addEventListener('click', handleSubmit)
addBtn?.addEventListener('click',handleAdd)
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
    tovitData.post_content.push(inputVal)
    
    localStorage.setItem("post-items",JSON.stringify(tovitData.post_content))

    updateListUI()
    window.helpers.toaster('נוסף בהצלחה')
    input.value = ""  
}

function handleInputError(text) {
    const errorEl = document.getElementById('input-error');
    errorEl.innerHTML = text
}


async function handleSubmit(e){
    const btns = form.querySelectorAll('button')
    const toggleDiv = form.querySelector('.toggle-div')
    const icons = allData.querySelectorAll('.del-icon')

    toggle.onclick = null
    btns.forEach((btn,i)=>{
        btn.disabled = true;
        btn.classList.remove('confirm')
        btn.classList.remove('primary')
        btn.classList.add('disabled')
        
        if(i === btns.length-1){
            const shareTo = `${tovitData.public ? 'מפרסם לכולם' : 'מפרסם לעצמי'}`
            btn.innerHTML = shareTo
            
            const textInterval = setInterval(()=>{
                btn.innerHTML += "."
            },1000)
            setTimeout(()=>clearInterval(textInterval),3000)
        }
    })
    icons.forEach(icon=>{
        icon.classList.add('disabled')
    })
    toggleDiv.classList.add('disabled')
    switcher.classList.add('disabled')
    let stringifyedPost = ""
    tovitData.post_content.forEach((item,i)=>{       
        if(i === tovitData.post_content.length-1){
            stringifyedPost+=item
        }
        else {stringifyedPost+= item+"%"}
    } )
    tovitData.post_content = stringifyedPost;   
try {    
    let method = postedToday ? "PATCH" : "POST"
    let url = postedToday ? `/api/tovits/${tovitData.id}` : `/api/tovits?userId=${userData.id}`
    if(postedToday && !stringifyedPost.length){
        url = `/api/tovits/${tovitData.id}`
        method = 'DELETE'
    }
    const res = await fetch(url,{
        method: method,
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tovitData)
    })
    if(!res.ok){
        throw new Error('שיתוף הפוסט נכשל, נא לנסות שוב בעוד מספר רגעים.')
    }
    const data = await res.json()
    localStorage.removeItem('post-items')
    window.helpers.toaster(data.message)
    await window.helpers.delay(500)
    window.location.replace('/')
    
} catch (error) {
    window.helpers.toaster(error.message,'fail')
    window.closeModal();
}

}


function updateListUI(){
    allData.innerHTML = ""
    tovitData?.post_content?.forEach((tov,i)=>{
    let markup = `
    <div class="form-data-list el-${i} ">
    <p class="text">${tov}</p>
    <img src=${delIcon} class="icon-${i} icons icons-small del-icon" alt='delete' />
    </div>
    `
    
    allData.insertAdjacentHTML('afterbegin',markup)
    const icon = document.querySelector(`.icon-${i}`)
    icon?.addEventListener('click',()=>handleDelete(i))
})    

}

function updateToggleUI() {
    submitBtn.innerHTML = tovitData.public ? "שיתוף לכולם" : "שיתוף"
}

function handleDelete(num){
    const a = document.querySelector(`.el-${num}`)
    tovitData.post_content.splice(num,1)
    // const elNum = e.target.classList[0].split("-").at(1)
    a.remove();    
    localStorage.setItem("post-items",JSON.stringify(tovitData.post_content))
    window.helpers.toaster("נמחק בהצלחה","delete")
}

if(tovitData.post_content.length) updateListUI()

}

const createTovitBtn = document.querySelectorAll('.create-tovit');
if(createTovitBtn?.length){
    createTovitBtn.forEach(btn=>{
btn.onclick= ()=>{
    const todaysPost = JSON.parse(btn.getAttribute('data-todays-post'));
    const userData = JSON.parse(btn.getAttribute('data-user'));
    const bgOptArr = JSON.parse(btn.getAttribute('data-bg-options'));
    
    loadTovit(todaysPost,userData,bgOptArr)}
    })

}
