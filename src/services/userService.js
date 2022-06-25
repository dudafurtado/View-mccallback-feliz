const BASE_URL = "https://mc-callback.herokuapp.com";

async function emailExistsForUser({ email }) {
  const response = await fetch(BASE_URL + `/verify/email/${email}`, {
    method: "GET"
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
};

async function signUpService(name, email, password) {
  const response = await fetch(BASE_URL + "/signup", {
    method: "POST",
    body: JSON.stringify(name, email, password),
    headers: {
      "Content-type": "application/json",
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function keepNameOfUser({ email }) {
  const response = await fetch(BASE_URL + `/user/name/${email}`, {
    method: "GET"
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
};

async function loginService(email, password) {
  const response = await fetch(BASE_URL + "/login", {
    method: "POST",
    body: JSON.stringify(email, password),
    headers: {
      "Content-type": "application/json",
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function userDataService(resource, token) {
  const response = await fetch(BASE_URL + resource, {
    method: "GET",
    headers: {
      'token': token
    }
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
};

async function editUserService(resource, data, token) {
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

export {
  emailExistsForUser,
  signUpService,
  keepNameOfUser,
  loginService,
  userDataService,
  editUserService
};