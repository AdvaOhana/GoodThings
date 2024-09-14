export function Footer() {
    const markup = `
            <div>
            <p>זכויות שמורות אדווה, שמואל</p>
        </div>
        `
    const footer = document.createElement('footer')
    footer.insertAdjacentHTML('afterbegin', markup)
    return footer

}