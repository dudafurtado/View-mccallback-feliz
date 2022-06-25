import './style.css';

import { useState } from "react";
import { toast } from "react-toastify";
import { listDebtsService } from '../../../services/debtService';
import { getItem } from '../../../utils/Storage';

import useUser from '../../../hooks/useUser';

import IconDebts from '../../../assets/debts-page.svg';
import Iconsearch from "../../../assets/iconsearch.svg";
import Iconsettings from "../../../assets/iconsettings.svg";

function DebtsTitle() {
  const { setDebtsList } = useUser()

  const [search, setSearch] = useState("");
  const token = getItem('token');

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  async function debtsSearch() {
    try {
      const { data, ok } = await listDebtsService(token, search);
      if (!ok) {
        setDebtsList([]);
        return
      }

      setDebtsList(data);
    } catch (error) {
      return toast.error(error.message);
    } finally {
    }
  }
  return (
    <section className="TitleDebts">
      <div className="Title">
        <img
          src={IconDebts}
          alt="Icone de cobranças"
          className="IconDebts"
        />
        <h1>Cobranças</h1>
      </div>

      <section className="FormDebts">
        <div className="Settings">
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
          <img src={Iconsearch} alt="Iconsearch" className="IconSearch" onClick={() => debtsSearch()} />
        </div>
      </section>

    </section>
  )
}

export default DebtsTitle;