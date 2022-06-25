import { useEffect, useState } from "react";
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import "./style.css";

import { DebtDataService, editDebtService } from "../../../services/debtService";
import { getItem } from "../../../utils/Storage";

import { format } from "date-fns";
import CloseIcon from "../../../assets/close.svg";
import DebtIcon from "../../../assets/iconclients.svg";
import useUser from "../../../hooks/useUser";

function ModalUptadeDebt() {
  const { currentDebt, setOpenModalUpdateDebt } = useUser()
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
    async function loadDebt() {
      try {
        const { data, ok } = await DebtDataService(currentDebt, token)

        if (!ok) {
          toast.error(data);
          return
        }
        setForm({
          name: data.name,
          description: data.description,
          dueDate: format(new Date(data.due_date), 'yyyy-MM-dd'),
          value: (data.value / 100).toFixed(2),
          status: data.status
        });
      } catch (error) {
        return toast.error(error.message);
      }
    }
    loadDebt()
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
      const resource = `/debts/update/${currentDebt}`
      const date = new Date(`${form.dueDate} 21:00:00 GMT-0300`);
      const statusId = form.status === "Pendente" ? 1 : (form.status === "Paga" ? 2 : 3)

      const { data, ok } = await editDebtService(
        resource,
        {
          description: form.description,
          due_date: date,
          value: form.value * 100,
          statusDebt_id: statusId
        }, token)

      if (!ok) {
        return toast.error(data)
      }

      toast.success('Cobrança editada com sucesso!');

      setForm({
        name: '',
        description: '',
        dueDate: '',
        value: '',
        status: ''
      });

      setOpenModalUpdateDebt(false);
    } catch (error) {
      return toast.error(error.message);
    }
  }

  return (
    <>
      <article className="BackdropDebtUpdate">
        <section className="ModalDebtUpdate" id="modal">
          <img
            src={CloseIcon}
            alt="Icone com um x sinalizando a possibilidade de fechar o modal"
            className="CloseBtnDebtUpdate"
            onClick={() => setOpenModalUpdateDebt(false)}
          />
          <div className="ModalDebtTitleUpdate">
            <img
              src={DebtIcon}
              alt="Representação das cobranças"
              className="ModalImgDebtUpdate"
            />
            <h2>Edição de Cobrança</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="ContainerInputsDebtUpdate">
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
            <div className="ContainerInputDescriptionUpdate">
              <label htmlFor="description">Descrição*</label>
              <textarea
                id="description"
                name="description"
                rows="3"
                cols="30"
                maxLength="70"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              ></textarea>
              {errorDescription && <span>{errorDescription}</span>}
            </div>
            <div className="DivDuoDebtUpdate">
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
            <section className="ContainerStatusUpdate">
              <strong>Status:*</strong>
              <div className="ContainerInputStatusUpdate">
                <label id='status'>
                  <input
                    type="radio"
                    name="status"
                    value='Paga'
                    onChange={handleFormValue}
                    checked={form.status === 'Paga' && 'defaultChecked'}
                  />
                  Cobrança Paga
                </label>
              </div>
              <div className="ContainerInputStatusUpdate">
                <label id="status">
                  <input
                    type="radio"
                    name="status"
                    value='Pendente'
                    onChange={handleFormValue}
                    checked={form.status === 'Pendente' && 'defaultChecked'}
                  />
                  Cobrança Pendente
                </label>
              </div>
              <div className="ContainerInputStatus">
                <label id="status">
                  <input
                    type="radio"
                    name="status"
                    value='Vencida'
                    onChange={handleFormValue}
                    checked={form.status === 'Vencida' && 'defaultChecked'}
                  />
                  Cobrança Vencida
                </label>
              </div>
              {errorStatus && <span>{errorStatus}</span>}
            </section>
            <div className="DivBtnDebtUpdate">
              <button type="button" onClick={() => setOpenModalUpdateDebt(false)} className="BtnCancel">Cancelar</button>
              <button className="BtnConfirm">Aplicar</button>
            </div>
          </form>
        </section>
      </article>
    </>
  );
}

export default ModalUptadeDebt;