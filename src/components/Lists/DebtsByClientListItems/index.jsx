import "./style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { listDebtsClientService } from "../../../services/debtService";
import { getItem } from "../../../utils/Storage";

import ArrowsOrganizeIcon from "../../../assets/arrowclients.svg";
import EditPencilIcon from "../../../assets/edit-debt.svg";
import TrashIcon from "../../../assets/trash-debt.svg";
import useUser from "../../../hooks/useUser";

const { format } = require("date-fns");

function DebtsByClientListItems({ openModalCreateDebt }) {
  const [debtsList, setDebtsList] = useState([]);
  const [sort, setSort] = useState(true);
  const {
    setCurrentDebt,
    setOpenModalUpdateDebt,
    openModalUpdateDebt,
    setOpenModalDebtDetails,
    setOpenModalDelDebt,
    openModalDelDebt
  } = useUser();

  const token = getItem("token");
  const { id } = useParams();

  useEffect(() => {
    async function loadDebts() {
      if (!id) {
        return toast.error("Por favor escolha novamente o cliente!");
      }

      try {
        const { data, ok } = await listDebtsClientService(id, token);
        if (!ok) {
          return toast.warning(data);
        }

        setDebtsList(data);
      } catch (error) {
        return toast.error(error.message);
      }
    }
    loadDebts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModalCreateDebt, openModalUpdateDebt, openModalDelDebt]);

  async function handleSortDate() {
    const localDebt = debtsList;
    if (sort) {
      localDebt.sort((a, b) => (a.due_date > b.due_date ? 1 : -1));
      setSort(false);
    } else {
      localDebt.sort((a, b) => (a.due_date < b.due_date ? 1 : -1));
      setSort(true);
    }
    setDebtsList(localDebt);
  }

  async function handleSortId() {
    const localDebt = debtsList;
    if (sort) {
      localDebt.sort((a, b) => (a.id > b.id ? 1 : -1));
      setSort(false);
    } else {
      localDebt.sort((a, b) => (a.id < b.id ? 1 : -1));
      setSort(true);
    }
    setDebtsList(localDebt);
  }

  function editDebt(id) {
    setCurrentDebt(id);
    setOpenModalUpdateDebt(true);
  }

  function displayDebtDetails(id) {
    setCurrentDebt(id);
    setOpenModalDebtDetails(true);
  }

  function delDebt(id) {
    setCurrentDebt(id);
    setOpenModalDelDebt(true);
  }

  return (
    <article className="DebtsListItemsClient">
      <header className="IndexDebtsListClient">
        <div onClick={() => handleSortId()} className="Sort">
          <img
            src={ArrowsOrganizeIcon}
            alt="Icone que organiza o id no formato crescente"
          />
          <span>ID Cob.</span>
        </div>
        <div onClick={() => handleSortDate()} className="Sort">
          <img
            src={ArrowsOrganizeIcon}
            alt="Icone que organiza o id no formato crescente"
          />
          <span>Data de venc.</span>
        </div>
        <span>Valor</span>
        <span>Status</span>
        <span>Descrição</span>
      </header>
      {
        debtsList.map((eachDebt) => (
          <a href="#modal">
            <section
              className='EachDebtClient'
              key={eachDebt.id}>
              <span
                onClick={() => displayDebtDetails(eachDebt.id)}
              >{eachDebt.id}</span>
              <span
                onClick={() => displayDebtDetails(eachDebt.id)}
              >{format(new Date(eachDebt.due_date), "dd/MM/y")}</span>
              <span
                onClick={() => displayDebtDetails(eachDebt.id)}
              >
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                }).format(eachDebt.value / 100)}
              </span>
              <span
                className={eachDebt.status === "Vencida" ? "ExpiredClient" :
                  (eachDebt.status === "Pendente" ? "PendingClient" : "PaidClient")}
                onClick={() => displayDebtDetails(eachDebt.id)}
              >
                {eachDebt.status}
              </span>
              <span className='Description'
                onClick={() => displayDebtDetails(eachDebt.id)}
              >{eachDebt.description}</span>
              <button onClick={() => editDebt(eachDebt.id)}>
                <img
                  src={EditPencilIcon}
                  alt="Icone indicando a possibilidade de editar o cliente"
                />
                <span className='EditWord'>Editar</span>
              </button>
              <button onClick={() => delDebt(eachDebt.id)}>
                <img
                  src={TrashIcon}
                  alt="Icone para apagar o cliente"
                />
                <span className='DeleteWord'>Excluir</span>
              </button>
            </section>
          </a>
        ))
      }
    </article>
  );
}

export default DebtsByClientListItems;
