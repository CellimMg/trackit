import styledComponents from "styled-components";


export const FormField = styledComponents.input`
    background-color: ${props => props.disabled ? "#F2F2F2" : "#FFFFFF"};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    width: 303px;
    height: 45px;
    padding: 10px;

    &::placeholder{
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 19px;
        line-height: 25px;
        color: #DBDBDB;
    }
`;

export const Button = styledComponents.button`
    width: 303px;
    height: 45px;
    background: #52B6FF;
    border-radius: 5px;
    color: white;
    border: none;
    font-family: Lexend Deca;
    font-size: 21px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover{
        cursor: pointer;
    }
`;

export const Redirect = styledComponents.a`
    font-family: 'Lexend Deca';
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;
    color: #52B6FF;

    &:hover{
        cursor: pointer;
    }
`;


