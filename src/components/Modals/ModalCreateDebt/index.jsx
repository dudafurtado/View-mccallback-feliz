import "./style.css";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';

import { createDebtService } from "../../../services/debtService";
import { getItem } from "../../../utils/Storage";

import CloseIcon from "../../../assets/close.svg";
import DebtIcon from "../../../assets/iconclients.svg";
import useUser from "../../../hooks/useUser";

function ModalCreateDebt() {
  const { currentClient, setOpenModalCreateDebt } = useUser()
  const [form, setForm] = useState({
    name: '',
    description: '',
    dueDate: '',
    value: '',
    status: ''
  });
  const [errorDescription, setErrorDescription] = useState('');
  const [errorDueDate, setErrorDueDate] = useState('');
  const [errorValue, setErrorValue] = useState('');
  const [errorStatus, setErrorStatus] = useState('');

  const token = getItem('token');
  useEffect(() => {
    setForm({
      ...form,
      name: currentClient.name,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  function handleFormValue(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }


  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.description) {
      return setErrorDescription('Este campo deve ser preenchido');
    }
    if (!form.dueDate) {
      return setErrorDueDate('Este campo deve ser preenchido');
    }
    if (!form.value || Number(form.value) < 0.01) {
      return setErrorValue('Este campo deve ser preenchido');
    }
    if (!form.status) {
      return setErrorStatus('Este campo deve ser preenchido');
    }

    try {
      const date = new Date(`${form.dueDate} 21:00:00 GMT-0300`)
      const { data, ok } = await createDebtService({
        client_id: currentClient.id,
        description: form.description,
        due_date: date,
        value: form.value * 100,
        statusDebt_id: form.status === "Pendente" ? 1 : 2
      }, token)

      if (!ok) {
        return toast.error(data)
      }

      toast.success('Cadastro de cobrança concluído com sucesso');

      setForm({
        name: '',
        description: '',
        dueDate: '',
        value: '',
        status: ''
      });

      setOpenModalCreateDebt(false);
    } catch (error) {
      return toast.error(error.message);
    }
  }

  return (
    <>
      <article className="BackdropDebt">
        <section className="ModalDebt" id="modal">
          <img
            src={CloseIcon}
            alt="Icone com um x sinalizando a possibilidade de fechar o modal"
            className="CloseBtnDebt"
            onClick={() => setOpenModalCreateDebt(false)}
          />
          <div className="ModalDebtTitle">
            <img
              src={DebtIcon}
              alt="Representação das cobranças"
              className="ModalImgDebt"
            />
            <h2>Cadastro de Cobrança</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="ContainerInputsDebt">
              <label htmlFor="name">Nome do Cliente*</label>
              <input type="text"
                placeholder="Digite o nome"
                id="name"
                name="name"
                value={form.name}
                onChange={handleFormValue}
                disabled
              />
            </div>
            <div className="ContainerInputDescription">
              <label htmlFor="description">Descrição*</label>
              <textarea
                id="description"
                name="description"
                rows="3"
                cols="30"
                maxLength="70"
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              ></textarea>
              {errorDescription && <span>{errorDescription}</span>}
            </div>
            <div className="DivDuoDebt">
              <div className="ContainerInputsDebt ContainerInputDuoDebt">
                <label htmlFor="vencimento">Vencimento:*</label>
                <input type="date"
                  placeholder="Digite a data de vencimento"
                  id="vencimento"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleFormValue}
                />
                {errorDueDate && <span>{errorDueDate}</span>}
              </div>
              <div className="ContainerInputsDebt ContainerInputDuoDebt">
                <label
                  htmlFor="value">Valor: *</label>
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  value={form.value}
                  onValueChange={(values) =>
                    setForm({ ...form, "value": values.value })
                  }
                  prefix="R$ "
                  decimalSeparator="."
                  displayType="input"
                  type="text"
                  thousandSeparator={true}
                  allowNegative={false}
                  decimalScale={2}
                  placeholder="Digite o valor"
                />
                {errorValue && <span>{errorValue}</span>}
              </div>
            </div>
            <section className="ContainerStatus">
              <strong>Status:*</strong>
              <div className="ContainerInputStatus">
                <label id='status'>
                  <input
                    type="radio"
                    name="status"
                    value='Paga'
                    onChange={handleFormValue}
                  />
                  Cobrança Paga
                </label>
              </div>
              <div className="ContainerInputStatus">
                <label id="status">
                  <input
                    type="radio"
                    name="status"
                    value='Pendente'
                    onChange={handleFormValue}
                  />
                  Cobrança Pendente
                </label>
              </div>
              {errorStatus && <span>{errorStatus}</span>}
            </section>
            <div className="DivBtnDebt">
              <button type="button" onClick={() => setOpenModalCreateDebt(false)} className="BtnCancel">Cancelar</button>
              <button className="BtnConfirm">Aplicar</button>
            </div>
          </form>
        </section>
      </article>
    </>
  );
}

export default ModalCreateDebt;