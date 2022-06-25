const yup = require('./config');

const createDebt = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    expireDate: yup.string().required(),
    price: yup.string().required(),
    status: yup.string().required()
});

const editDebt = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    expireDate: yup.string().required(),
    price: yup.string().required(),
    status: yup.string().required()
});

export {
    createDebt,
    editDebt
}