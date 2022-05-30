import dayjs from 'dayjs';
import "dayjs/locale/pt-br";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../../contexts/UserContext";
import axios from "axios";
import styledComponents from "styled-components";
import BaseScreen from "../../commom/BaseScreen";
import iconCheck from "../../../assets/check.svg";


export default function Hoje() {
    dayjs.locale('pt-br');
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
        });
        promise.catch(err => {
            console.log(err);
        });
    }, []);

    function generateTile(habito) {
        return (
            <HabitoTile>
                <div>
                    <h1>{habito.name}</h1>
                    <h2>Sequencia atual: {habito.currentSequence} dias</h2>
                    <h2>Seu recorde: {habito.highestSequence} dias</h2>
                </div>
                <ButtonToggleDone checked={habito.done}>
                    <img src={iconCheck} alt="Check" />
                </ButtonToggleDone>
            </HabitoTile>
        );
    }

    return (
        <BaseScreen>
            <Body>
                <Row><span>{todayFormatted}</span></Row>
                <Subtitle progress={habitos.filter(habito => habito.done == true).length > 0}>Oiee</Subtitle>
                {habitos.map(habito => generateTile(habito))}
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
    }
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
`;
