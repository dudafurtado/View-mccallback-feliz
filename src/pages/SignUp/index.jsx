import './style.css';
import { useState, useEffect } from 'react';

import Stepper from '../../components/CmptsRegister/Stepper';
import RegisterForm from '../../components/Forms/RegisterForm';
import SignUpCompleted from '../../components/CmptsRegister/SignUpCompleted';
import Sliders from '../../components/CmptsRegister/Sliders';

import { WakeUpService } from '../../services/utilService'
import { toast } from 'react-toastify';

function SignUp() {
  const [currentStep, setCurrentStep] = useState('basicData');

  useEffect(() => {
    WakeUpAPI();
  }, [])

  const WakeUpAPI = async () => {
    try {
      await WakeUpService();
      toast.success("Seja bem-vindo(a)!")
    } catch(error) {
      return
    }
  }

  return (
    <article className="SignUp"> 
      <aside>
        <Stepper currentStep={currentStep} />
      </aside>
      <main>
        {currentStep === 'signUpCompleted' ? <SignUpCompleted /> : 
        <RegisterForm 
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        />}
        <Sliders 
        currentStep={currentStep}
        />
      </main>
    </article>
  );
}

export default SignUp;