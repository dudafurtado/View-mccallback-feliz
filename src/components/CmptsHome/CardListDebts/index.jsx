import "./style.css";

import { Link } from 'react-router-dom';
import useUser from "../../../hooks/useUser";

function CardListDebts({ status, list, count }) {
  const { setSearchDebts } = useUser();

  return (
    <article className="DebtContainer">
      <section className="CardDebtTitle">
        <h1 className="TypeDebtTitle">
          {status === "paid" ? "Cobranças Pagas" : 
          status === "expired" ? "Cobranças Vencidas" : 
          "Cobranças Previstas"}
        </h1>
        <p
          className={status === "expired" ? "DebtCount Red" : 
          status === "pending" ? "DebtCount Yellow" : 
          "ClientCount Green"}
        >
          {count}
        </p>
      </section>
      <article className="TableDebtContainer">
        <header className="TableHeadDebts">
          <strong className="ListTop">
            Cliente
          </strong>
          <strong className="ListTop">
            ID da cob.
          </strong>
          <strong className="ListTop">
            Valor
          </strong>
        </header>
          {list.map((item) => (
              <section className="TableRowDebts" key={item.id}>
                <span className="ListEachLine ClientNameHome">
                  {item.name}
                </span>
                <span className="ListEachLine ClientIDHome">
                  {item.id}
                </span>
                <span className="ListEachLine DebtValueHome">
                  {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                  }).format(item.value / 100)}
                </span>
              </section>
          ))}
        <div className="CardBottom">
          <Link 
            className="ShowEverything" 
            to='/debt-collection'
            onClick={() => setSearchDebts(status === "paid" ? 'Paga' :
            status === 'expired' ? 'Vencida' : 'Pendente')}
          >
            Ver todos
          </Link>
        </div>
      </article>
    </article>
  );
}

export default CardListDebts;