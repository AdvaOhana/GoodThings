
async function handleSubmit(event) {
    event.preventDefault();
    const inputs = document.querySelectorAll('input')
    const code = Array.from(inputs, input => input.value).join("")
    if (code.length !== 6) window.helpers.toaster("Code needs to be 6 digits", "fail")


    //handle Fetch to the server with the code to the route of verifyCode "api/users/verifyCode"
    //if the code is not valid let him keep try, do not redirect him !
    //if the is wrong the inputs should be cleared

}





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
