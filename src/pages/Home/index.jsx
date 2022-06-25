import "./style.css";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import Header from "../../components/CmptsHeader/Header";
import Sidebar from "../../components/Sidebar";
import Resume from "../../components/CmptsHome/Resume";

import useUser from "../../hooks/useUser";
import { getItem } from '../../utils/Storage';

function Home() {
  const { setIsActive, setTitle } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    const token = getItem('token');
    if (!token) {
      navigate('/login');
    }

    setTitle("Home");
    setIsActive("home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className="ContainerHome">
      <Sidebar isActive="home" />
      <section className="ContainerContent">
        <Header title="home" />
        <Resume />
      </section>
    </article>
  )
}

export default Home;
