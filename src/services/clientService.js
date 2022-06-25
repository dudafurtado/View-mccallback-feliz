const BASE_URL = "https://mc-callback.herokuapp.com";

async function createClientService(resource, data, token) {
    const response = await fetch(BASE_URL + resource, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });

    const responseData = await response.json();

    return { data: responseData, ok: response.ok };
};

async function editClientService(resource, data, token) {
    const response = await fetch(BASE_URL + resource, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });

    const responseData = await response.json();

    return { data: responseData, ok: response.ok };
};

async function listClientsService(token, search) {
    if (search) {
        const response = await fetch(BASE_URL + `/client/list?search=${search}`, {
            method: "GET",
            headers: {
                'token': token
            }
        });

        const responseData = await response.json();

        return { data: responseData, ok: response.ok };
    }

    const response = await fetch(BASE_URL + "/client/list", {
        method: "GET",
        headers: {
            'token': token
        }
    });

    const responseData = await response.json();

    return { data: responseData, ok: response.ok };
};

async function clientDataService(id, token) {
    const response = await fetch(BASE_URL + `/client/${id}`, {
        method: "GET",
        headers: {
            'token': token
        }
    });

    const responseData = await response.json();

    return { data: responseData, ok: response.ok };
};

async function countClients (token) {
    const response = await fetch(BASE_URL + '/count/client', {
        method: "GET",
        headers: {
            'token': token
        }
    });

    const responseData = await response.json();

    return { data: responseData, ok: response.ok };
}

async function listDefaulterClients (token) {
    const response = await fetch(BASE_URL + '/list/clients/defaulter', {
        method: "GET",
        headers: {
            'token': token
        }
    });

    const responseData = await response.json();

    return { data: responseData, ok: response.ok };
}

async function listDebtFreeClients (token) {
    const response = await fetch(BASE_URL + '/list/clients/debt-free', {
        method: "GET",
        headers: {
            'token': token
        }
    });

    const responseData = await response.json();

    return { data: responseData, ok: response.ok };
}

export {
    createClientService,
    editClientService,
    listClientsService,
    clientDataService,
    countClients,
    listDefaulterClients,
    listDebtFreeClients
};