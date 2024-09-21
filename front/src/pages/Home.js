import { Header } from '../components/Header.js';
import { Main } from '../components/Main.js';
import { Footer } from '../components/Footer.js';
import { renderView } from '../router/router.js';

window.addEventListener('popstate', renderView)
document.addEventListener("DOMContentLoaded", renderView);

const body = document.getElementById('root')
export default function Home() {
    body.innerHTML = ''
    body.insertAdjacentElement('beforeend', Header())
    body.insertAdjacentElement('beforeend', Main())
    body.insertAdjacentElement('beforeend', Footer())
}

