import './style.css';

import SliderInactiveIcon from '../../../assets/slider-inactive.svg';
import SliderActiveIcon from '../../../assets/slider-active.svg';

function Sliders({ currentStep }) {
    return (
        <section className='Sliders'>
          <img 
          src={currentStep === 'basicData' ? SliderActiveIcon : SliderInactiveIcon} 
          alt="Barra indicativa de qual página o usuário se encontra no momento" 
          />
          <img 
          src={currentStep === 'password' ? SliderActiveIcon : SliderInactiveIcon} 
          alt="Barra indicativa de qual página o usuário se encontra no momento" 
          /> 
          <img 
          src={currentStep === 'signUpCompleted' ? SliderActiveIcon : SliderInactiveIcon} 
          alt="Barra indicativa de qual página o usuário se encontra no momento" 
          />
        </section>
    )
}

export default Sliders;