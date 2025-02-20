
//signup page function and elements
// const emailInput = document.getElementById('email-input')
// const flagContainer = document.getElementById('flag')
// const flagIcon = document.createElement('img')
// document.getElementById('country')?.addEventListener('change',(e)=>{
//     const [name,icon] = e.target.value.split('#')
//         flagIcon.alt = name
//         flagIcon.className = 'icons-small'
//         flagIcon.src = icon
//         flagContainer.appendChild(flagIcon)
// })



document.addEventListener('DOMContentLoaded', () => {
    let userListOpen = false;
    const icon = document.querySelector(".theme-icon");
    const moonIcon = '../../assets/icons/moon-regular.svg';
    const sunIcon = '../../assets/icons/sun-regular.svg';
    const user = document.querySelector('#user-actions')
    const list = document.querySelector('.user-btns')

    user.onclick = ()=>{
        userListOpen = userListOpen ? false : true;
        list.style.display = userListOpen ? 'flex' : 'none'       
        list.style.animation = userListOpen ? "showList 0.5s linear forwards" : ""
        const handleOutSideClick = (e)=>{            
                if(e.target !== list && e.target !== user){
                    userListOpen = userListOpen ? false : true;
                    list.style.display = userListOpen ? 'flex' : 'none'       
                    list.style.animation = userListOpen ? "showList 0.5s linear forwards" : ""
                    document.removeEventListener('click',handleOutSideClick)
            }
        }
        document.addEventListener('click',handleOutSideClick)
    }
    
    
    

    const storedTheme = window.helpers.getStorage('theme') || icon.getAttribute('data-theme') || 'light';
    document.body.className = storedTheme;
    icon.src = storedTheme === 'dark' ? sunIcon : moonIcon;
    icon.setAttribute('data-theme', storedTheme);

    icon.addEventListener('click', () => {
        const currentTheme = document.body.className;
        const isDark = currentTheme === 'dark';
        const newTheme = isDark ? 'light' : 'dark'; 

        document.body.className = newTheme;
        icon.src = isDark ? moonIcon : sunIcon;
        icon.setAttribute('data-theme', newTheme);
        window.helpers.setStorage('theme', newTheme);
    });
});

async function logout(){   
    try {
        const res = await fetch ('/api/users/logout')
        if(!res.ok){
            const {error} = await res.json();
            throw new Error(error)
        }
        const {redirectUrl} = await res.json();
        window.helpers.toaster('התנתקת בהצלחה, להתראות !');     
       await  window.helpers.delay(1000)
        window.location.replace(redirectUrl)   
    } catch (error) {
        window.helpers.toaster(error.message,'fail');   
    }
}



