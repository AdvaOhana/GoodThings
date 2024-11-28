const lettersReg = /[a-zA-Z]/g
const generateCode = (codeLenght) => {
    let code = ""
    for (let i = 0; i < codeLenght; i++) {
        const options = [Math.floor(Math.random() * 11) + 48, Math.floor(Math.random() * 26) + 65, Math.floor(Math.random() * 26) + 97]
        code += String.fromCharCode(options[Math.floor(Math.random() * 3)]);
    }
    return code
}


module.exports = {
    lettersReg, generateCode
}