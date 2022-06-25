import './style.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import OpenedEye from '../../../assets/open-eye.svg';
import ClosedEye from '../../../assets/closed-eye.svg';

function InputPassword({ label, forgotPassword, placeholder, value, action }) {
  const [eyeClosed, setEyeClosed] = useState(true);

  function handleDenySpace(e) {
    const key = e.keyCode;
    if(key === 32) {
      toast.warning('Não é permitido usar o espaçamento no campo senha');
    }
  }

  return (
    <section className='InputPassword'>
      <div className='ForgotPassword'>
        <label
          className='LabelForm'
          htmlFor=''>
          {label}
        </label>
        <Link
          className='LinkForm'
          to='#'>
          {forgotPassword}
        </Link>
      </div>
      <input
        className='InputPasswordType'
        type={eyeClosed ? 'password' : 'text'}
        value={value}
        placeholder={placeholder}
        onChange={(e) => action(e.target.value)}
        onKeyDown={(e) => handleDenySpace(e)}
        />
        {eyeClosed ? 
        <img 
        src={ClosedEye} 
        alt='Icone de um olho fechado indicando que não é possível ver a senha' 
        onClick={() => setEyeClosed(false)}
        /> : 
        <img 
        src={OpenedEye} 
        alt='Icone de um olho aberto indicando que é possível ver a senha' 
        onClick={() => setEyeClosed(true)}
        />}
    </section>
  )
}

export default InputPassword;