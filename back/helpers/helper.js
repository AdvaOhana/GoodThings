const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config()
const { EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT, EMAIL_USER } = process.env

const lettersReg = /[a-zA-Z]/
const phoneReg = /^05[0-9]\d{7}$/
const mailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordReg = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/


const generateCode = () => {
    return Math.floor(Math.random() * (999999 - 100000) + 100000)
}

const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: true,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
    },
    tls: { rejectUnauthorized: false }
});



async function getCountries() {
    try {
        const res = await fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=9980228a-e0e9-4b17-b5a6-5a0b76cd700c`)
        if (!res.ok) throw new Error('Failed to fetch countries.')
        let data = await res.json()

        data = data.result.records.map(country => {
            return {
                name: country.Hebrew_Name, flag:
                    `https://flagsapi.com/${country.Alfa_2_Code}/shiny/64.png`
            }
        })

        data.sort((a, b) => {
            return a.name.localeCompare(b.name, 'he')
        })

        return data || [{ name: 'ישראל', flag: "https://flagsapi.com/IL/shiny/64.png" }]
    } catch (error) {
        console.error("Error fetching countries:", error.message);
        return [];
    }
}



module.exports = {
    lettersReg, generateCode, getCountries, transporter,phoneReg,mailReg,passwordReg
}