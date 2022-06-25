import { createContext } from 'react';

const MyContext = createContext();

function MyContextProvider({ props }) {
    return (
        <MyContext.Provider value={{}}>
            <>{props.children}</>
        </MyContext.Provider>
    )
}

export {
    MyContext,
    MyContextProvider
};