import styledComponents from "styled-components";
import logo from "../../../assets/logo.png";
import { FormField, Redirect, Button } from "../../../styles/styles";

export default function Login() {
    return (
        <Body>
            <img src={logo} alt="Logo" />
            <form>
                <FormField placeholder="email" />
                <FormField type="password" placeholder="senha" />
            </form>
            <Button type="submit">Entrar</Button>
            <Redirect href="/cadastro">Não tem uma conta? Cadastre-se</Redirect>
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