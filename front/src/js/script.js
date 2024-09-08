import { getStorage } from '../helpers/globalHelpers.js'
import { loadForm } from './tovitForm.js';
const hamburger = document.querySelector('#hamburger');
const menu = document.querySelector('.menu');
const formBtn = document.querySelectorAll('.show-form')
let inputsData = getStorage('inputs-data') || []

hamburger.addEventListener('click', (e) => {
    menu.classList.toggle('hidden');
    function closeMenu(e) {
        if (e.target === e.currentTarget) {
            menu.classList.toggle('hidden')
            document.body.removeEventListener('click', closeMenu)
        }
    }
    document.body.addEventListener('click', closeMenu)
});

formBtn.forEach(btn => btn.addEventListener('click', () => loadForm(inputsData)))


