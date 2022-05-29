import { useState } from "react/cjs/react.production.min";
import styledComponents from "styled-components";
import BaseScreen from "../../commom/BaseScreen";

export default function Hoje() {




    return (
        <></>
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
