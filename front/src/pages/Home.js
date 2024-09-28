import { Header } from '../components/Header.js';
import { Main } from '../components/Main.js';
import { Footer } from '../components/Footer.js';

const body = document.getElementById('root')

export default function Home() {
    body.innerHTML = ''
    body.appendChild(Header())
    body.appendChild(Main())
    body.appendChild(Footer())
}


