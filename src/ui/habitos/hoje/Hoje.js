import dayjs from 'dayjs';
import "dayjs/locale/pt-br";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../../contexts/UserContext";
import HabitosCountContext from "../../../contexts/HabitosCountContext";
import axios from "axios";
import styledComponents from "styled-components";
import BaseScreen from "../../commom/BaseScreen";
import iconCheck from "../../../assets/check.svg";
import { ThreeDots } from 'react-loader-spinner';


export default function Hoje() {
    dayjs.locale('pt-br');
    const { habitosCount, setHabitosCount } = useContext(HabitosCountContext);
    const { user } = useContext(UserContext);
    const [habitos, setHabitos] = useState([]);
    const [loading, setLoading] = useState(true);
    const today = dayjs().format('dddd, DD/MM');
    const todayFormatted = today.substring(0, 1).toUpperCase() + today.substring(1);

    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", {
            headers: { Authorization: `Bearer ${user.token}` }
        });
        promise.then(response => {
            setHabitos([...response.data]);
            setLoading(false);
            setHabitosCount(response.data.length > 0 ? (response.data.filter(habito => habito.done === true).length / response.data.length) * 100 : 0);
            setLoading(false);
        });
        promise.catch(err => {
            console.log(err);
            setLoading(false);
        });
    }, []);



    function doneHabito(id) {
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, {}, {
            headers: { Authorization: `Bearer ${user.token}` }
        });
        promise.then(response => {
            checkHabito(id);
        });
        promise.catch(err => {
            console.log("Oiiiiiiiiii");
            console.log(err);
        });
    }

    function checkHabito(id) {
        habitos.find(habito => habito.id === id).done = true;
        setHabitos([...habitos]);
        setHabitosCount((habitos.filter(habito => habito.done === true).length / habitos.length) * 100);
    }
    function uncheckHabito(id) {
        habitos.find(habito => habito.id === id).done = false;
        setHabitos([...habitos]);
        setHabitosCount((habitos.filter(habito => habito.done === true).length / habitos.length) * 100);
    }

    function undoneHabito(id) {
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, {}, {
            headers: { Authorization: `Bearer ${user.token}` }
        });
        promise.then(response => {
            uncheckHabito(id);
        });
        promise.catch(err => {
            console.log(err);
        });
    }

    function onClickButtonCheck(id) {
        if (habitos.filter(habito => habito.id === id)[0].done) {
            undoneHabito(id);
        } else {
            doneHabito(id);
        }
    }

    function generateTile(habito) {
        return (
            <HabitoTile key={habito.id} actived={true}>
                <div>
                    <h1>{habito.name}</h1>
                    <h2>Sequencia atual <SpanEditable actived={habito.done}> {`: ${habito.currentSequence}`} dias</SpanEditable></h2>
                    <h2>Seu recorde <SpanEditable actived={habito.currentSequence === habito.highestSequence && habito.highestSequence > 0}>{`: ${habito.highestSequence}`} dias</SpanEditable></h2>
                </div>
                <ButtonToggleDone checked={habito.done} onClick={() => onClickButtonCheck(habito.id)}>
                    <img src={iconCheck} alt="Check" />
                </ButtonToggleDone>
            </HabitoTile>
        );
    }

    return (
        <BaseScreen>
            <Body>
                <Row><span>{todayFormatted}</span></Row>
                <Subtitle progress={habitos.filter(habito => habito.done === true).length > 0}>{habitosCount === 0 ? "Nenhum hábito concluído ainda!" : `${habitosCount}% dos hábitos concluídos`}</Subtitle>
                {loading ? <BodyLoading><ThreeDots /></BodyLoading> : habitos.length === 0 ? <BodyLoading>Você não tem hábitos para fazer hoje!</BodyLoading> : habitos.map(habito => generateTile(habito))}
            </Body>
        </BaseScreen>
    );
}


const Body = styledComponents.div`
    width: 100%;
    height: 100%;
    padding: 0 20px;

    span{
        font-size: 17px;
        color: #666666;
    }
`;

const Subtitle = styledComponents.div`
    font-size: 18px;
    margin-bottom: 28px;
    color: ${props => props.progress ? "#8FC549" : "#BABABA"};
`;

const Row = styledComponents.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;

    span{
        font-size: 22px;
        color: #126BA5;
    }
`;

const HabitoTile = styledComponents.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    border-radius: 5px;
    height: 94px;
    width: 100%;
    padding: 13px;
    margin-bottom: 10px;

    h1{
        color: #666666;
        font-size: 19px;
        margin-bottom: 7px;
    }

    h2{
        color: #666666;
        font-size: 13px;
        display: flex;

    }
`;

const BodyLoading = styledComponents.div`
    height: calc(100% - 107px);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    color: #666666;
`;

const ButtonToggleDone = styledComponents.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    width: 70px;
    background-color: ${props => props.checked ? "#8FC549" : "#EBEBEB"};
    border: 1px solid ${props => props.checked ? "#8FC549" : "#E7E7E7"};
    border-radius: 5px;
    img{
        color: white;
        height: 28px;
        width: 35px;
    }

    &:hover{
        cursor:pointer;
    }
`;

const SpanEditable = styledComponents.div`  
    color: ${props => props.actived ? "#8FC549" : "#666666"};
    font-size: 13px;
`;
