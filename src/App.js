import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/globalStyle";
import Login from "./ui/auth/login/Login";
import Cadastro from "./ui/auth/cadastro/Cadastro";
import Hoje from "./ui/habitos/hoje/Hoje";
import Habitos from "./ui/habitos/habitos/Habitos";
import Historico from "./ui/historico/Historico";
import UserContext from "./contexts/UserContext";
import HabitosCountContext from "./contexts/HabitosCountContext";
import { useState } from "react";


export default function App() {
    const [user, setUser] = useState({});
    const [habitosCount, setHabitosCount] = useState(0); 



    return (
        <>
            <GlobalStyle />
            <UserContext.Provider value={{ user, setUser }}>
            <HabitosCountContext.Provider value={{habitosCount, setHabitosCount}}>
                
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                            <Route path="/cadastro" element={<Cadastro />} />
                            <Route path="/hoje" element={<Hoje />} />
                            <Route path="/habitos" element={<Habitos />} />
                            <Route path="/historico" element={<Historico />} />
                    </Routes>
                </BrowserRouter>
                </HabitosCountContext.Provider>
            </UserContext.Provider>
        </>
    );
}