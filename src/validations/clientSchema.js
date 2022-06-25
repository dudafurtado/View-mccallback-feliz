const yup = require('./config');

const createClient = yup.object().shape({
    name: yup.string().required().max(180),
    email: yup.string().email().required().max(100),
    cpf: yup.string().max(14),
    phoneNumber: yup.string().max(15)
});

const editClient = yup.object().shape({
    name: yup.string().required().max(180),
    email: yup.string().email().required().max(100),
    cpf: yup.string().max(14),
    phoneNumber: yup.string().max(15)
});

export {
    createClient,
    editClient
}