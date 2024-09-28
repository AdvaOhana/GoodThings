import { renderView } from './src/router/router.js';
import { globalState } from './src/state/store.js';



if (globalState.getState().isAuthenticated) {
    window.addEventListener('popstate', () => renderView())
    document.addEventListener("DOMContentLoaded", () => renderView());
}
else {
    document.addEventListener("DOMContentLoaded", () => renderView('/login'));
}