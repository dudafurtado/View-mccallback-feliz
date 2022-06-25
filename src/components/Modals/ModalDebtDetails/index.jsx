import { useEffect, useState } from "react";

import { toast } from 'react-toastify';
import "./style.css";

import { DebtDataService } from "../../../services/debtService";
import { getItem } from "../../../utils/Storage";

import { format } from "date-fns";
import CloseIcon from "../../../assets/close.svg";
import DebtIcon from "../../../assets/debts-page.svg";
import useUser from "../../../hooks/useUser";


function ModalDebtDetails() {
  const { currentDebt, setOpenModalDebtDetails } = useUser()
  const [details, setDetails] = useState({
    name: '',
    description: '',
    dueDate: '',
    value: '',
    id: '',
    status: ''
  });

  const token = getItem('token');
  useEffect(() => {
    async function loadDebt() {
      try {
        const { data, ok } = await DebtDataService(currentDebt, token)

        if (!ok) {
          toast.error(data);
          return
        }
        setDetails({
          name: data.name,
          description: data.description,
          dueDate: format(new Date(data.due_date), 'dd/MM/yyyy'),
          value: data.value,
          id: data.id,
          status: data.status
        });
      } catch (error) {
        toast.error(error.message);
        return
      }
    }
    loadDebt()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <article className="BackdropDebtDetails">
        <section className="ModalDebtDetails" id="modal">
          <img
            src={CloseIcon}
            alt="Icone com um x sinalizando a possibilidade de fechar o modal"
            className="CloseBtnDebtDetails"
            onClick={() => setOpenModalDebtDetails(false)}
          />
          <div className="ModalDebtDetailsTitle">
            <img
              src={DebtIcon}
              alt="Representação das cobranças"
              className="ModalImgDebtDetails"
            />
            <h1>Detalhe da Cobrança</h1>
          </div>
          <strong>Nome</strong>
          <span>{details.name}</span>
          <strong>Descrição</strong>
          <span className="DetailsDescriptionText">{details.description}</span>
          <div className="DetailsDuo DateValue DateValue">
            <div className="FlexColumn">
              <strong>Vencimento</strong>
              <span className="DateValueSize">{details.dueDate}</span>
            </div>
            <div className="FlexColumn">
              <strong>Valor</strong>
              <span className="DateValueSize">              
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(details.value / 100)}</span>
            </div>
          </div>
          <div className="DetailsDuo IdStatus">
            <div className="FlexColumn ">
              <strong>ID cobranças</strong>
              <span>{details.id}</span>
            </div>
            <div className="FlexColumn">
              <strong>Status</strong>
              <span className=
                {details.status === "Vencida" ? "ExpiredDetails" : (details.status === "Pendente" ? "PendingDetails" : "PaidDetails")
                }>{details.status}</span>
            </div>
          </div>
        </section>
      </article>

    </>
  );
}

export default ModalDebtDetails;