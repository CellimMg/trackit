import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useState, useContext, useEffect } from "react";
import styledComponents from "styled-components";
import UserContext from "../../../contexts/UserContext";
import BaseScreen from "../../commom/BaseScreen";
import iconDelete from "../../../assets/lixeira.svg";
import FormHabito, { DaysBox, BoxDay } from "./form/FormHabito";

export default function Habitos() {

    const { user } = useContext(UserContext);
    const [openForm, setOpenForm] = useState(false);
    const [habitos, setHabitos] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
            headers: { Authorization: `Bearer ${user.token}` }
        });
        promise.then(response => {
            setHabitos([...response.data]);
            setLoading(false);
        });
        promise.catch(err => {
            console.log(err);
        });
    }, []);

    function callBackSaveHabito(habito) {
        setHabitos([...habitos, habito]);
    }

    function onTapDelete(id) {
        const confirmed = window.confirm("Tem certeza que deseja remover seu hábito?");
        if (confirmed) {
            deleteHabito(id);
        }
    }

    function deleteHabito(id) {
        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
        promise.then(response => removeHabito(id));
        promise.catch(err => alert("Não foi possível deletar seu hábito, tente novamente!"));
    }

    function removeHabito(id) {
        habitos.splice(habitos.findIndex(habito => habito.id == id), 1);
        setHabitos([...habitos]);
    }

    function generateTile(habito) {
        return (
            <HabitoTile>
                <span>{habito.name}</span>
                <DaysBox>
                    <BoxDay selected={habito.days.includes(0)} onclick={() => { }} day="D" />
                    <BoxDay selected={habito.days.includes(1)} onclick={() => { }} day="S" />
                    <BoxDay selected={habito.days.includes(2)} onclick={() => { }} day="T" />
                    <BoxDay selected={habito.days.includes(3)} onclick={() => { }} day="Q" />
                    <BoxDay selected={habito.days.includes(4)} onclick={() => { }} day="Q" />
                    <BoxDay selected={habito.days.includes(5)} onclick={() => { }} day="S" />
                    <BoxDay selected={habito.days.includes(6)} onclick={() => { }} day="S" />
                </DaysBox>
                <DeleteIcon onClick={() => onTapDelete(habito.id)} src={iconDelete} />
            </HabitoTile>
        );
    }

    return (
        <BaseScreen>
            <Body>
                <Row><span>Meus hábitos</span> <AddButton onClick={() => setOpenForm(true)}>+</AddButton> </Row>
                {openForm ? <FormHabito onSave={(data) => callBackSaveHabito(data)} onCancel={() => setOpenForm(false)} /> : ""}
                {loading ? <BodyLoading><ThreeDots color="#52B6FF" /></BodyLoading> : habitos.length == 0 ? <span>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</span> : habitos.map(habito => generateTile(habito))}
            </Body>
        </BaseScreen>
    );
}

const BodyLoading = styledComponents.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Body = styledComponents.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding: 0 20px;
    padding-bottom: 110px;

    span{
        font-size: 17px;
        color: #666666;
    }
`;

const AddButton = styledComponents.button`
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 27px;
    background-color: #52B6FF;
    border: none;
    border-radius: 5px;

    &:hover{
        cursor: pointer;
    }
`;


const Row = styledComponents.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    span{
        font-size: 22px;
        color: #126BA5;
    }
`;

const HabitoTile = styledComponents.div`
    width: 100%;
    height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 18px;
    position: relative;
    span{
        font-size: 19px;
        color: #666666;
    }
`;

const DeleteIcon = styledComponents.img`

    height: 16px;
    width: 16px;
    position: absolute;
    right: 18px;
    top: 18px;

    &:hover{
        cursor: pointer;
    }
`;