const BASE_URL = "https://mc-callback.herokuapp.com";

async function createDebtService(data, token) {
    const response = await fetch(BASE_URL + '/debts/create', {
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

async function editDebtService(resource, data, token) {
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

async function listDebtsService(token, search) {
    if (search) {
        const response = await fetch(BASE_URL +
            `/debts?search=${search}`, {
            method: "GET",
            headers: {
                'token': token
            }
        });

        const responseData = await response.json();

        return { data: responseData, ok: response.ok };
    }

    const response = await fetch(BASE_URL + '/debts', {
        method: "GET",
        headers: {
            'token': token
        }
    });

    const responseData = await response.json();

    return { data: responseData, ok: response.ok };
};

async function listDebtsClientService(id, token) {
    const response = await fetch(BASE_URL + `/debts/clients/${id}`, {
        method: "GET",
        headers: {
            'token': token
        }
    });

    const responseData = await response.json();

    return { data: responseData, ok: response.ok };
};

async function DebtDataService(id, token) {
    const response = await fetch(BASE_URL + `/debts/${id}`, {
        method: "GET",
        headers: {
            'token': token
        }
    });

    const responseData = await response.json();

    return { data: responseData, ok: response.ok };
};

async function deleteDebt(id, token) {
    const response = await fetch(BASE_URL + `/debts/delete/${id}`, {
        method: "DELETE",
        headers: {
            'token': token
        }
    });

    const responseData = await response.json();

    return { data: responseData, ok: response.ok };
};

async function sumDebts(token) {
    const response = await fetch(BASE_URL + '/sum/debts', {
        method: "GET",
        headers: {
            'token': token
        }
    });

    const responseData = await response.json();

    return { data: responseData, ok: response.ok };
}

async function countDebts(token) {
    const response = await fetch(BASE_URL + '/count/debts', {
        method: "GET",
        headers: {
            'token': token
        }
    });

    const responseData = await response.json();

    return { data: responseData, ok: response.ok };
}

async function listPaidDebts(token) {
    const response = await fetch(BASE_URL + '/list/debts/paid', {
        method: "GET",
        headers: {
            'token': token
        }
    });

    const responseData = await response.json();

    return { data: responseData, ok: response.ok };
}

async function listExpiredDebts(token) {
    const response = await fetch(BASE_URL + '/list/debts/expired', {
        method: "GET",
        headers: {
            'token': token
        }
    });

    const responseData = await response.json();

    return { data: responseData, ok: response.ok };
}

async function listPendingDebts(token) {
    const response = await fetch(BASE_URL + '/list/debts/pending', {
        method: "GET",
        headers: {
            'token': token
        }
    });

    const responseData = await response.json();

    return { data: responseData, ok: response.ok };
}

export {
    createDebtService,
    editDebtService,
    listDebtsService,
    listDebtsClientService,
    deleteDebt,
    sumDebts,
    countDebts,
    listPaidDebts,
    listExpiredDebts,
    listPendingDebts,
    DebtDataService
}
