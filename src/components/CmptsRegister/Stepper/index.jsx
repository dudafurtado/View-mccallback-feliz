import './style.css';

import { stepperInstructions } from '../../../utils/StepperInstructions';
import { StepperOneIcon, StepperTwoIcon, StepperThreeIcon } from '../../../utils/ImportSteppers';

function Stepper({ currentStep }) {
  return (
    <article className="Stepper">
      <section>
        <img 
        src={currentStep === 'basicData' ? StepperOneIcon :
        currentStep === 'password' ? StepperTwoIcon :
        currentStep === 'signUpCompleted' ? StepperThreeIcon : ''} 
        alt="Indicador das etapas a serem concluídas para o cadastro" 
        />
      </section>
      <section className='StepperInstructions'>
        {stepperInstructions.map((eachStep) => (
          <div key={eachStep.id}>
            <strong className='StepperTitle'>
              {eachStep.title}
            </strong>
            <span className='StepperDescription'>
              {eachStep.description}
            </span>
          </div>
        ))}
      </section>
    </article>
  );
}

export default Stepper;