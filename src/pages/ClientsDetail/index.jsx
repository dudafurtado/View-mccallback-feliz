import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

import useUser from "../../hooks/useUser";

import Header from "../../components/CmptsHeader/Header";
import DebtsByClientListItems from "../../components/Lists/DebtsByClientListItems";
import ModalClientsUpdate from "../../components/Modals/ModalClientUpdate";
import ModalCreateDebt from "../../components/Modals/ModalCreateDebt";
import Sidebar from "../../components/Sidebar";

import ModalUptadeDebt from "../../components/Modals/ModalDebtUpdate";
import ModalDelDebt from "../../components/Modals/ModalDebtDel";
import ModalDebtDetails from "../../components/Modals/ModalDebtDetails";

import { toast } from "react-toastify";
import IconClients from "../../assets/iconclients.svg";
import { clientDataService } from "../../services/clientService";
import { cpfMask, phoneMask, zipcodeMask } from "../../utils/Mask";
import { getItem } from "../../utils/Storage";

function ClientsDetail() {
  const {
    openModalClientUpdate,
    setOpenModalClientUpdate,
    setCurrentClient,
    openModalCreateDebt,
    setOpenModalCreateDebt,
    setIsActive,
    setTitle,
    openModalUpdateDebt,
    openModalDelDebt,
    openModalDebtDetails,
    setOpenModalUpdateDebt,
    setOpenModalDebtDetails,
    setOpenModalDelDebt,
  } = useUser();

  const [client, setClient] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    zipcode: "",
    address: "",
    complement: "",
    district: "",
    city: "",
    state: "",
  });

  const token = getItem("token");
  const { id } = useParams();

  useEffect(() => {
    setOpenModalUpdateDebt(false);
    setOpenModalDelDebt(false);
    setOpenModalDebtDetails(false);

    async function loadClient() {
      if (!id) {
        return;
      }

      try {
        const { data, ok } = await clientDataService(id, token);
        if (!ok) {
          return toast.error(data);
        }

        setClient(data);

        setCurrentClient({ id: id, name: data.name });
      } catch (error) {
        return toast.error(error.message);
      }
    }
    loadClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModalClientUpdate]);

  useEffect(() => {
    setTitle(client.name);
    setIsActive("clients");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className="ClientDetail">
      <Sidebar />
      <main className="ContentClientDetail">
        <Header title="ClientDetail" />
        <article className="ClientDetail">
          <section className="ClientDetailContainer">
            <section className="DetailTitle">
              <img src={IconClients} alt="Icone de Clientes" />
              <h1>{client.name}</h1>
            </section>
            <section className="ClientInfo">
              <div className="TitleInfos">
                <h3>Dados do cliente</h3>
                <button onClick={() => setOpenModalClientUpdate(true)}>
                  Editar Cliente
                </button>
              </div>
              <div className="RequiredInfos">
                <div className="Information Email">
                  <h4>E-mail</h4>
                  <span>{client.email}</span>
                </div>
                <div className="Information Phone">
                  <h4>Telefone</h4>
                  <span>{phoneMask(client.phone)}</span>
                </div>
                <div className="Information CPF">
                  <h4>CPF</h4>
                  <span>{cpfMask(client.cpf)}</span>
                </div>
              </div>
              <div className="OptionalInfos">
                <div className="Information Address">
                  <h4>Endereço</h4>
                  <span>{client.address}</span>
                </div>
                <div className="Information District">
                  <h4>Bairro</h4>
                  <span>{client.district}</span>
                </div>
                <div className="Information Complement">
                  <h4>Complemento</h4>
                  <span>{client.complement}</span>
                </div>
                <div className="Information Zipcode">
                  <h4>CEP</h4>
                  <span>{zipcodeMask(client.zipcode)}</span>
                </div>
                <div className="Information City">
                  <h4>Cidade</h4>
                  <span>{client.city}</span>
                </div>
                <div className="Information State">
                  <h4>UF</h4>
                  <span>{client.state}</span>
                </div>
              </div>
            </section>
            <div className="ClientTableDebts">
              <div className="TableTitle">
                <h3>Cobranças do Cliente</h3>
                <button onClick={() => setOpenModalCreateDebt(true)}>
                  Nova cobrança
                </button>
              </div>
              <DebtsByClientListItems
                openModalCreateDebt={openModalCreateDebt}
              />
            </div>
          </section>
        </article>
        {openModalClientUpdate && <ModalClientsUpdate />}
        {openModalCreateDebt && <ModalCreateDebt />}
        {openModalUpdateDebt && <ModalUptadeDebt />}
        {openModalDelDebt && <ModalDelDebt />}
        {openModalDebtDetails && <ModalDebtDetails />}
      </main>
    </article>
  );
}

export default ClientsDetail;
