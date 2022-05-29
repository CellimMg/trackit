import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";
import { FormField, Redirect, Button } from "../../../styles/styles";
import logo from "../../../assets/logo.png";
import styledComponents from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Cadastro() {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");
    const navigate = useNavigate();

    async function onSubmitForm(event) {
        setLoading(true);
        event.preventDefault();
        if (isEmailValid(email) && isPassValid(pass) && isFotoValid(foto) && isNomeValid(nome)) {
            await signup(email, pass, foto, nome);
        }
        setLoading(false);
    }

    async function signup(email, pass, image, name) {
        try {
            await axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', {
                email: email,
                password: pass,
                image: image,
                name: name
            });
            navigate("/");
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    function isEmailValid(email) {
        if (email === "") {
            alert("Informe seu email!");
            return false;
        }
        return true;
    }

    function isPassValid(pass) {
        if (pass === "") {
            alert("Informe sua senha!");
            return false;
        }
        return true;
    }


    function isNomeValid(nome) {
        if (nome === "") {
            alert("Informe seu nome!");
            return false;
        }
        return true;
    }

    function isFotoValid(foto) {
        if (foto === "") {
            alert("Informe sua foto");
            return false;
        }
        return true;
    }

    return (
        <Body>
            <img src={logo} alt="Logo" />
            <form onSubmit={onSubmitForm}>
                <FormField disabled={loading} value={email} type="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
                <FormField disabled={loading} value={pass} type="password" placeholder="senha" onChange={e => setPass(e.target.value)} />
                <FormField disabled={loading} value={nome} type="text" placeholder="nome" onChange={e => setNome(e.target.value)} />
                <FormField disabled={loading} value={foto} type="url" placeholder="foto" onChange={e => setFoto(e.target.value)} />

                <Button type="submit">{loading ? <ThreeDots color="white" /> : "Cadastrar"}</Button>
            </form>
            <Redirect href="/">Já tem conta? Faça login!</Redirect>
        </Body>
    );
}


const Body = styledComponents.div`
    display: flex;
    align-items: center;
    flex-flow: column;
    background-color: white;
    width: 100%;
    height: 100%;

    img{
        width: 180px;
        height: 178px;
        margin-bottom: 32px;
        margin-top: 68px;
    }

    form{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;   
    }

    input{
        margin-bottom: 6px;
    }

    button{
        margin-bottom: 25px;
    }
`;