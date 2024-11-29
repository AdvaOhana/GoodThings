import { renderView } from './src/router/router.js';
import { globalState } from './src/state/store.js';


// localStorage.setItem('auth', true)
window.addEventListener('popstate', () => renderView())
document.addEventListener("DOMContentLoaded", () => renderView());
// if (globalState.getState().isAuthenticated) {
// }
// else {
//     document.addEventListener("DOMContentLoaded", () => renderView('/login'));
// }