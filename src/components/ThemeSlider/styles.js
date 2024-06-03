import styled from "styled-components";

export const Container = styled.div`
    align-self: flex-end;
    margin: 0 5rem;
    
    .toggle-switch {
        position: fixed;
        top: 14rem;
        width: 5rem;
        z-index: 10;
    }

    label {
        position: absolute;
        width: 100%;
        height: 2.5rem;
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};
        border-radius: 5rem;
        cursor: pointer;
    }

    input {
        position: absolute;
        display: none;
    }

    .slider {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 5rem;
        transition: 0.3s;
        outline: 1px solid ${({ theme }) => theme.COLORS.BLUE_200};
        -webkit-box-shadow: 0px 0px 10px 5px #193746; 
        box-shadow: 0px 0px 10px 5px #193746;
    }

    input:checked ~ .slider {
        background-color: #D8DBE0;
    }

    .slider::before {
        content: "";
        position: absolute;
        top: 0.325rem;
        left: 0.4rem;
        width: 1.875rem;
        height: 1.875rem;
        border-radius: 50%;
        box-shadow: inset 7px -1px 0px 0px #D8DBE0;
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};
        transition: 0.3s;
    }

    input:checked ~ .slider::before {
        transform: translateX(2.375rem);
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};
        box-shadow: none;
    }
`;