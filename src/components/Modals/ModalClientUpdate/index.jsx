import { useEffect, useState } from "react";
import "./style.css";

import NumberFormat from 'react-number-format';
import { clientDataService, editClientService } from "../../../services/clientService";
import { searchZipcode } from "../../../services/utilService";

import { toast } from "react-toastify";
import useUser from "../../../hooks/useUser";
import { getItem } from "../../../utils/Storage";

import ImgClose from "../../../assets/close.svg";
import IconClients from "../../../assets/iconclients.svg";

function ModalClientsUpdate() {
  const { setOpenModalClientUpdate, openModalClientUpdate, currentClient } = useUser()

  const [form, setForm] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    zipcode: '',
    address: '',
    complement: '',
    district: '',
    city: '',
    state: ''
  });
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorCPF, setErrorCPF] = useState('');
  const [errorPhone, setErrorPhone] = useState('');

  const token = getItem('token');

  function handleFormValue(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    async function loadClient() {
      try {
        const { data, ok } = await clientDataService(currentClient.id, token);
        if (!ok) {
          toast.error(data);
          return
        }
        setForm({
          name: data.name,
          email: data.email,
          cpf: data.cpf,
          phone: data.phone,
          zipcode: data.zipcode,
          address: data.address,
          complement: data.complement,
          district: data.district,
          city: data.city,
          state: data.state
        })

      } catch (error) {
        toast.error(error.message)
      }
    }
    loadClient()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    setErrorName('');
    setErrorEmail('');
    setErrorCPF('');
    setErrorPhone('');

    if (!form.name.trim()) {
      setErrorName('Este campo deve ser preenchido');
      return;
    }
    if (!form.email.trim()) {
      setErrorEmail('Este campo deve ser preenchido');
      return;
    }
    if (!form.cpf) {
      setErrorCPF('Este campo deve ser preenchido');
      return;
    }
    if (!form.phone.trim()) {
      setErrorPhone('Este campo deve ser preenchido');
      return;
    }
    try {
      const { data, error } = await editClientService(`/client/update/${currentClient.id}`, {
        "name": form.name.trim(),
        "email": form.email.trim(),
        "cpf": form.cpf,
        "phone": form.phone.trim(),
        "zipcode": form.zipcode,
        "address": form.address && form.address.trim(),
        "complement": form.complement && form.complement.trim(),
        "district": form.district && form.district.trim(),
        "city": form.city && form.city.trim(),
        "state": form.state && form.state.trim()
      }, token)

      if (data === "Já existe um cliente cadastrado com o e-mail informado.") {
        return setErrorEmail('Já existe um cliente cadastrado com o e-mail informado.');
      }

      if (data === 'Já existe um cliente cadastrado com o cpf informado.') {
        return setErrorCPF('Já existe um cliente cadastrado com o CPF informado.');
      }

      if (error) {
        toast.error(data)
        return
      }

      setForm({
        name: '',
        email: '',
        cpf: '',
        phone: '',
        zipcode: '',
        address: '',
        complement: '',
        district: '',
        city: '',
        state: ''
      });
      toast.info('Edições do cadastro concluídas com sucesso');
      setOpenModalClientUpdate(!openModalClientUpdate);
    } catch (error) {
      toast.error(error.message)
    }
  }

  async function handleCep() {
    const { data } = await searchZipcode(form.zipcode)
    setForm({
      ...form,
      address: data.logradouro,
      district: data.bairro,
      city: data.localidade,
      state: data.uf
    })
  }

  return (
    <>
      {openModalClientUpdate &&
        <article className="backdrop-client">
          <section className="modal-client" id="modal">
            <img
              src={ImgClose}
              alt="Icone com um x sinalizando a possibilidade de fechar o modal"
              className="close-btn-client"
              onClick={() => setOpenModalClientUpdate(false)}
            />
            <div className="modal-client-title">
              <img
                src={IconClients}
                alt="Clients"
                className="modal-img-clients"
              />
              <h2>Editar Cliente</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="container-inputs-client">
                <label htmlFor="name">Nome*</label>
                <input type="text"
                  placeholder="Digite o nome"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleFormValue}
                />
                {errorName && <span>{errorName}</span>}
              </div>
              <div className="container-inputs-client">
                <label htmlFor="email">E-mail*</label>
                <input type="text"
                  placeholder="Digite o e-mail"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormValue}
                />
                {errorEmail && <span>{errorEmail}</span>}
              </div>
              <div className="div-duo-client">
                <div className="container-inputs-client container-input-duo-client">
                  <label htmlFor="cpf">CPF *</label>
                  <NumberFormat
                    thousandsGroupStyle="thousand"
                    value={form.cpf}
                    onValueChange={(values) =>
                      setForm({ ...form, "cpf": values.value })
                    }
                    decimalSeparator="."
                    displayType="input"
                    type="text"
                    allowNegative={false}
                    format="###.###.###-##"
                    mask="_"
                    placeholder="Digite o CPF"
                  />
                  {errorCPF && <span>{errorCPF}</span>}
                </div>
                <div className="container-inputs-client container-input-duo-client">
                  <label
                    htmlFor="phone">Telefone *</label>
                  <NumberFormat
                    thousandsGroupStyle="thousand"
                    value={form.phone}
                    onValueChange={(values) =>
                      setForm({ ...form, "phone": values.value })
                    }
                    decimalSeparator="."
                    displayType="input"
                    type="text"
                    allowNegative={false}
                    format="(##) ####-#####"
                    mask="_"
                    placeholder="Digite o telefone"
                  />
                  {errorPhone && <span>{errorPhone}</span>}
                </div>
              </div>
              <div className="div-duo-client">
                <div className="container-inputs-client container-input-duo-client">
                  <label htmlFor="zipcode">CEP</label>
                  <NumberFormat
                    onBlur={() => handleCep()}
                    thousandsGroupStyle="thousand"
                    value={form.zipcode}
                    onValueChange={(values) =>
                      setForm({ ...form, "zipcode": values.value })
                    }
                    decimalSeparator="."
                    displayType="input"
                    type="text"
                    allowNegative={false}
                    format="#####-###"
                    mask="_"
                    placeholder="Digite o CEP"
                  />
                </div>
                <div className="container-inputs-client container-input-duo-client">
                  <label
                    htmlFor="district">Bairro</label>
                  <input type="text"
                    placeholder="Digite o bairro"
                    id="disctrict"
                    name="district"
                    value={form.district}
                    onChange={handleFormValue}
                  />
                </div>
              </div>
              <div className="container-inputs-client">
                <label htmlFor="address">Endereço</label>
                <input type="text"
                  placeholder="Digite o endereço"
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleFormValue}
                />
              </div>
              <div className="container-inputs-client">
                <label htmlFor="complement">Complemento</label>
                <input type="text"
                  placeholder="Digite o complemento"
                  id="complement"
                  name="complement"
                  value={form.complement}
                  onChange={handleFormValue}
                />
              </div>

              <div className="div-duo-client">
                <div className="container-inputs-client container-city">
                  <label htmlFor="city">Cidade</label>
                  <input type="text"
                    placeholder="Digite a cidade"
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleFormValue}
                  />
                </div>
                <div className="container-inputs-client container-state">
                  <label
                    htmlFor="state">Estado</label>
                  <input type="text"
                    placeholder="Digite o estado"
                    id="state"
                    name="state"
                    value={form.state}
                    onChange={handleFormValue}
                  />
                </div>
              </div>
              <div className="div-btn-client">
                <button type="button" onClick={() => setOpenModalClientUpdate(false)} className="btn-cancel">Cancelar</button>
                <button className="btn-confirm">Aplicar</button>
              </div>
            </form>
          </section>
        </article>
      }
    </>
  );
}

export default ModalClientsUpdate;
