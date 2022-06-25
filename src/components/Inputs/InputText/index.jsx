import './style.css';

function InputText({ label, placeholder, value, action }) {
    return (
        <section className='InputText'>
          <label 
          className='LabelForm'
          htmlFor='inputText'>
            {label}
          </label>
          <input 
          id='inputText'
          className='InputEmailType'
          type='text'
          value={value}
          placeholder={placeholder}
          onChange={(e) => action(e.target.value)} />
        </section>
    )
}

export default InputText;