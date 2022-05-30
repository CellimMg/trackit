import styledComponents from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function BaseScreen({ children }) {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <ScreenBody>
            <AppBar>
                <span>TrackIt</span>
                <img src={user.image} alt="Foto do Perfil" />
            </AppBar>
            {children}

            <BottomBar>
                <span onClick={() => navigate("/habitos")}>Hábitos</span>
                <span onClick={() => navigate("/historico")}>Histórico</span>
            </BottomBar>

            <BottomBarButton onClick={() => navigate("/hoje")}>
                <CircularProgressbar
                    value={60}
                    text={`${60}%`}
                    background
                    backgroundPadding={6}
                    styles={
                        buildStyles({
                            backgroundColor: "#3e98c7",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                        })}
                />
            </BottomBarButton>
        </ScreenBody>
    );
}

const ScreenBody = styledComponents.div`
    height: 100%;
    width: 100%;
    position: relative;
    padding-top: 100px;
    background-color: #F2F2F2;
`;


const AppBar = styledComponents.div`
    width: 100%;
    height: 70px;
    position: absolute;
    top: 0px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 18px;

    img{
        width: 51px;
        height: 51px;
        border-radius: 98px;
    }

    span{
        font-size: 38px;
        color: #FFFFFF;
        font-family: 'Playball', cursive;
    }
`;


const BottomBar = styledComponents.div`
    height: 70px;
    width: 100%;
    bottom: 0;
    position: absolute;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 36px;

    span{
        font-family: Lexend Deca;
        font-size: 18px;
        color: #52B6FF;
    }
`;

const BottomBarButton = styledComponents.div`
    position: absolute;
    bottom: 10px;
    height: 91px;
    width: 91px;
    left: 0;
    right: 0;
    margin: 0 auto;
`;