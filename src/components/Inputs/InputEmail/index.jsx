import './style.css';
import { toast } from 'react-toastify';

function InputEmail({ label, placeholder, value, action }) {
    function handleDenySpace(e) {
      const key = e.keyCode;
      if(key === 32) {
        return toast.warning('Não é permitido usar o espaçamento no campo email');
      }
    }

    return (
        <section className='InputEmail'>
          <label
          className='LabelForm' 
          htmlFor='inputEmail'>
              {label}
          </label>
          <input 
          id='inputEmail'
          className='InputEmailType'
          type='text'
          value={value}
          placeholder={placeholder}
          onChange={(e) => action(e.target.value)}
          onKeyDown={(e) => handleDenySpace(e)} 
          />
        </section>
    )
    
}

export default InputEmail;