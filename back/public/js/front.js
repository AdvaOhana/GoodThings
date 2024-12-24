//signup page function and elements
const emailInput = document.getElementById('email-input')
const flagContainer = document.getElementById('flag')
const flagIcon = document.createElement('img')
document.getElementById('country')?.addEventListener('change',(e)=>{
    const [name,icon] = e.target.value.split('#')
        flagIcon.alt = name
        flagIcon.className = 'icons-small'
        flagIcon.src = icon
        flagContainer.appendChild(flagIcon)
})

//login page function and elements


//forgot-password page function and elements

document.querySelector('.forgot-form')?.addEventListener('submit',(e)=>{
    e.preventDefault()
    const inputValue = e.target[0].value
}
)



function toggleTheme(){
const moonIcon = '../../assets/icons/moon-regular.svg'
const sunIcon = '../../assets/icons/sun-regular.svg'

icon = document.querySelector(".theme-icon")

    userData.defTheme = userData.defTheme === 'dark' ? "light" : "dark"
    icon.src = userData.defTheme === 'dark' ? sunIcon :moonIcon

    document.body.className = userData.defTheme
    
}


