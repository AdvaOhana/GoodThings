import { renderView } from './src/router/router.js';
import { globalState } from './src/state/store.js';


// localStorage.setItem('auth', true)
if (globalState.getState().isAuthenticated) {
    window.addEventListener('popstate', () => renderView())
    document.addEventListener("DOMContentLoaded", () => renderView());
}
else {
    document.addEventListener("DOMContentLoaded", () => renderView('/login'));
}