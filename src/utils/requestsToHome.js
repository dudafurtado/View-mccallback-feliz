import { toast } from 'react-toastify';
import useUser from '../hooks/useUser';

import { getItem } from './Storage';

import { 
    countClientsByStatus, 
    listDefaulterClients, 
    listDebtFreeClients 
} from '../services/clientService';
import {
    sumDebtsByStatus,
    countDebtsByStatus,
    listPaidDebts,
    listExpiredDebts,
    listPendingDebts
} from '../services/debtService';

const {  } = useUser();
const token = getItem('token');

useEffect(() => {
    loadClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


async function loadSumPaidDebts() {
  try {
    const { data, ok } = await (token);
    if (!ok) {
      return toast.warning(data);
    }

    set(data);
  } catch (error) {
    return toast.error(error.message);
  }
}

async function loadSumPaidDebts() {
    try {
      const { data, ok } = await (token);
      if (!ok) {
        return toast.warning(data);
      }
  
      set(data);
    } catch (error) {
      return toast.error(error.message);
    }
}

async function loadSumPaidDebts() {
    try {
      const { data, ok } = await (token);
      if (!ok) {
        return toast.warning(data);
      }
  
      set(data);
    } catch (error) {
      return toast.error(error.message);
    }
}

async function loadSumPaidDebts() {
    try {
      const { data, ok } = await (token);
      if (!ok) {
        return toast.warning(data);
      }
  
      set(data);
    } catch (error) {
      return toast.error(error.message);
    }
}