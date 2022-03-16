import moment from "moment";
const modifyDataToTable = (data) => Object.values(data.Valute);

export const getDataToDate = async (date) => {
    const response = await fetch(`https://www.cbr-xml-daily.ru/archive/${date}/daily_json.js`)
    const result = await response.json();
    return modifyDataToTable(result)
}

export const getData10days = async (fromDate, charCode) => {
    const dataArray = [];
    for (let i = 0; i <= 10; i += 1) {
        const date = String(moment(fromDate).subtract(i, 'days').format("YYYY/MM/DD"))
        try {
            const response = await fetch(`https://www.cbr-xml-daily.ru/archive/${date}/daily_json.js`)
            const result = await response.json();
            dataArray.push({ date_: date, value: result.Valute[charCode].Value })
        } catch {
            console.log(`Error get data on ${date}`)
        }
    }
    return dataArray;
}