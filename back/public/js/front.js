

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


document.addEventListener('DOMContentLoaded', () => {
    const icon = document.querySelector(".theme-icon");
    const moonIcon = '../../assets/icons/moon-regular.svg';
    const sunIcon = '../../assets/icons/sun-regular.svg';

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
