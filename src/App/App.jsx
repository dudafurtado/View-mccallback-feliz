import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Routes from "../routes/index";
import { UserProvider } from '../contexts/UserContexts';

function App() {
  return (
    <>
      <UserProvider>
        <ToastContainer theme="light" style={{ width: '36rem', fontSize: '1.6rem' }} />
        <article className="App">
          <Routes />
        </article>
      </UserProvider>
    </>
  );
}

export default App;
