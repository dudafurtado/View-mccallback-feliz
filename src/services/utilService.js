const BASE_URL = "https://mc-callback.herokuapp.com";

async function searchZipcode(value) {
    try {
        const response = await fetch('https://viacep.com.br/ws/' + value + '/json', {
            method: "GET"
        });

        const responseData = await response.json();

        return { data: responseData };
    } catch (error) {
        return error.message
    }
}

async function WakeUpService() {
    const response = await fetch(BASE_URL + "/wakeup", {
        method: "GET",
    });

    const responseData = await response.json();

    return { data: responseData, ok: response.ok };
}

export {
    searchZipcode,
    WakeUpService
}