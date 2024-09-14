import { getStorage } from "../helpers/globalHelpers.js";

export class Store {
    constructor(initState) {
        this.state = initState;
        this.listeners = [];
    }

    getState() {
        return this.state
    }
    setState(newState) {
        this.state = { ...this.state, ...newState }
        this.notifyStateChange()
    }
    subscribe(listener) {
        this.listeners.push(listener)
    }
    notifyStateChange() {
        this.listeners.forEach(subscriber => subscriber(this.state))
    }
    getListners() {
        console.log(this.stateListeners);
    }

}

export const globalState = new Store({
    userName: "Shmuel",
    userLName: "Atar",
    inputsData: getStorage('inputs-data') || [],
    theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    isAuthenticated: false,
});
