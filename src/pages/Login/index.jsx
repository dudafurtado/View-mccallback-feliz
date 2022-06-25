import './style.css';
import { useEffect } from 'react';
import { toast } from 'react-toastify'

import LoginForm from '../../components/Forms/LoginForm';
import { WakeUpService } from "../../services/utilService";

function Login() {
  useEffect(() => {
    WakeUpApi();
  }, [])

  const WakeUpApi = async () => {
    try {
      const { data, error } = await WakeUpService();

      if (error) {
        return toast.error(data);
      }
      
      return toast.info(data);
    } catch (error) {
      return toast.error(error);
    }
  }

  return (
    <article className="Login">
      <aside>
        <h1 className='TitleLogin'>
          Gerencie todos os pagamentos da sua empresa em um só lugar.
        </h1>
      </aside>
      <main>
        <LoginForm />
      </main>
    </article>
  );
}

export default Login;