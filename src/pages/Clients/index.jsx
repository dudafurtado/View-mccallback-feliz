import "./style.css";

import { useEffect } from "react";

import { useNavigate } from 'react-router-dom';
import { getItem } from '../../utils/Storage';

import useUser from "../../hooks/useUser";

import Header from "../../components/CmptsHeader/Header";
import ClientsListItems from '../../components/Lists/ClientsListItems';
import ModalCreateClients from "../../components/Modals/ModalCreateClient";
import ModalCreateDebt from "../../components/Modals/ModalCreateDebt";
import Sidebar from "../../components/Sidebar";
import ClientsTitle from '../../components/Title/ClientsTitle';

function Clients() {
  const { openModalClient, openModalCreateDebt, setTitle, setIsActive } = useUser()

  const navigate = useNavigate();

  useEffect(() => {
    const token = getItem('token');
    if (!token) {
      navigate('/login');
    }

    setTitle("Clientes")
    setIsActive("clients");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className="ClientsPage">
      <Sidebar />
      <main className="ContentClients">
        <Header title='Clients' />
        <article className="Clients">
          <section className="ClientsListContainer">
            <ClientsTitle />
            <ClientsListItems />
          </section>
        </article>
        {openModalClient &&
          <ModalCreateClients />
        }
        {openModalCreateDebt &&
          <ModalCreateDebt />
        }
      </main>
    </article>
  );
}

export default Clients;
