const modifyDataToTable = (data) => Object.values(data.Valute);

export const getDataToDate = async (date) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const response = await fetch(`https://www.cbr-xml-daily.ru/archive/${date}/daily_json.js`, requestOptions)
    const result = await response.json();

    return modifyDataToTable(result)
}

