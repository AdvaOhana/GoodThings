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
    user: null,
    theme: 'light',
    isAuthenticated: false,
});
