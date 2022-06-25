import "./style.css";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';

import useUser from "../../../hooks/useUser";
import { editUserService, userDataService } from "../../../services/userService";
import { getItem } from "../../../utils/Storage";

import ImgClose from "../../../assets/close.svg";
import ImgEyeOff from "../../../assets/closed-eye.svg";
import Ok from "../../../assets/ok.svg";
import ImgEyeOn from "../../../assets/open-eye.svg";

function ModalUpdateRegistration() {
  const { openModalUpdate,
    setOpenModalUpdate } = useUser()
  const [user, setUser] = useState()
  const [offPassword, setOffPassword] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false)

  const token = getItem('token')

  useEffect(() => {

    async function loadUser() {
      setSuccess(false)

      try {
        const { data, ok } = await userDataService('/user', token)
        if (!ok) {
          return toast.error(data);
        }

        setUser(data)
        setForm({
          name: data.name,
          email: data.email,
          cpf: data.cpf || "",
          phone: data.phone || "",
          password: '',
          confirmPassword: ''
        });

      } catch (error) {
        return toast.error(error.message)
      }
    }
    loadUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModalUpdate])

  function handleFormValue(e) {
    if (e.target.name === 'password' && e.nativeEvent.data === " ") {
      return
    }
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSuccess() {
    setOpenModalUpdate(false)
    setSuccess(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setErrorName('');
    setErrorEmail('');
    setErrorPassword('');
    setErrorConfirmPassword('');

    const userUptade = {}

    if (!form.name.trim()) {
      setErrorName('Este campo deve ser preenchido');
      return;
    } else {
      userUptade["name"] = form.name.trim()
    }

    if (!form.email.trim()) {
      setErrorEmail('Este campo deve ser preenchido');
      return;
    } else {
      userUptade["email"] = form.email.trim()
    }

    if (!form.confirmPassword && form.password) {
      setErrorConfirmPassword('Este campo deve ser preenchido');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorConfirmPassword('As senhas não coincidem');
      return;
    }
    if (form.password) {
      userUptade["password"] = form.password.trim()
    }

    if (user.cpf) {
      if (form.cpf) {
        userUptade["cpf"] = form.cpf
      } else {
        userUptade["cpf"] = ""
      }
    } else {
      if (form.cpf) {
        userUptade["cpf"] = form.cpf
      }
    }

    if (user.phone) {
      if (form.phone) {
        userUptade["phone"] = form.phone
      } else {
        userUptade["phone"] = ""
      }
    } else {
      if (form.phone && form.phone.trim()) {
        userUptade["phone"] = form.phone.trim()
      }
    }

    try {
      const { data, ok } = await editUserService("/user/edit", userUptade, token);

      if (!ok) {
        return toast.error(data)
      }
      setForm({
        name: '',
        email: '',
        cpf: '',
        phone: '',
        password: '',
        confirmPassword: ''
      });

      setOffPassword(true);

      setSuccess(true);
      setTimeout(() => handleSuccess(true), 2500);
    } catch (error) {
      return toast.error(error);
    }
  }

  return (
    <>
      <article className="backdrop">
        <section className={!success ? "modal-update" : "none"} id="modal">
          <img
            src={ImgClose}
            alt=""
            className="close-btn"
            onClick={() => setOpenModalUpdate(false)}
          />
          <h2>Edite seu cadastro</h2>
          <form onSubmit={handleSubmit}>
            <div className="container-inputs">
              <label htmlFor="name">Nome*</label>
              <input type="text"
                placeholder="Digite seu nome"
                id="name"
                name="name"
                value={form.name}
                onChange={handleFormValue}
              />
              {errorName && <span>{errorName}</span>}
            </div>
            <div className="container-inputs">
              <label htmlFor="email">E-mail*</label>
              <input type="text"
                placeholder="Digite seu e-mail"
                id="email"
                name="email"
                value={form.email}
                onChange={handleFormValue}
              />
              {errorEmail && <span>{errorEmail}</span>}
            </div>
            <div className="div-duo">
              <div className="container-inputs">
                <label htmlFor="cpf">CPF</label>
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
                  placeholder="Digite o seu cpf"
                />
              </div>
              <div className="container-inputs">
                <label htmlFor="phone">Telefone</label>
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
                  placeholder="Digite seu Telefone"
                />
              </div>
            </div>
            <div className="container-inputs">
              <label htmlFor="new-password">Nova Senha</label>
              <input type={offPassword ? "password" : "text"}
                placeholder="Digite sua nova senha caso deseje alterar"
                id="new-password"
                name="password"
                value={form.password}
                onChange={handleFormValue}
              />
              <img src={offPassword ? ImgEyeOff : ImgEyeOn}
                alt=""
                className="img-eye-off"
                onClick={() => setOffPassword(!offPassword)}
              />
              {errorPassword && <span>{errorPassword}</span>}
            </div>
            <div className="container-inputs">
              <label htmlFor="confirm-password">Confirmar Senha</label>
              <input type={offPassword ? "password" : "text"}
                placeholder="Confirme sua nova senha"
                id="confirm-password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleFormValue}
              />
              <img
                src={offPassword ? ImgEyeOff : ImgEyeOn}
                alt=""
                className="img-eye-off"
                onClick={() => setOffPassword(!offPassword)}
              />
              {errorConfirmPassword && <span>{errorConfirmPassword}</span>}
            </div>
            <div className="div-btn">
              <button>Aplicar</button>
            </div>
          </form>
        </section>
        <section className={success ? "altered-successfully" : "none"}>
          <img src={Ok} alt="Sucesso" />
          <span>Cadastro Alterado com sucesso</span>
        </section>
      </article>
    </>
  );
}

export default ModalUpdateRegistration;
