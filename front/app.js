import { renderView } from './src/router/router.js';

window.addEventListener('popstate', renderView)
document.addEventListener("DOMContentLoaded", renderView);

