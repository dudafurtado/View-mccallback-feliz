import './style.css';

import { clearAll } from '../../../utils/Storage';
import { useNavigate } from 'react-router-dom'
import useUser from "../../../hooks/useUser"

import ImgEdit from '../../../assets/edit.svg';
import ImgLogout from '../../../assets/logout.svg';

function ProfileOptions() {
  const { setOpenEdit, setOpenModalUpdate } = useUser()
  const navigate = useNavigate()
  function handleEdit() {
    setOpenModalUpdate(true);
    setOpenEdit(false)
  }
  function handleExit() {
    setOpenEdit(false);
    clearAll()
    navigate("/")
  }
  return (
    <>

      <div className="profile-options">
        <div className="arrow-app"></div>
        <img
          src={ImgEdit}
          alt="Icone para editar o usuário"
          onClick={() => handleEdit()}
        />
        <img
          src={ImgLogout}
          alt="Icone para o usuário sair da conta"
          onClick={() => handleExit()}
        />
      </div>

    </>
  );
}

export default ProfileOptions;
