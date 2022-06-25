import './style.css';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { keepNameOfUser, loginService } from '../../../services/userService';
import { loginUser } from '../../../validations/userSchema';
import { getItem, setItem } from '../../../utils/Storage';
import { emailLogin, passwordLogin } from '../../../utils/InputsValues';
import { actionLogin } from '../../../utils/ButtonsValues';

import InputEmail from '../../Inputs/InputEmail';
import InputPassword from '../../Inputs/InputPassword';
import ButtonAction from '../../CmptsRegister/ButtonAction';

function LoginForm() {
  const navigate = useNavigate();

  const [emailForm, setEmailForm] = useState('');
  const [passwordForm, setPasswordForm] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await loginUser.validate({ emailForm, passwordForm });
    } catch (error) {
      return toast.error(error.message);
    }
    
    handleLogin();
  }

  async function handleLogin() {
    try {
      const nameStorage = getItem('name');
      if (!nameStorage) {
        const { data, ok } = await keepNameOfUser({
          email: emailForm
        })

        if (!ok) {
          return toast.error(data);
        }

        setItem('name', data);
      }

      const { data, ok } = await loginService({
        email: emailForm,
        password: passwordForm
      });
  
      if (!ok) {
        return toast.error(data);
      }
      
      setItem('token', data.token);
      toast.success('Login realizado com sucesso!');

      handleClearForm();

      return setTimeout(() => {navigate('/home')}, 1100);
    } catch (error) {
      return toast.error(error.message);
    }
  }

  function handleClearForm() {
    setEmailForm('');
    setPasswordForm('');
  }

  return (
    <article className="LoginForm">
      <h2 className='TitleForm'>Faça seu login!</h2>
      <form action="submit" onSubmit={(e) => handleSubmit(e)}>
        <section className='BoxInputOne'>
          <InputEmail 
          label={emailLogin.label} 
          placeholder={emailLogin.placeholder}
          name={emailLogin.name}
          value={emailForm}
          action={setEmailForm} />
        </section>
        <section>
          <InputPassword 
          label={passwordLogin.label} 
          forgotPassword={passwordLogin.forgotPassword}
          placeholder={passwordLogin.placeholder}
          name={passwordLogin.name}
          value={passwordForm}
          action={setPasswordForm} />
        </section>
      <ButtonAction button={actionLogin.action} />
      </form>
      <span className='QuestionForm'>
        Ainda não possui uma conta?  
         <Link className='LinkForm' to='/signup'>Cadastre-se</Link>
      </span>
    </article>
  );
}

export default LoginForm;