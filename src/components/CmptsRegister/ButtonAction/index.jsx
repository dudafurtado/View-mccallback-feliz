import './style.css';

function ButtonAction({ button }) {
    return (
        <button type='submit' className='Action ButtonForm'>
          {button}
        </button>
    )
}

export default ButtonAction;