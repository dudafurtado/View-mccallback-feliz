import "./style.css";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { getItem } from "../../../utils/Storage";

import CardListDebts from "../CardListDebts";
import CardListClients from "../CardListClients";
import CardSumDebts from "../CardSumDebts";

import {
  sumDebts,
  countDebts,
  listPaidDebts,
  listExpiredDebts,
  listPendingDebts
} from '../../../services/debtService';
import {
  countClients,
  listDefaulterClients,
  listDebtFreeClients
} from '../../../services/clientService';

function Resume() {
  const [sumPaidDebtsData, setSumPaidDebts] = useState([]);
  const [sumExpiredDebtsData, setSumExpiredDebts] = useState([]);
  const [sumPendingDebtsData, setSumPendingDebts] = useState([]);

  const [countPaidDebtsData, setCountPaidDebts] = useState([]);
  const [countExpiredDebtsData, setCountExpiredDebts] = useState([]);
  const [countPendingDebtsData, setCountPendingDebts] = useState([]);
  const [countDefaulterClientsData, setCountDefaulterClients] = useState([]);
  const [countDebtFreeClientsData, setCountDebtFreeClients] = useState([]);

  const [listPaidDebtsData, setListPaidDebts] = useState([]);
  const [listExpiredDebtsData, setListExpiredDebts] = useState([]);
  const [listPendingDebtsData, setListPendingDebts] = useState([]);
  const [listDefaulterClientData, setListDefaulterClient] = useState([]);
  const [listDebtFreeClientData, setListDebtFreeClient] = useState([]);

  const token = getItem('token');

  useEffect(() => {
    loadHomeData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadHomeData() {
    try {
      const sumD = await sumDebts(token);
      verifyOk(sumD.ok, sumD.data);
      setSumExpiredDebts(sumD.data[0].sum);
      setSumPendingDebts(sumD.data[1].sum);
      setSumPaidDebts(sumD.data[2].sum);

      const countD = await countDebts(token);
      verifyOk(countD.ok, countD.data);
      setCountExpiredDebts(countD.data[0].count);
      setCountPendingDebts(countD.data[1].count);
      setCountPaidDebts(countD.data[2].count);

      const countC = await countClients(token);
      verifyOk(countC.ok, countC.data);
      setCountDefaulterClients(countC.data[0].count);
      setCountDebtFreeClients(countC.data[1].count);

      const listPaD = await listPaidDebts(token);
      verifyOk(listPaD.ok, listPaD.data);
      setListPaidDebts(listPaD.data);

      const listED = await listExpiredDebts(token);
      verifyOk(listED.ok, listED.data);
      setListExpiredDebts(listED.data);

      const listPeD = await listPendingDebts(token);
      verifyOk(listPeD.ok, listPeD.data);
      setListPendingDebts(listPeD.data);

      const listDC = await listDefaulterClients(token);
      verifyOk(listDC.ok, listDC.data);
      setListDefaulterClient(listDC.data);

      const listDFC = await listDebtFreeClients(token);
      verifyOk(listDFC.ok, listDFC.data);
      setListDebtFreeClient(listDFC.data);
    } catch (error) {
      return toast.error(error.message);
    }
  }

  function verifyOk(ok, data) {
    if (!ok) {
      return toast.warning(data);
    }
  }

  return (
    <main className="ResumeContainer">
      <section className="SumCards">
        <CardSumDebts status="paid" sum={sumPaidDebtsData} />
        <CardSumDebts status="expired" sum={sumExpiredDebtsData} />
        <CardSumDebts status="pending" sum={sumPendingDebtsData} />
      </section>
      <section className="DebtsCards">
        <CardListDebts status="paid" list={listPaidDebtsData} count={countPaidDebtsData} />
        <CardListDebts status="expired" list={listExpiredDebtsData} count={countExpiredDebtsData} />
        <CardListDebts status="pending" list={listPendingDebtsData} count={countPendingDebtsData} />
      </section>
      <section className="ClientsCards">
        <CardListClients status="defaulter" list={listDefaulterClientData} count={countDefaulterClientsData} />
        <CardListClients status="debt-free" list={listDebtFreeClientData} count={countDebtFreeClientsData} />
      </section>
    </main>
  );
}

export default Resume;