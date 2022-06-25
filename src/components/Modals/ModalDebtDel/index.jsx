import { toast } from "react-toastify";
import "./style.css";

import { deleteDebt } from "../../../services/debtService";
import { getItem } from "../../../utils/Storage";

import CloseIcon from "../../../assets/close.svg";
import DelIcon from "../../../assets/icondebtdel.svg";
import useUser from "../../../hooks/useUser";

function ModalDebtDel() {
  const { currentDebt, setOpenModalDelDebt } = useUser();

  const token = getItem("token");


  async function delDebt() {
    try {
      const { data, ok } = await deleteDebt(currentDebt, token);

      if (!ok) {
        toast.error(data);
        return;
      }
      setOpenModalDelDebt(false)
      return toast.success(data);
    } catch (error) {
      toast.error(error.message);
      return;
    }
  }

  return (
    <>
      <article className="BackdropDebtDel">
        <div className="teste">
          <section className="ModalDebtDel" id="modal">
            <img
              src={CloseIcon}
              alt="Icone com um x sinalizando a possibilidade de fechar o modal"
              className="CloseBtnDebtDel"
              onClick={() => setOpenModalDelDebt(false)}
            />
            <div className="TitleDel">
              <img
                src={DelIcon}
                alt="Icone que sinaliza o tipo do modal"
                className="DebtDel"
              />
              <h1>Tem certeza que deseja excluir esta cobrança?</h1>
            </div>
            <div className="DivBtnDebtDel">
              <button
                type="button"
                className="BtnNo"
                onClick={() => setOpenModalDelDebt(false)}
              >
                Não
              </button>
              <button className="BtnYes"
                onClick={() => delDebt()}
              >Sim</button>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}

export default ModalDebtDel;
