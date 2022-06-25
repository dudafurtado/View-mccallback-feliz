import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './style.css';

import useUser from "../../../hooks/useUser";
import { listClientsService } from '../../../services/clientService';
import { cpfMask, phoneMask } from "../../../utils/Mask";
import { getItem } from '../../../utils/Storage';

import ArrowsOrganizeIcon from '../../../assets/arrowclients.svg';
import NewDebtIcon from '../../../assets/new-debt.svg';
import NoResults from '../../../assets/noresults.svg';


function ClientsListItems() {
  const { setCurrentClient, openModalClient, setOpenModalCreateDebt, clientsList, setClientsList, searchClients, setSearchClients } = useUser()
  const [sort, setSort] = useState(true)

  const navigate = useNavigate();

  const token = getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadClients();
    setSearchClients("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModalClient])

  function handleClientDetail(id, name) {
    setCurrentClient({ id: id, name: name });
    navigate(`/clients/detail/${id}`);
  }

  async function loadClients() {
    try {
      if (searchClients) {
        const { data, ok } = await listClientsService(token, searchClients);
        if (!ok) {
          return setClientsList([])
        }
        setClientsList(data);
      } else {
        const { data, ok } = await listClientsService(token);
        if (!ok) {
          return toast.warning(data);
        }
        setClientsList(data);
      }
    } catch (error) {
      return toast.error(error.message);
    }
  }

  function handleModalCreateDebt(id, clientName) {
    setCurrentClient({ id: id, name: clientName })
    setOpenModalCreateDebt(true)
  }

  async function handleSort() {
    const localClients = clientsList;
    if (sort) {
      localClients.sort((a, b) => a.name > b.name ? 1 : -1);
      setSort(false)
    } else {
      localClients.sort((a, b) => a.name < b.name ? 1 : -1);
      setSort(true)
    }
    setClientsList(localClients)
  }

  return (
    <article className='ClientsListItems'>
      <header className='IndexClientsList'>
        <div
          className='ClientIndicator Sort'
          onClick={() => handleSort()}
        >
          <img
            src={ArrowsOrganizeIcon}
            alt="Organizador através do nome do cliente"
          />
          <span>Cliente</span>
        </div>
        <span>CPF</span>
        <span>E-mail</span>
        <span>Telefone</span>
        <span>Status</span>
        <span>Criar Cobrança</span>
      </header>
      {clientsList.length !== 0 ?
        clientsList.map((eachClient) => (
          <section
            className='EachClient'
            key={eachClient.cpf}
          >
            <span className='ClientListName'
              onClick={() => handleClientDetail(eachClient.id)}
            >{eachClient.name}</span>
            <span className='ClientListCPF'
              onClick={() => handleClientDetail(eachClient.id)}
            >{eachClient.cpf && cpfMask(eachClient.cpf)}</span>
            <span className='ClientListEmail'
              onClick={() => handleClientDetail(eachClient.id)}
            >{eachClient.email}</span>
            <span className='ClientListPhone'
              onClick={() => handleClientDetail(eachClient.id)}
            >{eachClient.phone && phoneMask(eachClient.phone)}</span>
            <span
              className={eachClient.status === 'Em dia' ?
                'ClientListStatus Ok' : 'ClientListStatus Owe'}
              onClick={() => handleClientDetail(eachClient.id)}
            >
              {eachClient.status}
            </span>
            <a href='#modal'>
              <button
                className='CreateDebtButton'
                onClick={() => handleModalCreateDebt(eachClient.id, eachClient.name)}
              >
                <img
                  src={NewDebtIcon}
                  alt="Icone indicando a possibilidade de criar uma cobrança"
                  className='NewDebtIcon'
                />
                <span className='DebtWord'>Cobrança</span>
              </button>
            </a>
          </section>
        )) : <img src={NoResults} alt="No results" />
      }
    </article>
  )
}

export default ClientsListItems;