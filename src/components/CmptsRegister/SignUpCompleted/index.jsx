import './style.css';

import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import SignUpCompletedIcon from '../../../assets/signup-completed.svg';

function SignUpCompleted() {
  const [toLogin, setToLogin] = useState(false);

  if (toLogin === true) {
    return <Navigate to="/login" />;
  }

  return (
    <article className='SignUpCompleted'>
      <section>
        <img src={SignUpCompletedIcon} alt="Icone de sucesso" />
        <strong className='InformSignUp'>
          Cadastro realizado com sucesso!
        </strong>
      </section>
      <button
        className='ButtonSignUp'
        onClick={() => setToLogin(true)}
      >
        Ir para Login
      </button>
    </article>
  )
}

export default SignUpCompleted;