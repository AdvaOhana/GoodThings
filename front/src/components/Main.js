export function Main() {
    const markup = `
            <div id="data-continer">
            <div class="thing-info" onclick="">
                <h4>תאריך: <span>30/8/24</span></h4>
                <ul>
                    <li>יום הולדת</li>
                    <li>כסף </li>
                    <li>חתונה </li>
                </ul>
            </div>
            <div class="thing-info">
                <h4>תאריך: <span>30/8/24</span></h4>
                <ul>
                    <li>יום הולדת</li>
                    <li>כסף </li>
                    <li>חתונה </li>
                </ul>
            </div>
            <div class="thing-info">
                <h4>תאריך: <span>30/8/24</span></h4>
                <ul>
                    <li>יום הולדת</li>
                    <li>כסף </li>
                    <li>חתונה </li>
                </ul>
            </div>
            <div id="add-thing">
                <label>בחר תאריך:</label> <input type="date">
                <button>הוספה</button>
            </div>
        </div>
        `
    const main = document.createElement('main')
    main.insertAdjacentHTML('afterbegin', markup)
    return main

}