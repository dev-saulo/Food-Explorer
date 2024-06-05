import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    
    padding: 0 1.6rem;
    border-radius: 0.8rem;
    border: ${({ theme, isNew }) => isNew ? `1px dashed ${theme.COLORS.LIGHT_GRAY_500}` : "none"};

    color: ${({ theme }) => theme.COLORS.LIGHT_GRAY_500};
    background-color: ${({ theme, isNew }) => isNew ? "transparent" : theme.COLORS.LIGHT_GRAY_500};
    
    svg {
        vertical-align: middle;
    }

    > button {
        border: none;
        background: none;
    }

    .button-delete {
        color: ${({ theme }) => theme.COLORS.RED_300};
    }

    .button-add {
        color: ${({ theme }) => theme.COLORS.BLUE_200};
    }

    > input {
        max-width: 13rem;
        height: 2.8rem;

        border: none;
        
        color: ${({ theme }) => theme.COLORS.WHITE};
        background: transparent;

        &::placeholder {
            color: ${({ theme }) => theme.COLORS.LIGHT_GRAY_500};
        }
    }
`;