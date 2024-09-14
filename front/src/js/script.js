import { Header } from '../components/Header.js';
import { Main } from '../components/Main.js';
import { Footer } from '../components/Footer.js';



const body = document.getElementById('root')
body.insertAdjacentElement('beforeend', Header())
body.insertAdjacentElement('beforeend', Main())
body.insertAdjacentElement('beforeend', Footer())


