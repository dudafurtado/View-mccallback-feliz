import { schemaAlert } from '../messages/messageSchema';

const yup = require('./config');

const signUpUserStepOne = yup.object().shape({
    nameForm: yup.string().required(schemaAlert.nameRequired),
    emailForm: yup.string().email(schemaAlert.emailValid).required(schemaAlert.emailRequired)
});

const signUpUserStepTwo = yup.object().shape({
    passwordForm: yup.string().required(schemaAlert.passwordRequired),
    confirmPasswordForm: yup.string().required(schemaAlert.confirmPasswordRequired)
});

const loginUser = yup.object().shape({
    emailForm: yup.string().email(schemaAlert.emailValid).required(schemaAlert.emailRequired),
    passwordForm: yup.string().required(schemaAlert.passwordRequired)
});

const editUser = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required()
});

export {
    signUpUserStepOne,
    signUpUserStepTwo,
    loginUser,
    editUser
}