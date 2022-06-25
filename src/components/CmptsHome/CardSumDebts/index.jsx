import "./style.css";

import PaidDebtIcon from "../../../assets/paidcharges.svg";
import ExpiredDebtIcon from "../../../assets/overduecharges.svg";
import PendingDebtIcon from "../../../assets/expectedcharges.svg";

function CardSumDebts({ status, sum }) {
  return (
    <section
      className={status === "paid" ? "PaidSum DebtSumContainer" : 
      status === "expired" ? "ExpiredSum DebtSumContainer" : 
      "PendingSum DebtSumContainer"}
    >
      <img
        src={status === "paid" ? PaidDebtIcon : 
        status === "expired" ? ExpiredDebtIcon : 
        PendingDebtIcon}
        alt="StatusIcon"
      />
      <div className="ContainerSumName">
        <h1 className="SumTitle">
          {status === "paid" ? "Cobranças Pagas" : 
          status === "expired" ? "Cobranças Vencidas" : 
          "Cobranças Previstas"}
        </h1>
        <p className="SumValue">
          {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
          }).format(sum / 100)}
        </p>
      </div>
    </section>
  );
}

export default CardSumDebts;