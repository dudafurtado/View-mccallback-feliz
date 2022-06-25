import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

import Header from "../../components/CmptsHeader/Header";
import DebtsListItems from "../../components/Lists/DebtsListItems";
import ModalUptadeDebt from "../../components/Modals/ModalDebtUpdate";
import ModalDebtDel from "../../components/Modals/ModalDebtDel";
import Sidebar from "../../components/Sidebar";
import DebtsTitle from "../../components/Title/DebtTitle";
import ModalDebtDetails from "../../components/Modals/ModalDebtDetails";
import useUser from "../../hooks/useUser";
import { getItem } from "../../utils/Storage";

function Charges() {
  const {
    setIsActive,
    setTitle,
    openModalUpdateDebt,
    openModalDebtDetails,
    openModalDelDebt,
    setOpenModalUpdateDebt,
    setOpenModalDebtDetails,
    setOpenModalDelDebt
  } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    const token = getItem("token");
    if (!token) {
      navigate("/login");
    }
    setOpenModalUpdateDebt(false);
    setOpenModalDelDebt(false);
    setOpenModalDebtDetails(false);

    setTitle("Cobranças");
    setIsActive("debt-collection");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <article className="DebtCollectionPage">
      <Sidebar isActive="debt-collection" />
      <main className="ContentDebtCollection">
        <Header title="debt-collection" />
        <article className="Debts">
          <section className="DebtsContainer">
            <DebtsTitle />
            <DebtsListItems /> :
          </section>
        </article>
        {openModalUpdateDebt && <ModalUptadeDebt />}
        {openModalDelDebt && <ModalDebtDel />}
        {openModalDebtDetails && <ModalDebtDetails />}
      </main>
    </article>
  );
}

export default Charges;
