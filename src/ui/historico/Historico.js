import styledComponents from "styled-components";
import BaseScreen from "../commom/BaseScreen";


export default function Historico(){
    return (
        <BaseScreen>
            <Body>
                <Row><span>Histórico</span></Row>
                <Subtitle>Em breve você poderá ver o histórico dos seus hábitos aqui!</Subtitle>
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

const Subtitle = styledComponents.div`
    line-height: 22px;
    margin-top: 17px;
    font-size: 18px;
    color: #666666;
`;