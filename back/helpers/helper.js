const lettersReg = /[a-zA-Z]/g
const generateCode = (codeLenght) => {
    let code = ""
    for (let i = 0; i < codeLenght; i++) {
        const options = [Math.floor(Math.random() * 11) + 48, Math.floor(Math.random() * 26) + 65, Math.floor(Math.random() * 26) + 97]
        code += String.fromCharCode(options[Math.floor(Math.random() * 3)]);
    }
    return code
}


async function getCountries() {
    try {
        const res = await fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=9980228a-e0e9-4b17-b5a6-5a0b76cd700c`)
        if (!res.ok) throw new Error('Failed to fetch countries.')
        let data = await res.json()
    
    data = data.result.records.map(country => { return { name: country.Hebrew_Name, flag:
        `https://flagsapi.com/${country.Alfa_2_Code}/shiny/64.png`
     } })
    
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
    lettersReg, generateCode, getCountries
}