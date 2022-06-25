import "./style.css";

import { Link } from 'react-router-dom';
import useUser from '../../../hooks/useUser'
import { cpfMask } from "../../../utils/Mask";

import DefaulterIcon from "../../../assets/defaulter.svg";
import ExpandedIcon from "../../../assets/expanded.svg";

function CardListClients({ status, list, count }) {
  const { setSearchClients } = useUser();

  return (
    <article className="ClientsCardContainer">
      <section className="CardClientTitle">
        <div className="CardClientIcon">
            <img
              src={status === "defaulter" ? DefaulterIcon : ExpandedIcon}
              alt="Icon"
              className="IconTypeClient"
            />
            <h1 className="TypeOfClientTitle">
              {status === "defaulter" ? "Clientes Inadimplentes" : "Clientes em dia"}
            </h1>
        </div>
        <p className={status === "defaulter" ? "ClientCount Red" : "ClientCount Green"}>
          {count}
        </p>
      </section>
      <article className="TableClientContainer">
        <header className="TableHeadClients">
          <strong className="ListTop">
            Clientes
          </strong>
          <strong className="ListTop">
            ID do clie.
          </strong>
          <strong className="ListTop">
            CPF
          </strong>
        </header>
          {list.map((item) => (
              <section className="TableRowClients" key={item.id}>
                <span className="ListEachLine ClientHomeName">{item.name}</span>
                <span className="ListEachLine ClientHomeId">
                  {item.id}
                </span>
                <span className="ListEachLine ClientHomeCpf">
                  {cpfMask(item.cpf)}
                </span>
              </section>
          ))}
        <div className="CardBottom">
          <Link 
          className="ShowEverything" 
          to='/clients'
          onClick={() => setSearchClients(status === "defaulter" ? 'Inadimplente' : 'Em dia')}
          >
            Ver todos
          </Link>
        </div>
      </article>
    </article>
  );
}

export default CardListClients;