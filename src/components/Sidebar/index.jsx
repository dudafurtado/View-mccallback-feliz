import "./style.css";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser"

import { ReactComponent as Homeicon } from "../../assets/home.svg";
import { ReactComponent as Clientesicon } from "../../assets/clients.svg";
import { ReactComponent as Cobrançasicon } from "../../assets/debts-bar.svg";

export default function Sidebar() {
  const { isActive,
    setIsActive, setTitle } = useUser();
  const navigate = useNavigate();

  function handleHome() {
    setTitle("Home")
    setIsActive("home");
    navigate("/home");
  };

  function handleClients() {
    setTitle("Clientes");
    setIsActive("clients");
    navigate("/clients");
  };

  function handleDebt() {
    setTitle("Cobranças");
    setIsActive("debt-collection");
    navigate("/debt-collection");
  };

  return (
    <div className="GeneralSideBar">
      <div className="ContainerSideBar">
        <div className={isActive === "home" ?
          "HomeSelected SlideBarIcon" : "HomeNotSelected SlideBarIcon"}
          onClick={() => handleHome()}
        >
          <Homeicon />
          <h2>Home</h2>
        </div>
        <div
          className={isActive === "clients" ?
            "ClientsSelected SlideBarIcon" : "ClientsNotSelected SlideBarIcon"}
          onClick={() => handleClients()}
        >
          <Clientesicon />
          <h2>Clientes</h2>
        </div>
        <div className={isActive === "debt-collection" ?
          "DebtsSelected SlideBarIcon" : "DebtsNotSelected SlideBarIcon"}
          onClick={() => handleDebt()}
        >
          <Cobrançasicon />
          <h2>Cobranças</h2>
        </div>
      </div>
    </div>
  );
}
