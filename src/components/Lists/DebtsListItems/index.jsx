import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./style.css";

import { listDebtsService } from "../../../services/debtService";
import { getItem } from "../../../utils/Storage";

import useUser from "../../../hooks/useUser";

import ArrowsOrganizeIcon from "../../../assets/arrowclients.svg";
import EditPencilIcon from "../../../assets/edit-debt.svg";
import NoResults from "../../../assets/noresults.svg";
import TrashIcon from "../../../assets/trash-debt.svg";

const { format } = require("date-fns");

function DebtsListItems() {
  const {
    debtsList,
    setDebtsList,
    setCurrentDebt,
    setOpenModalUpdateDebt,
    openModalUpdateDebt,
    searchDebts,
    setSearchDebts,
    setOpenModalDebtDetails,
    setOpenModalDelDebt,
    openModalDelDebt
  } = useUser();
  const [sort, setSort] = useState(true);

  const token = getItem("token");

  useEffect(() => {
    loadDebts();
    setSearchDebts("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModalUpdateDebt, openModalDelDebt]);

  async function handleSortName() {
    const localDebt = debtsList;
    if (sort) {
      localDebt.sort((a, b) => (a.name > b.name ? 1 : -1));
      setSort(false);
    } else {
      localDebt.sort((a, b) => (a.name < b.name ? 1 : -1));
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

  async function loadDebts() {
    try {
      if (searchDebts) {
        const { data, ok } = await listDebtsService(token, searchDebts);
        if (!ok) {
          setDebtsList([]);
          return toast.warning(data);
        }

        setDebtsList(data);
      } else {
        const { data, ok } = await listDebtsService(token);
        if (!ok) {
          setDebtsList([]);
          return toast.warning(data);
        }

        setDebtsList(data);
      }
    } catch (error) {
      toast.error(error.message);
    }
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
    <article className="DebtsListItems">
      <header className="IndexDebtsList">
        <div onClick={() => handleSortName()} className="Sort">
          <img
            src={ArrowsOrganizeIcon}
            alt="Organizador através do nome do cliente"
          />
          <span>Cliente</span>
        </div>
        <div onClick={() => handleSortId()} className="Sort">
          <img
            src={ArrowsOrganizeIcon}
            alt="Icone que organiza o id no formato crescente"
          />
          <span>ID Cob.</span>
        </div>
        <span>Valor</span>
        <span>Data de venc.</span>
        <span>Status</span>
        <span>Descrição</span>
        <span></span>
        <span></span>
      </header>
      {debtsList.length !== 0 ? (
        debtsList.map((eachDebt) => (
          <a href="#modal">
            <section
              className="EachDebt"
              key={eachDebt.id}
            >
              <span className='ClientName'
                onClick={() => displayDebtDetails(eachDebt.id)}
              >{eachDebt.name}</span>
              <span className='ClientID'
                onClick={() => displayDebtDetails(eachDebt.id)}
              >{eachDebt.id}</span>
              <span className='DebtValue'
                onClick={() => displayDebtDetails(eachDebt.id)}
              >              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(eachDebt.value / 100)}
              </span>
              <span className='DebtDueDate'
                onClick={() => displayDebtDetails(eachDebt.id)}
              >{format(new Date(eachDebt.due_date), "dd/MM/y")}</span>
              <span
                className={eachDebt.status === 'Vencida' ? 'DebtsStatus Expired' :
                  eachDebt.status === 'Pendente' ? 'DebtsStatus Pending' : 'DebtsStatus Paid'}
                onClick={() => displayDebtDetails(eachDebt.id)}
              >
                {eachDebt.status}
              </span>
              <span className='DebtsDescription'
                onClick={() => displayDebtDetails(eachDebt.id)}
              >{eachDebt.description}</span>
              <button onClick={() => editDebt(eachDebt.id)}>
                <img
                  src={EditPencilIcon}
                  alt="Icone indicando a possibilidade de editar o cliente"
                />
                <span className="EditWord">Editar</span>
              </button>
              <button onClick={() => delDebt(eachDebt.id)}>
                <img src={TrashIcon} alt="Icone para apagar o cliente" />
                <span className="DeleteWord">Excluir</span>
              </button>
            </section>
          </a>
        ))
      ) : (
        <img src={NoResults} alt="No results" />
      )}
    </article>
  );
}

export default DebtsListItems;
