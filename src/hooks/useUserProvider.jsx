import { useState } from 'react';

function useUserProvider() {
    const [openModalClient, setOpenModalClient] = useState(false);
    const [openModalClientUpdate, setOpenModalClientUpdate] = useState(false);
    const [isActive, setIsActive] = useState("home")
    const [title, setTitle] = useState("Home")
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [currentClient, setCurrentClient] = useState({});
    const [openModalCreateDebt, setOpenModalCreateDebt] = useState(false);
    const [clientsList, setClientsList] = useState([
        {
            cpf: '04478720011',
            name: "Sara Silva",
            email: 'sara@email',
            telefone: '999999999',
            status: "Inadimplente"
        },
        {
            cpf: '34278329971',
            name: "Carla Andrade",
            email: 'carlaaandrade@email',
            telefone: '988888888',
            status: "Em dia"
        },
        {
            cpf: '00008320071',
            name: "Maria Eduarda Furtado",
            email: 'dudaaaaa@email',
            telefone: '9777778888',
            status: "Em dia"
        }
    ]);
    const [debtsList, setDebtsList] = useState([
        {
            id: 1,
            name: "Sara Silva",
            description: 'oi tudo bem fiquei devendo',
            value: 1000,
            due_date: "2022-05-20T03:00:00.000Z",
            status: "Paga"
        },
        {
            "id": 2,
            "name": "Guilherme Autenticado",
            "description": null,
            "value": 1000,
            "due_date": "2022-05-20T03:00:00.000Z",
            "status": "Vencida"
        },
        {
            "id": 3,
            "name": "Guilherme Autenticado",
            "description": 'não to devendo',
            "value": 1000,
            "due_date": "2022-05-20T03:00:00.000Z",
            "status": "Pendente"
        }
    ]);
    const [openModalUpdateDebt, setOpenModalUpdateDebt] = useState(false);
    const [openModalDebtDetails, setOpenModalDebtDetails] = useState(false);
    const [openModalDelDebt, setOpenModalDelDebt] = useState(false);
    const [currentDebt, setCurrentDebt] = useState({});

    const [searchClients, setSearchClients] = useState("");
    const [searchDebts, setSearchDebts] = useState("");

    return {
        openModalClient, setOpenModalClient,
        openModalClientUpdate, setOpenModalClientUpdate,
        isActive, setIsActive,
        title, setTitle,
        openEdit, setOpenEdit,
        openModalUpdate, setOpenModalUpdate,
        currentClient, setCurrentClient,
        openModalCreateDebt, setOpenModalCreateDebt,
        clientsList, setClientsList,
        debtsList, setDebtsList,
        openModalUpdateDebt, setOpenModalUpdateDebt,
        openModalDebtDetails, setOpenModalDebtDetails,
        openModalDelDebt, setOpenModalDelDebt,
        currentDebt, setCurrentDebt,
        searchClients, setSearchClients,
        searchDebts, setSearchDebts
    }
}

export default useUserProvider;