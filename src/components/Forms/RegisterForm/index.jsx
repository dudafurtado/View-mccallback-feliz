import './style.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signUpUserStepOne, signUpUserStepTwo } from '../../../validations/userSchema';
import { emailExistsForUser, signUpService } from '../../../services/userService';
import { setItem, getItem, removeItem } from '../../../utils/Storage';

import { nameSignUp, emailSignUp, passwordSignUp, confirmPasswordSignUp } from '../../../utils/InputsValues';
import { actionBasicData, actionPassword } from '../../../utils/ButtonsValues';

import InputText from '../../Inputs/InputText';
import InputEmail from '../../Inputs/InputEmail';
import InputPassword from '../../Inputs/InputPassword';
import ButtonAction from '../../CmptsRegister/ButtonAction';

function RegisterForm({ currentStep, setCurrentStep }) {
  const [nameForm, setNameForm] = useState('');
  const [emailForm, setEmailForm] = useState('');
  const [passwordForm, setpasswordForm] = useState('');
  const [confirmPasswordForm, setConfirmPasswordForm] = useState('');

  const basicDataStep = currentStep === 'basicData';

  async function handleSubmit(e) {
    e.preventDefault();

    const space = passwordForm.includes(' ');
    if (space) {
      return toast.error('Não é permitido fazer o cadastro com espaços na senha');
    }

    try {
      if (basicDataStep) {
        await signUpUserStepOne.validate({ nameForm, emailForm });
      } else {
        await signUpUserStepTwo.validate({ passwordForm, confirmPasswordForm });
      
        if (passwordForm !== confirmPasswordForm) {
          return toast.warning('As senhas precisam ser iguais');
        }
      }

      handleSignUp();
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleSignUp() {
    try {
      if (basicDataStep) {
        const { data, ok } = await emailExistsForUser({
          email: emailForm
        });

        if (!ok) {
          return toast.error(data);
        }

        toast.success('Vamos para o próximo passo!');

        setItem('name', nameForm);
        setItem('email', emailForm);

        handleClearForm();

        setCurrentStep('password');
      } else {
        const nameStorage = getItem('name');
        const emailStorage = getItem('email');

        const { data, ok } = await signUpService({
          name: nameStorage,
          email: emailStorage,
          password: passwordForm
        });

        if (!ok) {
          return toast.error(data);
        }

        removeItem('email');
        handleClearForm();

        setCurrentStep('signUpCompleted');
      }
    } catch (error) {
      return toast.error(error.message);
    }
  }

  function handleClearForm() {
    if (basicDataStep) {
      setNameForm('');
      setEmailForm('');
    } else {
      setpasswordForm('');
      setConfirmPasswordForm('');
    }
  }

  return (
    <article className="RegisterForm">
      <h2 className='TitleForm'>
        {basicDataStep ? 'Adicione seus dados' : 'Escolha uma senha'}
      </h2>
      <form action="submit" onSubmit={(e) => handleSubmit(e)}>
        <section className='BoxInputOne'>
          {basicDataStep ? 
          <InputText 
          label={nameSignUp.label} 
          placeholder={nameSignUp.placeholder}
          value={nameForm}
          action={setNameForm}
          /> 
          : 
          <InputPassword 
          label={passwordSignUp.label} 
          forgotPassword={passwordSignUp.forgotPassword}
          placeholder={passwordSignUp.placeholder}
          value={passwordForm}
          action={setpasswordForm}
          />}
        </section>
        <section>
          {basicDataStep ? 
          <InputEmail 
          label={emailSignUp.label} 
          placeholder={emailSignUp.placeholder}
          value={emailForm}
          action={setEmailForm} 
          /> 
          : 
          <InputPassword 
          label={confirmPasswordSignUp.label} 
          forgotPassword={confirmPasswordSignUp.forgotPassword}
          placeholder={confirmPasswordSignUp.placeholder}
          value={confirmPasswordForm}
          action={setConfirmPasswordForm}
          />}
        </section>
        <ButtonAction button={basicDataStep ? actionBasicData.action : actionPassword.action} />
      </form>
      <span className='QuestionForm'>
        Já possui uma conta? Faça seu
        <Link className='LinkForm' to='/login'>Login</Link>
      </span>
    </article>
  );
}

export default RegisterForm;