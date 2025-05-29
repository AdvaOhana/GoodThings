
async function handleSubmit(event) {
    event.preventDefault();
    const inputs = document.querySelectorAll('input')
    const code = Array.from(inputs, input => input.value).join("")
    if (code.length !== 6) window.helpers.toaster("Code needs to be 6 digits", "fail")

    const params = new URLSearchParams(window.location.search);
    params.set('UFC', code)
    const res = await fetch(`api/users/verifyCode?${params.toString()}`, {
        method: 'POST', headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json();
    console.log(data.redirectUrl);

    document.location.replace(data.redirectUrl ?? '/')

}




if (window.location.pathname.toLocaleLowerCase() === '/codeverify') {
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.querySelector('.forgot-form');
        form.addEventListener('submit', handleSubmit)

        const inputs = document.querySelectorAll('input')
        inputs.forEach((input, i) => {
            input.addEventListener('keydown', function (e) {
                if (/^\d$/.test(e.key)) {
                    e.preventDefault();
                    input.value = e.key;

                    if (i < inputs.length - 1) {
                        inputs[i + 1].focus();
                    }
                } else if (e.key === "Backspace") {
                    e.preventDefault();

                    input.value = "";
                    if (i > 0) {
                        inputs[i - 1].focus();
                    }
                }
                if (!/^\d$/.test(e.key) && e.key !== 'Enter') {
                    e.preventDefault()
                    input.value = ""
                }

            })
        })


    })
}



if (window.location.pathname.toLocaleLowerCase() === '/resetpassword') {
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.querySelector('.update-form');
        const inputs = document.querySelectorAll('input')
        console.log(form);
        form.addEventListener('submit', handleResetPassword)



        async function handleResetPassword(event) {
            event.preventDefault();
            if (inputs[0].value !== inputs[1].value) {
                return
            }
            console.log(inputs[0].value);

            const res = await fetch('/api/users/updatePassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: inputs[0].value })
            })
            const data = await res.json()
            console.log(data.redirectUrl);
            document.location.replace(data.redirectUrl ?? '/')
        }
    })
}