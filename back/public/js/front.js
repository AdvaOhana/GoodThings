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

