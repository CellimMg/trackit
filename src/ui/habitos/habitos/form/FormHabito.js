import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useState, useContext, useEffect } from "react";
import styledComponents from "styled-components";
import UserContext from "../../../../contexts/UserContext";
import { FormField } from "../../../../styles/styles";

export default function FormHabito({ onSave, onCancel }) {

    const { user } = useContext(UserContext);
    const [days, setDays] = useState([]);
    const [descricaoHabito, setDescricaoHabito] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const dataString = localStorage.getItem("previousData");
        const data = JSON.parse(dataString);
        if (data != null) {
            console.log(data);
            setDays([...data.days]);
            setDescricaoHabito(data.descricaoHabito);
        }
    }, []);

    function handleClickDay(day) {
        if (days.includes(day)) days.splice(days.indexOf(day), 1);
        else days.push(day);
        setDays([...days]);
    }

    async function onTapSalvar(event) {
        event.preventDefault();
        setLoading(true);
        if (isDescricaoValid(descricaoHabito) && isDaysValid(days)) {
            await sendData(descricaoHabito, days);
        }
        setLoading(false);
    }

    function onTapCancel() {
        const data = {
            descricaoHabito: descricaoHabito,
            days: days
        };

        localStorage.setItem("previousData", JSON.stringify(data));
        onCancel();
    }

    async function sendData(descricaoHabito, days) {
        try {
            const response = await axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
                name: descricaoHabito,
                days: days
            },
                {
                    headers: { Authorization: `Bearer ${user.token}` }
                }
            );
            localStorage.clear();
            onSave(response.data);
            cleanForm();
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    function cleanForm(){
        setDays([]);
        setDescricaoHabito("");
    }

    function isDaysValid(days) {
        if (days.length === 0) {
            alert("Você deve selecionar ao menos 1 dia da semana para repetir seu hábito!");
            return false;
        }
        return true;
    }

    function isDescricaoValid(descricao) {
        if (descricao === "") {
            alert("Você deve informar a descrição do seu hábito!");
            return false;
        }
        return true;
    }

    return (
        <Form onSubmit={loading ? () => { } : onTapSalvar}>
            <FormField disabled={loading} placeholder="Seu novo hábito" type="text" value={descricaoHabito} onChange={e => setDescricaoHabito(e.target.value)} />
            <DaysBox>
                <BoxDay selected={days.includes(0)} onclick={loading ? () => { } : () => handleClickDay(0)} day="D" />
                <BoxDay selected={days.includes(1)} onclick={loading ? () => { } : () => handleClickDay(1)} day="S" />
                <BoxDay selected={days.includes(2)} onclick={loading ? () => { } : () => handleClickDay(2)} day="T" />
                <BoxDay selected={days.includes(3)} onclick={loading ? () => { } : () => handleClickDay(3)} day="Q" />
                <BoxDay selected={days.includes(4)} onclick={loading ? () => { } : () => handleClickDay(4)} day="Q" />
                <BoxDay selected={days.includes(5)} onclick={loading ? () => { } : () => handleClickDay(5)} day="S" />
                <BoxDay selected={days.includes(6)} onclick={loading ? () => { } : () => handleClickDay(6)} day="S" />
            </DaysBox>
            <Row>
                <Button type="button" onClick={loading ? () => { } : () => onTapCancel()} backgroundColor={"white"} fontColor={"#52B6FF"}>Cancelar</Button>
                <Button type="submit" backgroundColor={"#52B6FF"} fontColor={"white"}>{loading ? <ThreeDots color="white" /> : "Salvar"}</Button>
            </Row>
        </Form>
    );
}

export function BoxDay({ onclick, day, selected }) {
    return (
        <Box isSelected={selected} onClick={() => onclick()}>
            {day}
        </Box>
    );
}

const Form = styledComponents.form`
    width: 100%;
    height: 180px;
    padding: 18px;
    margin-top: 20px;
    margin-bottom: 29px;
    background: #FFFFFF;
    border-radius: 5px;
`;

export const DaysBox = styledComponents.div`
    display: flex;
    align-itens: center;
    margin-top: 8px;
    margin-bottom: 19px;
`;

export const Box = styledComponents.div`
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    border: 1px solid #D4D4D4;
    margin-right: 5px;
    font-size: 20px;
    background-color: ${props => props.isSelected ? "#DBDBDB" : "white"};;
    color: ${props => props.isSelected ? "white" : "#DBDBDB"};
`;

const Row = styledComponents.div`
    width: 100%;
    height: 35px;
    display:flex;
    align-items: center;
    justify-content: flex-end;
`;

const Button = styledComponents.button`
    width: 84px;
    height: 35px;
    background-color: ${props => props.backgroundColor};
    border-radius: 5px;
    color: ${props => props.fontColor};
    border: none;
    font-family: Lexend Deca;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    &:hover{
        cursor: pointer;
    }
`;