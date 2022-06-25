import "./style.css";
import { useState, useEffect } from "react";

import { userDataService } from "../../../services/userService";

import { getItem } from "../../../utils/Storage"
import { toast } from "react-toastify";
import useUser from "../../../hooks/useUser"

import ProfileOptions from "../ProfileOptions";
import ModalUpdateRegistration from "../../../components/Modals/ModalUpdateRegistration";

import Arrowprofile from "../../../assets/arrowprofile.svg";
import Avatar from '@mui/material/Avatar';

export default function Header() {

  const { title, isActive, openModalUpdate, openEdit, setOpenEdit } = useUser()
  const [user, setUser] = useState('');

  const token = getItem('token')

  async function loadUser() {
    try {
      const { data, error } = await userDataService('/user', token);
      if (error) {
        return toast.error(data);
      }

      const avatarName = data.name.split(' ');

      const avatarLetters = (avatarName.length === 1 ?
        data.name.split(' ')[0][0] + data.name.split(' ')[0][1] :
        data.name.split(' ')[0][0] + data.name.split(' ')[avatarName.length - 1][0]);

      const twoNames = (avatarName.length > 2 ?
        avatarName[0] + " " + avatarName[avatarName.length - 1] :
        data.name)

      setUser({ ...data, avatar: avatarLetters, twoNames })
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    loadUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModalUpdate])

  return (
    <article className="HeaderContainer">
      <section className="HeaderContent">
        <div className={isActive === "home" ? "HeaderTitle" : "HeaderTitleSmall"}>
          {isActive === "home" ? (<h1 className="TitleHome">Resumo das cobranças</h1>) :
            isActive === "debt-collection" ? (<span className="GreenTitlePage">Cobranças</span>) :
              (<span className="GreenTitlePage">Clientes</span>)}
          {(isActive === "clients" && title !== "Clientes") &&
            (<div className="ContainerDetailClient">
              <span className="GrayTitlePage">{'>'}</span>
              <span className="GrayTitlePage">Detalhes do Cliente</span>
            </div>)}
        </div>
        <div className="ContainerUser">
          <div className="ContainerInfos">
            <Avatar sx={{
              bgcolor: "#DEDEE9",
              color: "#0E8750"
            }} children={user.avatar} />
            <h2 className="NameUserHeader">{user.twoNames}</h2>
            <img
              src={Arrowprofile}
              alt="Seta indicativa para abrir um elemento para baixo"
              className="ArrowProfile"
              onClick={() => setOpenEdit(!openEdit)}
            />
            {openEdit &&
              <ProfileOptions />}
          </div>
        </div>
      </section>
      <section>
        {
          openModalUpdate &&
          <ModalUpdateRegistration />
        }
      </section>
    </article>
  );
}
