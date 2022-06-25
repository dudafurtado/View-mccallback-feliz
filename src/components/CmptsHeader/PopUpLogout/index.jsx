import "./style.css";

import ProfileEdit from "../../assets/profileEdit.svg";
import ProfileGoOut from "../../assets/profileGoOut.svg";

function ModalLogout({ open, handleClose, handleEdit }) {
  return (
    <>
      {open && (
        <div className="container-mdalLogout">
          <div className="arrow-up"></div>
          <div className="container-buttons">
            <div className="btn-edit" onClick={handleEdit}>
              <img
                src={ProfileEdit}
                alt="ProfileEdit"
                className="profileEdit"
              />
              <p>Editar</p>
            </div>
            <div onClick={handleClose} className="btn-GoOut">
              <img
                src={ProfileGoOut}
                alt="ProfileGoOut"
                className="profileGoOut"
              />
              <p>Sair</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalLogout;
