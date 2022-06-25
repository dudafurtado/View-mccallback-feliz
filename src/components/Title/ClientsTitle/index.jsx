import './style.css';

import { useState } from "react";
import { toast } from "react-toastify";
import { listClientsService } from '../../../services/clientService';
import { getItem } from '../../../utils/Storage';

import useUser from '../../../hooks/useUser';

import Iconclients from "../../../assets/iconclients.svg";
import Iconsearch from "../../../assets/iconsearch.svg";
import Iconsettings from "../../../assets/iconsettings.svg";
import Add from "../../../assets/plus.svg";
import { useEffect } from 'react';

function ClientsTitle() {
  const { setOpenModalClient, setClientsList, searchClients } = useUser()
  const [search, setSearch] = useState("");

  const [showFilter, setShowFilter] = useState(false);
  const token = getItem('token');

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  async function clientsSearch() {
    try {
      const { data, ok } = await listClientsService(token, search);
      if (!ok) {
        return setClientsList([])
      }
      setClientsList(data);
    } catch (error) {
      return toast.error(error.message);
    } finally {
    }
  }

  useEffect(() => {
    setSearch(searchClients)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="TitleClients">
      <div className="Title">
        <img
          src={Iconclients}
          alt="Icone de clientes"
          className="IconClients"
        />
        <h1>Clientes</h1>
      </div>

      <section className="FormClients">
        <button
          className="AddClients"
          onClick={() => setOpenModalClient(true)}
        >
          <img
            src={Add}
            alt="add"
            className="IconAdd"
          />
          <h2>Adicionar cliente</h2>
        </button>
        <div className="Settings"
          onClick={() => setShowFilter(!showFilter)}>
          <img
            src={Iconsettings}
            alt="Iconsettings"
            className="IconSettings"
          />
        </div>
        <div className='Search'>
          <input
            className="InputSearch"
            type="text"
            placeholder="Pesquisa"
            value={search}
            onChange={handleSearch}
          />
          <img src={Iconsearch} alt="Iconsearch" className="IconSearch" onClick={() => clientsSearch()} />
        </div>
      </section>

    </section>
  )
}

export default ClientsTitle;