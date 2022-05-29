import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/globalStyle";
import Login from "./ui/auth/login/Login";
import Cadastro from "./ui/auth/cadastro/Cadastro";
import Hoje from "./ui/habitos/hoje/Hoje";
import Habitos from "./ui/habitos/habitos/Habitos";
import UserContext from "./contexts/UserContext";
import { useState } from "react";


export default function App() {
    const [user, setUser] = useState({});
    return (
        <>
            <GlobalStyle />
            <UserContext.Provider value={{ user, setUser }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/cadastro" element={<Cadastro />} />
                        <Route path="/hoje" element={<Hoje />} />
                        <Route path="/habitos" element={<Habitos />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}

/*

                    <Route path="/habitos" element={ } />
                    <Route path="/hoje" element={ } />
                    <Route path="/historico" element={ } />


*/