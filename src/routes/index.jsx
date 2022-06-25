import { Routes, Outlet, Route, Navigate } from "react-router-dom";

import { getItem } from '../utils/Storage';

import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Clients from '../pages/Clients';
import ClientsDetail from '../pages/ClientsDetail';
import DebtCollection from '../pages/DebtCollection';

function ProtectedRoutes({ redirectTo }) {
  const isAuth = getItem('token');
  return isAuth ? <Outlet /> : <Navigate to={redirectTo} />;
}

function index() {
  return (
    <Routes>
      <Route element={<Login />}>
        <Route path='/' element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path='/signup' element={<SignUp />} />

      <Route element={<ProtectedRoutes redirectTo="/login" />}>
        <Route path='/home' element={<Home />} />
        <Route path='/clients' element={<Clients />} />
        <Route path='/clients/detail/:id' element={<ClientsDetail />} />
        <Route path='/debt-collection' element={<DebtCollection />} />
      </Route>
    </Routes>
  )

};

export default index;

