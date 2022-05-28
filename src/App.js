import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/globalStyle";
import Login from "./ui/auth/login/Login";

export default function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

/*
<Route path="/cadastro" element={ } />
                    <Route path="/habitos" element={ } />
                    <Route path="/hoje" element={ } />
                    <Route path="/historico" element={ } />


*/